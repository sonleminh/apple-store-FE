import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { Formik } from 'formik';
import { useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axiosClient from '../../../../api/axiosClient';
import { useState } from 'react';

function EditProductForm() {
  const initialRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  // const [load, setLoad] = useState();
  const [product, setProduct] = useState();

  const [fileInput, setFileInput] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axiosClient.get(`/api/product/${id}`);
        setProduct(response);
        // console.log(response.name);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);

  const initialValues = {
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    discountPrice: product?.discountPrice || '',
    quantity: product?.quantity || '',
  };

  const handleEditProduct = async (data) => {
    try {
      // console.log('c:', data);
      // await axiosClient.patch(`/api/product/${id}`, data);
      // setTimeout(() => {
      //   navigate('/dashboard/product');
      // }, 3000);
      if (!previewSource) return;
      uploadImage(previewSource);
      console.log('logc:');
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource([...previewSource, reader.result]);
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    let file;
    try {
      file = await axiosClient.post('/api/upload', {
        file: base64EncodedImage,
      });
      return file.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen
      onOverlayClick={() => navigate('/dashboard/product')}
      size='2xl'>
      <ModalOverlay />
      <Formik
        initialValues={initialValues}
        onSubmit={handleEditProduct}
        enableReinitialize>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ModalContent>
            <ModalHeader>
              Edit your product
              <Link to='/dashboard/product'>
                <Icon
                  as={FaTimes}
                  position='absolute'
                  right={'15px'}
                  color='var(--primary)'
                  _hover={{ transform: 'scale(1.3)' }}
                />
              </Link>
            </ModalHeader>

            <ModalBody pb={6}>
              <HStack>
                <VStack w={'70%'}>
                  <Box w='100%'>
                    <FormControl
                      isRequired
                      isInvalid={errors.name && touched.name}>
                      <FormLabel>Product name:</FormLabel>
                      <Input
                        w={'80%'}
                        type='text'
                        id='name'
                        onChange={handleChange}
                        value={values.name}
                        focusBorderColor='black'
                        ref={initialRef}
                        placeholder='iPhone 14 Pro Max'
                      />
                    </FormControl>
                  </Box>
                  <Box w='100%'>
                    <FormControl mt={4}>
                      <FormLabel>Image:</FormLabel>
                      <Input
                        type={'file'}
                        onChange={handleFileInputChange}
                        value={fileInput}
                        border={'none'}
                      />
                    </FormControl>
                    <Box display={'flex'}>
                      {!previewSource ||
                        previewSource.map((image, index) => (
                          <Box display={'flex'} key={index}>
                            <Image
                              src={image}
                              alt='product-image'
                              w={'80px'}
                              objectFit='cover'
                            />
                            <Icon
                              as={FaTimes}
                              onClick={(e) => {
                                previewSource.splice(index, 1);
                                setFileInput([]);
                                // setLoaded(!isLoad);
                              }}
                            />
                          </Box>
                        ))}
                    </Box>
                  </Box>
                  <Box w='100%'>
                    <FormControl
                      mt={4}
                      isRequired
                      isInvalid={errors.description && touched.description}>
                      <FormLabel>Description:</FormLabel>
                      <Input
                        w={'80%'}
                        placeholder='Description'
                        type='text'
                        id='description'
                        onChange={handleChange}
                        value={values.description}
                        focusBorderColor='black'
                      />
                    </FormControl>{' '}
                  </Box>
                </VStack>
                <VStack w={'30%'}>
                  <Box>
                    <FormControl
                      isRequired
                      isInvalid={errors.price && touched.price}>
                      <FormLabel>Price:</FormLabel>
                      <Input
                        placeholder='Price'
                        type='text'
                        id='price'
                        onChange={handleChange}
                        value={values.price}
                        focusBorderColor='black'
                      />
                    </FormControl>{' '}
                  </Box>
                  <Box>
                    <FormControl
                      mt={4}
                      isRequired
                      isInvalid={errors.discountPrice && touched.discountPrice}>
                      <FormLabel>Discount price:</FormLabel>
                      <Input
                        placeholder='Discount price'
                        type='text'
                        id='discountPrice'
                        onChange={handleChange}
                        value={values.discountPrice}
                        focusBorderColor='black'
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl
                      mt={4}
                      isRequired
                      isInvalid={errors.quantity && touched.quantity}>
                      <FormLabel>Quantity:</FormLabel>
                      <Input
                        placeholder='Quantity'
                        type='text'
                        id='quantity'
                        onChange={handleChange}
                        value={values.quantity}
                        focusBorderColor='black'
                      />
                    </FormControl>
                  </Box>
                </VStack>
              </HStack>
            </ModalBody>
            <ModalFooter>
              <Link to='/dashboard/product'>
                <Button
                  color='white'
                  bg='var(--primary)'
                  _hover={{
                    bg: '#c8191fb5',
                  }}
                  mr={3}
                  onClick={() => {
                    handleSubmit();
                  }}>
                  Save
                </Button>
              </Link>
              <Link to='/dashboard/product'>
                <Button>Cancel</Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        )}
      </Formik>
    </Modal>
  );
}

export default EditProductForm;

{
}
