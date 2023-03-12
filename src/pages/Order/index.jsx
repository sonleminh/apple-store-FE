import { ChevronRightIcon, Icon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Image,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { FaOpencart } from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

const Order = () => {
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState({});

  useEffect(() => {
    const getOrdersByUser = async () => {
      try {
        const response = await axiosClient.get(`/api/order/user/${user.id}`);
        setOrders(response);
      } catch (error) {
        console.log('Failed to get sale product list: ', error);
      }
    };
    getOrdersByUser();
  }, [user.id]);
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
            <BreadcrumbLink>Đơn hàng</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        {orders.length !== 0 ? (
          <>
            <Box w={'800px'} m='0 auto' bg='white'>
              <Tabs>
                <TabList justifyContent={'space-around'}>
                  <Tab w='100%' py='10px'>
                    Tất cả
                  </Tab>
                  <Tab w='100%' py='10px'>
                    Đang giao
                  </Tab>
                  <Tab w='100%' py='10px'>
                    Hoàn thành
                  </Tab>
                  <Tab w='100%' py='10px'>
                    Đã hủy
                  </Tab>
                </TabList>

                <TabPanels>
                  {/* <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel> */}
                </TabPanels>
              </Tabs>
            </Box>
            {Object.keys(orders).length > 0 &&
              orders?.map((item, index) => (
                <Box
                  key={index}
                  w={'800px'}
                  m='10px auto'
                  p='20px'
                  boxShadow={'0px 4px 4px rgb(0 0 0 / 25%)'}
                  bg='white'>
                  {item?.orderItems.map((item, index) => (
                    <Link to={`/product/${item.productId}`}>
                      <Flex
                        key={index}
                        my='10px'
                        justifyContent={'space-between'}
                        alignItems='center'>
                        <Text
                          w='200px'
                          maxH='50px'
                          whiteSpace='normal'
                          overflow='hidden'
                          textOverflow={'ellipsis'}>
                          {item.name}
                        </Text>

                        <Image w='80px' src={item.image[0]} />
                        <Text fontWeight='700'>x {item.quantity}</Text>
                        <Flex alignItems={'center'}>
                          <Text
                            mr='5px'
                            fontSize={'13px'}
                            textDecoration={'line-through'}
                            textDecorationColor='#797979'>
                            {item.price} đ
                          </Text>{' '}
                          <Text fontSize={'15px'} color={'var(--primary)'}>
                            {item.discountPrice} đ
                          </Text>
                        </Flex>
                      </Flex>
                    </Link>
                  ))}
                  <Flex justifyContent={'end'} alignItems='center'>
                    Thành tiền:{' '}
                    <Text
                      ml='10px'
                      fontSize={'18px'}
                      fontWeight='700'
                      color={'var(--primary)'}>
                      {item.totalAmount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                      đ
                    </Text>
                  </Flex>
                </Box>
              ))}
          </>
        ) : (
          <Box
            w={'800px'}
            m='0 auto'
            p='20px'
            boxShadow={'0px 4px 4px rgb(0 0 0 / 25%)'}
            bg='white'
            textAlign={'center'}>
            <Icon as={FaOpencart} fontSize='50px' />
            <Text my={'25px'} fontSize={'18px'} color='rgba(0, 0, 0, 0.71)'>
              Chưa có đơn hàng nào. Hãy đặt hàng ngay.
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
        )}
      </Container>
    </Box>
  );
};

export default Order;
