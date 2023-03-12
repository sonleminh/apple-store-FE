import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { loginUser } from '../../../../Redux/apiRequest';
import { useDispatch } from 'react-redux';
import axiosClient from '../../../../api/axiosClient';

SignInForm.propTypes = {
  onSignInFormSubmit: PropTypes.func,
  isAlert: PropTypes.bool,
};

SignInForm.defaultProps = {
  onSignInFormSubmit: null,
  isAlert: false,
};

function SignInForm(props) {
  const toast = useToast();

  const [isAlert, setIsAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required!'),
    password: Yup.string().required('Password is required!'),
  });

  const handleSignInFormSubmit = async (formData) => {
    const user = {
      email: formData.email,
      password: formData.password,
    };
    loginUser(user, dispatch, navigate);

    try {
      const response = await axiosClient.post('/api/login', formData);
      if (response.message === 'email_not_exist') return setIsAlert(true);
      return toast({
        title: 'Success.',
        description: 'Login success',
        position: 'top-right',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
    // const login = await loginUser(user, dispatch, navigate);
    // if (typeof login === 'object') {
    // toast.success('Đăng nhập thành công', {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
    // navigate('/');
    // } else {
    //   return setIsAlert(true);
    // }

    // const responsec = await userApi.login(user);
    // console.log('cc:', responsec.data);
  };

  return (
    <>
      <div
        style={{
          background: 'linear-gradient(#414141, #000000)',
        }}>
        <Flex minH={'100vh'} align={'center'} justify={'center'}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'2xl'} color='white'>
                ĐĂNG NHẬP TÀI KHOẢN{' '}
                <Link
                  onClick={() => navigate('/')}
                  display='inline-block'
                  color='var(--primary-link)'
                  _hover={{
                    textDecoration: 'none',
                  }}>
                  APPLE STORE
                </Link>
              </Heading>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                {isAlert && (
                  <Alert status='error' borderRadius='5'>
                    <AlertIcon />
                    Incorrect email or password.
                  </Alert>
                )}

                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSignInFormSubmit}
                  validationSchema={validationSchema}>
                  {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                  }) => (
                    <>
                      <FormControl isInvalid={errors.email && touched.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                          onChange={handleChange}
                          id='email'
                          value={values.email}
                          focusBorderColor='black'
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={errors.password && touched.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                          type='password'
                          onChange={handleChange}
                          id='password'
                          value={values.password}
                          // onKeyPress={(value) =>
                          //   value.code === 'Enter' && handleSubmit()
                          // }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSubmit();
                            }
                          }}
                          focusBorderColor='black'
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <Button
                        bg='var(--primary)'
                        color={'white'}
                        _hover={{
                          bg: '#9e2024',
                        }}
                        type='submit'
                        onClick={handleSubmit}>
                        Sign in
                      </Button>
                      <Stack pt={6}>
                        <Text align={'center'}>
                          Don't have any account?{' '}
                          <Link
                            color='var(--primary-link)'
                            onClick={() => navigate('/register')}>
                            Register
                          </Link>
                        </Text>
                      </Stack>
                    </>
                  )}
                </Formik>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </div>
    </>
  );
}

export default SignInForm;
