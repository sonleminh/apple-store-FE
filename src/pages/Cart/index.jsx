import { ChevronRightIcon, Icon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useEffect, useState } from 'react';
import { FaOpencart, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addToCart,
  decreaseCart,
  getTotal,
  removeCartItem,
  removeCartList,
} from '../../Redux/slice/cartSlice';
import axios from 'axios';
import axiosClient from '../../api/axiosClient';

function Cart() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const [value, setValue] = useState('');
  const [local, setLocal] = useState();
  const [cityId, setCityId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [wardId, setWardId] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [showroom, setShowroom] = useState('');
  const [payment, setPayment] = useState('');
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  useEffect(() => {
    const getLocalData = async () => {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
        );
        setLocal(response.data);
      } catch (error) {
        console.log('Failed to local: ', error);
      }
    };
    getLocalData();
  }, []);
  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleRemoveCartItem = (cartItem) => {
    dispatch(removeCartItem(cartItem));
  };

  const handleRemoveCart = () => {
    dispatch(removeCartList());
  };

  const initialValues = {
    name: '',
    phone: '',
    email: '',
    note: '',
    // addressDetail: '',
  };

  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    phone: Yup.string()
      .required()
      .matches(phoneRegExp, 'Phone number is not valid'),
    email: Yup.string().email(),
    // addressDetail: Yup.string().min(5).required('Address is required'),
  });

  const handleAddressChange = (e) => {
    setAddressDetail(e);
  };

  const handleBuySubmit = async (formData) => {
    let address;
    if (value === 'cod')
      address = addressDetail.concat(
        ',',
        ' ',
        wardId,
        ',',
        ' ',
        districtId,
        ',',
        ' ',
        cityId
      );
    if (value === 'store') address = showroom;
    const orderData = {
      orderItems: cart.cartList,
      userId: user.id,
      ...formData,
      transport: value,
      address,
      payment,
      totalAmount: cart.cartTotalPrice,
    };
    try {
      const res = await axiosClient.post('/api/order', orderData);
      if (res.message === 'Create order successfully') {
        toast({
          title: 'Đặt hàng thành công.',
          description: 'Vào mục đơn hàng đễ theo dõi tình trạng đơn hàng.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        dispatch(removeCartList());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box bg='#f0f0f0'>
      <Container maxW='1200px' margin='0 auto' padding='15px 10px'>
        <Breadcrumb separator={<ChevronRightIcon color='gray.500' />}>
          <BreadcrumbItem>
            <Link to={'/'}>
              <BreadcrumbLink>Home</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Giỏ hàng</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Box
          w={'800px'}
          m='0 auto'
          p='20px'
          boxShadow={'0px 4px 4px rgb(0 0 0 / 25%)'}
          bg='white'
          //   borderRadius='15px'
        >
          <Text fontSize={'20px'}>Giỏ hàng</Text>
          {cart.cartList.length === 0 ? (
            <Box textAlign={'center'}>
              <Icon as={FaOpencart} fontSize='50px' />
              <Text my={'25px'} fontSize={'18px'} color='rgba(0, 0, 0, 0.71)'>
                Không có sản phẩm nào trong giỏ hàng của bạn
              </Text>
              <Link to='/'>
                <Button
                  bg={'#48a147'}
                  color='white'
                  _hover={{ bg: '#206f1f', boxShadow: '1px 1px 5px #c7c7c7' }}>
                  MUA HÀNG NGAY
                </Button>
              </Link>
            </Box>
          ) : (
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Tên sản phẩm</Th>
                    <Th textAlign={'center'}>Ảnh</Th>
                    <Th textAlign={'center'}>Số lượng</Th>
                    <Th p='0' textAlign={'center'}>
                      Giá
                    </Th>
                    <Th>Xóa</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cart.cartList.map((item, index) => (
                    <Tr key={index} p={'0 5px'}>
                      <Td whiteSpace={'normal'}>
                        <Text fontSize={'16px'} fontWeight={'bold'}>
                          {item.name}
                        </Text>
                      </Td>
                      <Td w={'80px'} px='0'>
                        <Image
                          boxSize='80px'
                          objectFit={'cover'}
                          src={item.image?.slice(0, 1)}
                        />
                      </Td>
                      <Td w={'180px'} textAlign={'center'}>
                        <HStack>
                          <Button
                            // {...dec}
                            onClick={() => handleDecreaseCart(item)}
                            size='sm'>
                            -
                          </Button>
                          <Input
                            defaultValue={item.quantity}
                            width='50px'
                            size='sm'
                            textAlign={'center'}
                          />
                          <Button
                            //  {...inc}
                            onClick={() => handleIncreaseCart(item)}
                            size='sm'>
                            +
                          </Button>
                        </HStack>
                      </Td>
                      <Td p='0' textAlign={'center'}>
                        <Text fontWeight='500'>
                          {item.discountPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                          đ
                        </Text>
                      </Td>
                      <Td>
                        <Icon
                          as={FaTrashAlt}
                          fontSize='20px'
                          onClick={() => handleRemoveCartItem(item)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Flex
                mt={'15px'}
                alignItems='center'
                justifyContent={'space-between'}>
                <Button onClick={handleRemoveCart} ml={'25px'}>
                  Xóa tất cả
                </Button>

                <Flex mr={'25px'} alignItems='center'>
                  <Text mx='20px' textAlign={'center'}>
                    Tổng tiền:
                  </Text>
                  <Text
                    fontSize={'16px'}
                    textAlign='center'
                    textTransform={'none'}
                    color={'var(--primary)'}
                    fontWeight='700'>
                    {cart.cartTotalPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    đ
                  </Text>
                  <Text mx='10px'>({cart.cartTotalQuantity})</Text>
                </Flex>
              </Flex>
              <Formik
                initialValues={initialValues}
                onSubmit={handleBuySubmit}
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
                    <Box
                      mt={'20px'}
                      p={'20px 20px'}
                      border={'1px solid #e2e2e2'}>
                      <Box>
                        <Text fontSize={'17px'} fontWeight='700' color='#333'>
                          1. Thông tin khách hàng
                        </Text>
                        <Stack spacing={4} m='15px 10px'>
                          <FormControl
                            isRequired
                            isInvalid={errors.name && touched.name}>
                            <Input
                              type='text'
                              id='name'
                              placeholder='Họ và tên'
                              onChange={handleChange}
                              value={values.name}
                              focusBorderColor='black'
                            />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                          </FormControl>
                          <FormControl
                            isRequired
                            isInvalid={errors.phone && touched.phone}>
                            <Input
                              id='phone'
                              placeholder='Số điện thoại'
                              onChange={handleChange}
                              value={values.phone}
                              focusBorderColor='black'
                            />
                            <FormErrorMessage>{errors.phone}</FormErrorMessage>
                          </FormControl>
                          <FormControl
                            isRequired
                            isInvalid={errors.email && touched.email}>
                            <Input
                              id='email'
                              placeholder='Email (để nhận bản sao lưu đơn hàng)'
                              onChange={handleChange}
                              value={values.email}
                              focusBorderColor='black'
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                          </FormControl>
                          <FormControl
                            isRequired
                            isInvalid={errors.note && touched.note}>
                            <Input
                              id='note'
                              placeholder='Ghi chú'
                              onChange={handleChange}
                              value={values.note}
                              focusBorderColor='black'
                            />
                            <FormErrorMessage>{errors.note}</FormErrorMessage>
                          </FormControl>
                        </Stack>
                      </Box>
                      <Box>
                        <Text fontSize={'17px'} fontWeight='700' color='#333'>
                          2. Chọn cách thức nhận hàng
                        </Text>
                        <Text m={'10px 10px'}>
                          Chọn phương thức nhận hàng sẽ giúp bạn nhận được sản
                          phẩm nhanh hơn
                        </Text>
                        <Stack spacing={4} m='20px 10px'>
                          <RadioGroup onChange={setValue} value={value}>
                            <Stack direction='row'>
                              <Radio
                                colorScheme='red'
                                borderColor={'3px solid #f0f0f0'}
                                boxShadow='0 0 0 1px red'
                                value='cod'>
                                Giao hàng tận nơi (Có Phí Giao Hàng)
                              </Radio>
                              <Radio
                                colorScheme='red'
                                borderColor={'3px solid #f0f0f0'}
                                boxShadow='0 0 0 1px red'
                                value='store'>
                                Nhận hàng tại cửa hàng
                              </Radio>
                            </Stack>
                          </RadioGroup>
                          {value === 'cod' ? (
                            <Box bg='#f8f8f8' border={'1px solid #e1e1e1'}>
                              <Stack spacing={4} m='20px'>
                                <Select
                                  placeholder='Chọn tỉnh thành'
                                  onChange={(e) => {
                                    setCityId(e.target.value);
                                  }}
                                  bg='#fff'
                                  _focusVisible={{ border: 'none' }}>
                                  {local?.map((item, index) => (
                                    <option key={index} value={item.Name}>
                                      {item.Name}
                                    </option>
                                  ))}
                                </Select>
                                <Select
                                  placeholder='Chọn quận huyện'
                                  onChange={(e) => {
                                    setDistrictId(e.target.value);
                                  }}
                                  bg='#fff'
                                  _focusVisible={{ border: 'none' }}>
                                  {local?.map((item) => {
                                    if (item.Name === cityId) {
                                      return item?.Districts?.map(
                                        (district, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={district.Name}>
                                              {district.Name}
                                            </option>
                                          );
                                        }
                                      );
                                    }
                                  })}
                                </Select>
                                <Select
                                  placeholder='Chọn phường xã'
                                  onChange={(e) => {
                                    setWardId(e.target.value);
                                  }}
                                  bg='#fff'
                                  _focusVisible={{ border: 'none' }}>
                                  {local?.map((item) => {
                                    if (item.Name === cityId) {
                                      return item?.Districts?.map(
                                        (district) => {
                                          if (district.Name === districtId) {
                                            return district?.Wards.map(
                                              (ward, index) => {
                                                return (
                                                  <option
                                                    key={index}
                                                    value={ward.Name}>
                                                    {ward.Name}
                                                  </option>
                                                );
                                              }
                                            );
                                          }
                                        }
                                      );
                                    }
                                  })}
                                </Select>
                                {/* <FormControl
                                  isRequired
                                  isInvalid={
                                    errors.addressDetail &&
                                    touched.addressDetail
                                  }> */}
                                <Input
                                  id='addressDetail'
                                  placeholder='Địa chỉ cụ thể'
                                  onChange={(e) =>
                                    handleAddressChange(e.target.value)
                                  }
                                  // value={values.addressDetail}
                                  focusBorderColor='black'
                                  bg={'white'}
                                />
                                {/* <FormErrorMessage>
                                    {errors.addressDetail}
                                  </FormErrorMessage>
                                </FormControl> */}
                              </Stack>
                            </Box>
                          ) : (
                            <></>
                          )}
                          {value === 'store' ? (
                            <Box bg='#f8f8f8'>
                              <RadioGroup
                                onChange={setShowroom}
                                value={showroom}
                                m='20px'>
                                <Stack direction='row' mb={'20px'}>
                                  <Radio value='Showroom 1'>
                                    Apple Store Đà Nẵng - Showroom 1
                                  </Radio>
                                  <Radio value='Showroom 2'>
                                    Apple Store Đà Nẵng - Showroom 2
                                  </Radio>
                                </Stack>
                                {showroom === 'Showroom 1' ? (
                                  <Text>
                                    152 Hàm Nghi, Quận Thanh Khê, Tp. ĐN
                                  </Text>
                                ) : (
                                  <></>
                                )}
                                {showroom === 'Showroom 2' ? (
                                  <Text>
                                    52 Nguyễn Văn Linh, Quận Hải Châu, Tp. ĐN
                                  </Text>
                                ) : (
                                  <></>
                                )}
                              </RadioGroup>
                            </Box>
                          ) : (
                            <></>
                          )}
                        </Stack>
                      </Box>
                      <Box>
                        <Text fontSize={'17px'} fontWeight='700' color='#333'>
                          3. Chọn hình thức thanh toán
                        </Text>
                        <RadioGroup onChange={setPayment} value={payment}>
                          <Stack direction='column' m={'10px'}>
                            <Radio
                              colorScheme='red'
                              borderColor={'3px solid #f0f0f0'}
                              boxShadow='0 0 0 1px red'
                              value='cod'>
                              Thanh toán tiền mặt khi nhận hàng
                            </Radio>
                            <Radio
                              colorScheme='red'
                              borderColor={'3px solid #f0f0f0'}
                              boxShadow='0 0 0 1px red'
                              value='banking'>
                              Thanh toán qua chuyển khoản qua tài khoản ngân
                              hàng (khuyên dùng)
                            </Radio>
                          </Stack>
                        </RadioGroup>
                        {payment === 'cod' ? (
                          <Box
                            m='10px'
                            p={'20px'}
                            bg='#f8f8f8'
                            border={'1px solid #e1e1e1'}
                            borderRadius='4px'
                            whiteSpace={'normal'}>
                            Quý khách sẽ thanh toán bằng tiền mặt khi nhận hàng.
                            Vui lòng bấm nút " Đặt hàng" để hoàn tất.
                          </Box>
                        ) : (
                          <></>
                        )}
                        {payment === 'banking' ? (
                          <Box
                            m='10px'
                            p={'20px'}
                            bg='#f8f8f8'
                            border={'1px solid #e1e1e1'}
                            borderRadius='4px'
                            whiteSpace={'normal'}>
                            CÔNG TY TNHH CÔNG NGHỆ TIN HỌC APPLE STORE- Ngân
                            Hàng Tiên Phong (TPBANK)-CN Đà Nẵng STK: 0789787200
                            2- Ngân Hàng Kĩ Thương Việt Nam (Techcombank)-CN Đà
                            Nẵng STK: 0789787200 Vui lòng bấm nút " Đặt hàng" để
                            hoàn tất. Hoặc liên hệ Hotline: 0905.250036 Kim Như
                            để được tư vấn.
                          </Box>
                        ) : (
                          <></>
                        )}
                        <Box m={'20px 10px 0 10px'}>
                          <Button
                            w='100%'
                            backgroundColor='#c8191f'
                            color='white'
                            onClick={() => handleSubmit()}>
                            Đặt hàng
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </>
                )}
              </Formik>
            </TableContainer>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Cart;
