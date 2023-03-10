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
        title: 'Th??ng b??o',
        description: '????ng nh???p ????? th??m v??o gi??? h??ng.',
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
        title: 'Th??ng b??o',
        description: '????ng nh???p ????? th??m v??o gi??? h??ng.',
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
            <BreadcrumbLink>S???n ph???m</BreadcrumbLink>
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
                (2 l?????t ????nh gi??)
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
                    Gi?? ni??m y???t:
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
                      ??
                    </Text>
                  </Text>

                  {data?.quantity === 0 ? (
                    <Text color={'var(--primary)'}>H???T H??NG</Text>
                  ) : (
                    <Text color={'var(--primary)'}>C??N H??NG</Text>
                  )}
                </Flex>
                <Text m='10px 0'>
                  Gi?? b??n:
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
                    ??
                  </Text>
                  <Text
                    as={'span'}
                    ml='5px'
                    fontSize='13px'
                    fontStyle={'italic'}>
                    ( Gi?? ???? bao g???m VAT )
                  </Text>
                </Text>

                <Text m='10px 0 10px 0' fontWeight={600}>
                  L???a ch???n phi??n b???n
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
                  Ch???n m??u
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
                  Th??m v??o gi???
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
                <Text mb='5px'>Tr??? gi??p:</Text>
                <ListItem mt='0 !important'>
                  <Link to='news'>
                    <ListIcon
                      as={FaInfoCircle}
                      color='red.500'
                      fontSize={'13px'}
                      mb='2px'
                    />
                    <Text as='span' fontSize={'14'} color='#333'>
                      H?????ng d???n mua h??ng nhanh ch??ng
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
                    Ch??nh s??ch b???o h??nh t???i Phi Long
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
                    Ch??nh s??ch ?????i h??ng
                  </Text>
                </ListItem>
              </List>
              <List spacing={3} mt='20px'>
                <Text mb='5px'>??i???n tho???i t?? v???n - ?????t h??ng:</Text>
                <ListItem mt='0 !important'>
                  <Link to='news'>
                    <ListIcon
                      as={FaPhoneAlt}
                      fontSize={'13px'}
                      mb='2px'
                      color='red.500'
                    />
                    <Text as='span' fontSize={'14'} color='#333'>
                      ??nh V??n - 0911 299 230
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
                    Thanh H?? - 0903 555 610
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
                    T??? Nga - 0911 300 307
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
                    Th??y V??n - 0911 299 212
                  </Text>
                </ListItem>
              </List>
              <List spacing={3} mt='20px'>
                <Text mb='5px'>?????a ch??? mua h??ng:</Text>
                <ListItem mt='0 !important'>
                  <Link to='news'>
                    <ListIcon
                      as={FaShoppingCart}
                      fontSize={'13px'}
                      mb='2px'
                      color='red.500'
                    />
                    <Text as='span' fontSize={'14'} color='#333'>
                      152 H??m Nghi, Thanh Kh??, TP. ???? N???ng
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
                    52 Nguy???n V??n Linh, H???i Ch??u, TP. ???? N???ng
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
                    48 H??ng V????ng, Ph?? Nhu????n, TP. Hu???
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
                ?????C ??I???M N???I B???T
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
                  Th??ng s??? k??? thu???t
                </Text>
              </Box>
              <Box m={'10px 13px'}>
                <TableContainer whiteSpace='normal'>
                  <Table variant='striped' pb={'20px'}>
                    <Tbody>
                      <Tr>
                        <Td w='130px' p='10px'>
                          H??ng:
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
                          M??n h??nh:
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
                          H??? ??i???u h??nh:
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
              ????NH GI?? S???N PH???M
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
                <Text fontSize={'15px'}>0 ????nh gi?? & nh???n x??t</Text>
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
                    2022-10-29 15:35 | Ph??n lo???i h??ng: M???u 3
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
                  <Text>Ph???m Th??? Y???n</Text>
                  <Icon as={FaStar} fontSize='13px' color='var(--primary)' />
                  <Icon as={FaStar} fontSize='13px' color='var(--primary)' />
                  <Icon as={FaStar} fontSize='13px' color='var(--primary)' />
                  <Icon as={FaStar} fontSize='13px' color='var(--primary)' />
                  <Icon as={FaStar} fontSize='13px' color='var(--primary)' />
                  <Text fontSize='13px' color={'rgba(0,0,0,.54)'}>
                    2022-10-29 15:35 | Ph??n lo???i h??ng: M???u 3
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
