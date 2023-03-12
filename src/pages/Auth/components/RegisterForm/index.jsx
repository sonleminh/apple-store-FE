import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Formik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { register } from '../../../../Redux/apiRequest';

function RegisterForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required!'),
    firstName: Yup.string().required('First Name is required!'),
    lastName: Yup.string().required('Last Name is required!'),
    password: Yup.string()
      // .min(6, 'Must be more than 6 characters')
      .required('Password is required!'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  });
  const handleRegisterFormSubmit = async (formData) => {
    try {
      const response = await register(formData);
      if (response.message === 'email_exist')
        return toast({
          title: 'Error.',
          description: 'Email already exists.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });

      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
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
                ĐĂNG KÝ TÀI KHOẢN{' '}
                <Link to='/' display='inline-block'>
                  <span
                    style={{
                      color: 'var(--primary-link)',
                    }}>
                    APPLE STORE
                  </span>
                </Link>
              </Heading>
            </Stack>
            <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
              <Stack spacing={4}>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleRegisterFormSubmit}
                  validationSchema={validationSchema}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                  }) => (
                    <>
                      <HStack>
                        <Box>
                          <FormControl
                            isRequired
                            isInvalid={errors.firstName && touched.firstName}>
                            <FormLabel>First Name</FormLabel>
                            <Input
                              type='text'
                              id='firstName'
                              onChange={handleChange}
                              value={values.firstName}
                              focusBorderColor='black'
                            />
                            <FormErrorMessage>
                              {errors.firstName}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl
                            isRequired
                            isInvalid={errors.lastName && touched.lastName}>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                              type='text'
                              id='lastName'
                              onChange={handleChange}
                              value={values.lastName}
                              focusBorderColor='black'
                            />
                            <FormErrorMessage>
                              {errors.lastName}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                      </HStack>
                      <FormControl
                        isRequired
                        isInvalid={errors.email && touched.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                          id='email'
                          onChange={handleChange}
                          value={values.email}
                          focusBorderColor='black'
                        />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isRequired
                        isInvalid={errors.password && touched.password}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            onChange={handleChange}
                            value={values.password}
                            focusBorderColor='black'
                          />
                          <InputRightElement h={'full'}>
                            <Button
                              variant={'ghost'}
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }>
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isRequired
                        isInvalid={
                          errors.confirmPassword && touched.confirmPassword
                        }>
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            id='confirmPassword'
                            onChange={handleChange}
                            value={values.confirmPassword}
                            onKeyPress={(value) =>
                              value.code === 'Enter' && handleSubmit()
                            }
                            focusBorderColor='black'
                          />
                          <InputRightElement h={'full'}>
                            <Button
                              variant='ghost'
                              onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                              }>
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {errors.confirmPassword}
                        </FormErrorMessage>
                      </FormControl>
                      <Stack spacing={10} pt={2}>
                        <Button
                          loadingText='Submitting'
                          size='lg'
                          bg={'var(--primary)'}
                          color={'white'}
                          _hover={{
                            bg: '#9e2024',
                          }}
                          onClick={() => handleSubmit()}>
                          Sign up
                        </Button>
                      </Stack>
                      <Stack pt={6}>
                        <Text align={'center'}>
                          Already a user?{' '}
                          <Link to='/login'>
                            <span
                              style={{
                                color: 'var(--primary-link)',
                              }}>
                              Login
                            </span>
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

export default RegisterForm;
