import { ChevronRightIcon, Icon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  List,
  ListIcon,
  ListItem,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Tr,
  useNumberInput,
  useToast,
} from '@chakra-ui/react';
import {
  FaStar,
  FaInfoCircle,
  FaPhoneAlt,
  FaShoppingCart,
  FaCircle,
  FaCartPlus,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import './ProductDetail.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Redux/slice/cartSlice';

function ProductDetail() {
  const user = useSelector((state) => state.auth.user);
  let { id } = useParams();
  const [data, setData] = useState();
  const [colorPrice, setColorPrice] = useState();
  // const [finalPrice, setFinalPrice] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axiosClient.get(`/api/product/${id}`);
        setData(res);
      } catch (error) {
        return console.log(error);
      }
    };
    getProduct();
  }, [id]);

  // useEffect(() => {
  //   const addCartItem = async () => {
  //     try {
  //       const itemCart = {
  //         cartId: cart.cartList.cartId,
  //         productId: cart.cartList.id,
  //         quantity: cart.cartList.quantity,
  //       };
  //       await axiosClient.post('/api/cartitem', itemCart);
  //     } catch (error) {
  //       return console.log(error);
  //     }
  //   };
  //   addCartItem();
  // }, [cart]);

  // const price = data?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  // const discountPrice = data?.discountPrice
  //   .toString()
  //   .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const handleSetColorPrice = (e) => {
    setColorPrice(e);
  };

  const handleAddCart = async () => {
    // setFinalPrice(data?.discountPrice + (colorPrice ?? ''));
    if (!user.id) {
      navigate('/login');
      return toast({
        title: 'Thông báo',
        description: 'Đăng nhập để thêm vào giỏ hàng.',
        status: 'info',
        position: 'top-right',
        duration: 10000,
        isClosable: true,
      });
    }
    // if (!user.cartId) {
    //   await axiosClient.post('/api/cart', user);
    // }
    // const {}
    const itemCartData = { ...data, cartId: user.id };
    dispatch(addToCart(itemCartData));
  };

  const handleBuy = () => {
    if (!user.id) {
      navigate('/login');
      return toast({
        title: 'Thông báo',
        description: 'Đăng nhập để thêm vào giỏ hàng.',
        status: 'info',
        position: 'top-right',
        duration: 10000,
        isClosable: true,
      });
    }
    const itemCartData = { ...data, cartId: user.id };
    dispatch(addToCart(itemCartData));
    navigate('/cart');
  };
  // console.log(data);
  // console.log('finalprice:', finalPrice);

  const description = data?.description;
  const news = description?.news.split('-');

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: 10,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

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
            <BreadcrumbLink>Sản phẩm</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box my={'10px'} padding='15px 0 10px 0' bg={'white'}>
          <Box mx='20px' borderBottom='2px solid #E7E7E7'>
            <Flex alignItems={'center'} my='10px'>
              <Text mr={'20px'} fontSize='18px' fontWeight='bold' color='#333'>
                {data?.name}
              </Text>
              <Icon as={FaStar} color='#ffa53f' />
              <Icon as={FaStar} color='#ffa53f' />
              <Icon as={FaStar} color='#ffa53f' />
              <Icon as={FaStar} color='#ffa53f' />
              <Icon as={FaStar} color='#ffa53f' />
              <Text ml={'10px'} fontSize='15px' fontWeight={600}>
                (2 lượt đánh giá)
              </Text>
            </Flex>
          </Box>
          <Grid templateColumns='repeat(7, 1fr)' gap={3} w='100%' mb={'10px'}>
            <GridItem
              w='100%'
              mt={'30px'}
              justifyContent={'center'}
              colSpan={3}>
              <Box width='340px' m={'30px auto'}>
                <Tabs variant='unstyled' colorScheme=''>
                  <TabPanels mb={'10px'}>
                    {data?.image.map((item, index) => (
                      <TabPanel key={index}>
                        <Image src={item} />
                      </TabPanel>
                    ))}
                  </TabPanels>
                  <TabList mt={'30px'} justifyContent={'center'}>
                    {data?.image.map((item, index) => (
                      <Tab
                        key={index}
                        p={0}
                        _selected={{
                          filter: 'brightness(60%)',
                        }}>
                        <Image
                          src={item}
                          boxSize='50px'
                          m='0px 5px'
                          p='5px 5px'
                          border={'1px solid #e2e2e2'}
                          objectFit='cover'
                        />
                      </Tab>
                    ))}
                  </TabList>
                </Tabs>
              </Box>
            </GridItem>
            <GridItem w='100%' colSpan={2}>
              <Box p='20px 0' mt={'10px'}>
                <Flex justifyContent={'space-between'}>
                  <Text fontSize={'14px'}>
                    Giá niêm yết:
                    <Text
                      as='span'
                      ml={'15px'}
                      fontSize={'15px'}
                      fontWeight='700'
                      textDecoration={'line-through'}
                      textDecorationColor='#797979'>
                      {(data?.price + (colorPrice ?? ''))
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      đ
                    </Text>
                  </Text>

                  {data?.quantity === 0 ? (
                    <Text color={'var(--primary)'}>HẾT HÀNG</Text>
                  ) : (
                    <Text color={'var(--primary)'}>CÒN HÀNG</Text>
                  )}
                </Flex>
                <Text m='10px 0'>
                  Giá bán:
                  <Text
                    as='span'
                    ml={'15px'}
                    fontSize={'18px'}
                    fontWeight='700'
                    color={'var(--primary)'}
                    textDecorationColor='#797979'>
                    {(data?.discountPrice + (colorPrice ?? ''))
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    đ
                  </Text>
                  <Text
                    as={'span'}
                    ml='5px'
                    fontSize='13px'
                    fontStyle={'italic'}>
                    ( Giá đã bao gồm VAT )
                  </Text>
                </Text>

                <Text m='10px 0 10px 0' fontWeight={600}>
                  Lựa chọn phiên bản
                </Text>
                <Box w={'200px'} my='5px'>
                  {data?.storage.map((item, index) => (
                    <Button
                      key={index}
                      w={'80px'}
                      m={'6px 10px'}
                      border={'1px solid #D1D5DB'}
                      borderRadius='5px'
                      bg={'white'}>
                      {item}
                    </Button>
                  ))}
                </Box>
                <Text m='10px 0 10px 0' fontWeight={600}>
                  Chọn màu
                </Text>
                <Box w={'200px'}>
                  {data?.color?.map((item, index) => (
                    <Button
                      w={'80px'}
                      m={'6px 10px'}
                      border={'1px solid #D1D5DB'}
                      borderRadius='5px'
                      bg={'white'}
                      key={index}
                      onClick={(e) => handleSetColorPrice(item.priceOption)}>
                      {item.color}
                    </Button>
                  ))}
                </Box>
              </Box>
              <Flex justifyContent={'space-between'}>
                <HStack maxW='150px' justifyContent={'space-between'}>
                  <Button
                    {...dec}
                    size='sm'
                    bg='red.500'
                    color={'white'}
                    _hover={{ bg: 'red.400' }}>
                    -
                  </Button>
                  <Input
                    {...input}
                    width='50px'
                    size='sm'
                    textAlign={'center'}
                  />
                  <Button
                    {...inc}
                    size='sm'
                    bg='red.500'
                    color={'white'}
                    _hover={{ bg: 'red.400' }}>
                    +
                  </Button>
                </HStack>
                <Button
                  bg={'white'}
                  color={'var(--primary)'}
                  fontSize='15px'
                  border={'1px solid var(--primary)'}
                  borderRadius='3px'
                  _hover={{ bg: 'rgba(208,1,27,.08)' }}
                  onClick={handleAddCart}>
                  <Icon as={FaCartPlus} mr='10px' fontSize='18px' />
                  Thêm vào giỏ
                </Button>
              </Flex>
              <Button
                onClick={handleBuy}
                w={'100%'}
                h='50px'
                m='20px 0'
                bg='var(--primary)'
                color={'white'}
                borderRadius='3px'
                _hover={{ bg: 'red.400' }}>
                {' '}
                MUA NGAY
              </Button>
            </GridItem>

            <GridItem w='100%' colSpan={2}>
              <List spacing={3}>
                <Text mb='5px'>Trợ giúp:</Text>
                <ListItem mt='0 !important'>
                  <Link to='news'>
                    <ListIcon
                      as={FaInfoCircle}
                      color='red.500'
                      fontSize={'13px'}
                      mb='2px'
                    />
                    <Text as='span' fontSize={'14'} color='#333'>
                      Hướng dẫn mua hàng nhanh chóng
                    </Text>
                  </Link>
                </ListItem>
                <ListItem mt='0 !important'>
                  <ListIcon
                    as={FaInfoCircle}
                    fontSize={'13px'}
                    mb='2px'
                    color='red.500'
                  />
                  <Text as='span' fontSize={'14'} color='#333'>
                    Chính sách bảo hành tại Phi Long
                  </Text>
                </ListItem>
                <ListItem mt='0 !important'>
                  <ListIcon
                    as={FaInfoCircle}
                    fontSize={'13px'}
                    mb='2px'
                    color='red.500'
                  />
                  <Text as='span' fontSize={'14'} color='#333'>
                    Chính sách đổi hàng
                  </Text>
                </ListItem>
              </List>
              <List spacing={3} mt='20px'>
                <Text mb='5px'>Điện thoại tư vấn - đặt hàng:</Text>
                <ListItem mt='0 !important'>
                  <Link to='news'>
                    <ListIcon
                      as={FaPhoneAlt}
                      fontSize={'13px'}
                      mb='2px'
                      color='red.500'
                    />
                    <Text as='span' fontSize={'14'} color='#333'>
                      Ánh Vân - 0911 299 230
                    </Text>
                  </Link>
                </ListItem>
                <ListItem mt='0 !important'>
                  <ListIcon
                    as={FaPhoneAlt}
                    fontSize={'13px'}
                    mb='2px'
                    color='red.500'
                  />
                  <Text as='span' fontSize={'14'} color='#333'>
                    Thanh Hà - 0903 555 610
                  </Text>
                </ListItem>
                <ListItem mt='0 !important'>
                  <ListIcon
                    as={FaPhoneAlt}
                    fontSize={'13px'}
                    mb='2px'
                    color='red.500'
                  />
                  <Text as='span' fontSize={'14'} color='#333'>
                    Tố Nga - 0911 300 307
                  </Text>
                </ListItem>
                <ListItem mt='0 !important'>
                  <ListIcon
                    as={FaPhoneAlt}
                    fontSize={'13px'}
                    mb='2px'
                    color='red.500'
                  />
                  <Text as='span' fontSize={'14'} color='#333'>
                    Thùy Vân - 0911 299 212
                  </Text>
                </ListItem>
              </List>
              <List spacing={3} mt='20px'>
                <Text mb='5px'>Địa chỉ mua hàng:</Text>
                <ListItem mt='0 !important'>
                  <Link to='news'>
                    <ListIcon
                      as={FaShoppingCart}
                      fontSize={'13px'}
                      mb='2px'
                      color='red.500'
                    />
                    <Text as='span' fontSize={'14'} color='#333'>
                      152 Hàm Nghi, Thanh Khê, TP. Đà Nẵng
                    </Text>
                  </Link>
                </ListItem>
                <ListItem mt='0 !important'>
                  <ListIcon
                    as={FaShoppingCart}
                    fontSize={'13px'}
                    mb='2px'
                    color='red.500'
                  />
                  <Text as='span' fontSize={'14'} color='#333'>
                    52 Nguyễn Văn Linh, Hải Châu, TP. Đà Nẵng
                  </Text>
                </ListItem>
                <ListItem mt='0 !important'>
                  <ListIcon
                    as={FaShoppingCart}
                    fontSize={'13px'}
                    mb='2px'
                    color='red.500'
                  />
                  <Text as='span' fontSize={'14'} color='#333'>
                    48 Hùng Vương, Phú Nhuận, TP. Huế
                  </Text>
                </ListItem>
              </List>
            </GridItem>
          </Grid>
        </Box>
        <Grid templateColumns='repeat(7, 1fr)' gap={3}>
          <GridItem colSpan={5} maxH='100%' bg={'white'}>
            <Box m='20px' padding={'3px 5px'} bg='#f2f2f2' borderRadius={'5px'}>
              <Text
                my={'5px'}
                textAlign={'center'}
                fontSize={'17px'}
                fontWeight='700'>
                ĐẶC ĐIỂM NỔI BẬT
              </Text>
              <List spacing={3} ml='5px'>
                {description?.feature?.map((item, index) => (
                  <ListItem fontSize={'14px'} key={index}>
                    <ListIcon as={FaCircle} mb='5px' fontSize='5px' />
                    {item}
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box m='0 20px'>
              {news?.map((item, index) => (
                <Text mb={'10px'} fontSize={'14px'} key={index}>
                  {item}
                </Text>
              ))}
            </Box>
          </GridItem>

          <GridItem colSpan={2}>
            <Box bg={'white'}>
              <Box m={'0 13px'} padding={'15px 0 5px 0'}>
                <Text fontSize='17px' fontWeight={600}>
                  Thông số kỹ thuật
                </Text>
              </Box>
              <Box m={'10px 13px'}>
                <TableContainer whiteSpace='normal'>
                  <Table variant='striped' pb={'20px'}>
                    <Tbody>
                      <Tr>
                        <Td w='130px' p='10px'>
                          Hãng:
                        </Td>
                        <Td p='10px'>{data?.specifications?.brand}</Td>
                      </Tr>
                      <Tr>
                        <Td w='130px' p='10px'>
                          Chip:
                        </Td>
                        <Td p='10px'>{data?.specifications?.chip}</Td>
                      </Tr>
                      <Tr>
                        <Td w='130px' p='10px'>
                          Màn hình:
                        </Td>
                        <Td p='10px'>{data?.specifications?.display}</Td>
                      </Tr>
                      <Tr>
                        <Td w='130px' p='10px'>
                          RAM:
                        </Td>
                        <Td p='10px'>{data?.specifications?.ram}</Td>
                      </Tr>
                      <Tr>
                        <Td w='130px' p='10px'>
                          Pin:
                        </Td>
                        <Td p='10px'>{data?.specifications?.pin}</Td>
                      </Tr>
                      <Tr>
                        <Td w='130px' p='10px'>
                          Camera:
                        </Td>
                        <Td p='10px'>{data?.specifications?.camera}</Td>
                      </Tr>
                      <Tr>
                        <Td w='130px' p='10px'>
                          Hệ điều hành:
                        </Td>
                        <Td p='10px'>
                          {data?.specifications?.operatingSystem}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td w='130px' p='10px'>
                          SIM:
                        </Td>
                        <Td p='10px'>{data?.specifications?.SIM}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </GridItem>
          <GridItem colSpan={5} bg={'white'}>
            <Text m={'20px'} fontWeight='600'>
              ĐÁNH GIÁ SẢN PHẨM
            </Text>
            <Flex
              m={'20px'}
              p='10px 20px'
              alignItems={'center'}
              border='1px solid #f2f2f2'>
              <Box m={'0 10px'} textAlign='center'>
                <Text mb={'5px'} fontSize={'20px'} fontWeight='600'>
                  4.5/5
                </Text>
                <Icon as={FaStar} color='var(--primary)' />
                <Icon as={FaStar} color='var(--primary)' />
                <Icon as={FaStar} color='var(--primary)' />
                <Icon as={FaStar} color='var(--primary)' />
                <Icon as={FaStar} color='var(--primary)' />
                <Text fontSize={'15px'}>0 đánh giá & nhận xét</Text>
              </Box>
              <Box m={'0 0 0 30px'}>
                <Button m='0 5px' bg={'#f2f2f2;'}>
                  5 sao (10)
                </Button>
                <Button m='0 5px' bg={'#f2f2f2;'}>
                  4 sao (10)
                </Button>
                <Button m='0 5px' bg={'#f2f2f2;'}>
                  3 sao (10)
                </Button>
                <Button m='0 5px' bg={'#f2f2f2;'}>
                  2 sao (10)
                </Button>
                <Button m='0 5px' bg={'#f2f2f2;'}>
                  1 sao (10)
                </Button>
              </Box>
            </Flex>
            <Box m={'20px'}>
              <Flex mt={'15px'} pl={'20px'} borderBottom='2px solid #f2f2f2'>
                <Text
                  h={'35px'}
                  m='7px 10px 0 0'
                  p={'4px 14px'}
                  bg={'#f3f3f3'}
                  borderRadius={'50%'}
                  // lineHeight='33px'
                >
                  S
                </Text>
                <Box>
                  <Text>daokhanhhoa</Text>
                  <Icon as={FaStar} fontSize='13px' color='var(--primary)' />
                  <Icon as={FaStar} fontSize='13px' color='var(--primary)' />
                  <Icon as={FaStar} fontSize='13px' color='var(--primary)' />
                  <Icon as={FaStar} fontSize='13px' color='var(--primary)' />
                  <Icon as={FaStar} fontSize='13px' color='var(--primary)' />
                  <Text fontSize='13px' color={'rgba(0,0,0,.54)'}>
                    2022-10-29 15:35 | Phân loại hàng: Mẫu 3
                  </Text>
                  <Text my='10px' fontSize='15px'>
                    San pham tuyet lam toi rat thich
                  </Text>
                </Box>
              </Flex>
              <Flex mt={'15px'} pl={'20px'} borderBottom='2px solid #f2f2f2'>
                <Text
                  h={'35px'}
                  m='7px 10px 0 0'
                  p={'4px 14px'}
                  bg={'#f3f3f3'}
                  borderRadius={'50%'}
                  // lineHeight='33px'
                >
                  S
                </Text>
                <Box>
                  <Text>Phạm Thị Yến</Text>
                  <Icon as={FaStar} fontSize='13px' color='var(--primary)' />
                  <Icon as={FaStar} fontSize='13px' color='var(--primary)' />
                  <Icon as={FaStar} fontSize='13px' color='var(--primary)' />
                  <Icon as={FaStar} fontSize='13px' color='var(--primary)' />
                  <Icon as={FaStar} fontSize='13px' color='var(--primary)' />
                  <Text fontSize='13px' color={'rgba(0,0,0,.54)'}>
                    2022-10-29 15:35 | Phân loại hàng: Mẫu 3
                  </Text>
                  <Text my='10px' fontSize='15px'>
                    San pham tuyet lam toi rat thich
                  </Text>
                </Box>
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductDetail;
