import {
  Box,
  Button,
  ButtonGroup,
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
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaTrashAlt,
  FaTimes,
} from 'react-icons/fa';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { Formik } from 'formik';
import { addproduct } from '../../Redux/apiRequest';
import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import './AdminProduct.styles.scss';
import { Link, Outlet } from 'react-router-dom';

function AdminProduct() {
  const [products, setProducts] = useState();
  const [isLoad, setLoaded] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [endOffset, setendOffset] = useState(6);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [productIndex, setProductIndex] = useState();
  const [fileInput, setFileInput] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const handlePageClick = (event) => {
    setItemOffset((event.selected * 6) % products.length);
    setendOffset(((event.selected * 6) % products.length) + 6);
    setLoaded(!isLoad);
  };

  const initialRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axiosClient.get('/api/products');

        setProducts(res);
        setCurrentItems(res.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(res.length / 6));
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [isLoad, itemOffset, endOffset]);

  const initialValues = {
    name: '',
    image: [],
    description: '',
    price: '',
    discountPrice: '',
    quantity: '',
  };

  const handleAddProduct = async (formData) => {
    try {
      // let imageData = await uploadImage(previewSource);
      // console.log('Log formData:', imageData);
      // imageData = imageData.map((elm, index) => {
      //   return { publicId: elm.public_id, url: elm.url };
      // });
      // const product = {
      //   name: name,
      //   image: imageData,
      //   description: description,
      //   price: price,
      //   discountPrice: discountPrice,
      //   quantity: quantity,
      // };
      // await addproduct(product, dispatch);
      // setLoaded(!isLoad);
      await axiosClient.post('/api/product', formData);
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
      setPreviewSource(
        // [...previewSource, reader.result]
        reader.result
      );
    };
  };

  // const uploadImage = async (base64EncodedImage) => {
  //   console.log(base64EncodedImage);
  //   let file;
  //   try {
  //     // file =
  //     await axiosClient.post('/api/upload', {
  //       file: base64EncodedImage,
  //     });
  //     return file.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handletest = (e) => {
  //   console.log(e.target.value);
  // };

  return (
    <Box bg='#f2edf3' w='100%' h='100%'>
      <Box pl={'180px'} pt='80px' pb={'30px'}>
        <Box display={'flex'} justifyContent='space-between' mt='15px'>
          <Text ml={'15px'} mt='10px' fontSize={20}>
            Product list
          </Text>
          <ButtonGroup size='md' isAttached variant='outline'>
            <Button
              mr='30px'
              bg='#c8191fd9'
              color={'white'}
              _hover={{ bg: '#c8191fb5' }}
              onClick={onAddOpen}>
              <Icon as={FaPlus} mr='5px' />
              Add product
            </Button>
          </ButtonGroup>
          <Modal
            initialFocusRef={initialRef}
            isOpen={isAddOpen}
            onClose={onAddClose}
            size='2xl'>
            <ModalOverlay />
            <Formik initialValues={initialValues} onSubmit={handleAddProduct}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <ModalContent>
                  <ModalHeader>Create your product</ModalHeader>
                  <ModalCloseButton />
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
                            <FormLabel>Image: </FormLabel>
                            <Input
                              type={'file'}
                              border={'none'}
                              onChange={
                                // (e) =>
                                handleFileInputChange
                                // (e)
                              }
                              value={fileInput}
                            />
                          </FormControl>
                          <Box display={'flex'}>
                            {/* {!previewSource ||
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
                              ))} */}
                            {previewSource && (
                              <Image
                                src={previewSource}
                                alt='product-image'
                                w={'80px'}
                                objectFit='cover'
                              />
                            )}
                          </Box>
                        </Box>
                        <Box w='100%'>
                          <FormControl
                            mt={4}
                            isRequired
                            isInvalid={
                              errors.description && touched.description
                            }>
                            <FormLabel>Description:</FormLabel>
                            <Input
                              w={'80%'}
                              placeholder='Description'
                              type='text'
                              id='description'
                              onChange={handleChange}
                              // value={values.description}
                              focusBorderColor='black'
                            />
                          </FormControl>{' '}
                        </Box>
                      </VStack>
                      <VStack w={'30%'}>
                        <Box>
                          <FormControl
                            // pl={'50px'}
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
                            // pl={'50px'}
                            isRequired
                            isInvalid={
                              errors.discountPrice && touched.discountPrice
                            }>
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
                            // pl={'50px'}
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
                    <Button
                      color={'white'}
                      bg={'var(--primary)'}
                      _hover={{
                        bg: '#c8191fb5',
                      }}
                      mr={3}
                      onClick={() => handleSubmit()}>
                      Add
                    </Button>
                    <Button onClick={onAddClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              )}
            </Formik>
          </Modal>
        </Box>
        <TableContainer m={15} bg='white' borderRadius='5px'>
          <Table variant='simple' whiteSpace={'break-spaces'}>
            <Thead>
              <Tr h={'50px'}>
                <Th>Name</Th>
                <Th w={'120px'}>Image</Th>
                <Th w={'450px'} p={0}>
                  Description
                </Th>
                <Th w={'130px'} p='0 15px 0 0' textAlign={'end'}>
                  Discount Price
                </Th>
                <Th w={'80px'} p={0} textAlign='end'>
                  Price
                </Th>

                <Th w={'80px'} p={'0 20px 0 20px'} textAlign='end'>
                  Quantity
                </Th>
                <Th
                  w={'50px'}
                  p='0 20px 0 0'
                  textAlign={'end'}
                  borderLeft='2px solid #edf2f7'>
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems?.map((item, index) => (
                <Tr key={index}>
                  <Td w={'16%'}>
                    <p>{item.name}</p>
                  </Td>
                  <Td padding={'0 15px 0 0'}>
                    <Image
                      boxSize='100px'
                      objectFit={'cover'}
                      src={item.image.slice(0, 1)}
                    />
                  </Td>
                  <Td p={'15px 0'}>
                    <Text maxW={'450px'} h='100px' overflowY='scroll'>
                      {item.description?.news}
                    </Text>
                  </Td>
                  <Td isNumeric p='0 15px 0 0'>
                    {item.discountPrice}
                  </Td>
                  <Td isNumeric p={0}>
                    {item.price}
                  </Td>
                  <Td isNumeric p={'0 20px 0 0'}>
                    {item.quantity}
                  </Td>
                  <Td p={'0 10px 0 0'} borderLeft='2px solid #edf2f7'>
                    <VStack spacing={'20px'}>
                      <Link to={`edit/${item.id}`}>
                        <Icon
                          as={FaEdit}
                          ml='3px'
                          fontSize='24px'
                          _hover={{ color: 'var(--primary)' }}
                        />
                      </Link>
                      <Icon
                        as={FaTrashAlt}
                        fontSize='24px'
                        _hover={{ color: 'var(--primary)' }}
                      />
                    </VStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <ReactPaginate
            className='pagination'
            breakLabel='...'
            nextLabel={<Icon as={FaChevronRight} />}
            previousLabel={<Icon as={FaChevronLeft} />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            FaChevronRight
            renderOnZeroPageCount={null}
            activeLinkClassName={'active'}
          />
        </TableContainer>
      </Box>
      <Outlet />
    </Box>
  );
}

export default AdminProduct;
