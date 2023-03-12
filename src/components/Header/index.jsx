import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Input,
  ListItem,
  Text,
  UnorderedList,
  useToast,
} from '@chakra-ui/react';
import {
  FaAngleDown,
  FaSearch,
  FaRegUserCircle,
  FaRegListAlt,
  FaCartPlus,
} from 'react-icons/fa';

import './Header.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/slice/authSlice';
import { useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { useState } from 'react';
import { useRef } from 'react';
import { getTotal, removeCartList } from '../../Redux/slice/cartSlice';

function Header() {
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart);
  const [category, setCategory] = useState({});
  const [query, setQuery] = useState();
  const [result, setResult] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  let searchRef = useRef();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axiosClient.get('/api/category');
        setCategory(res);
      } catch (error) {
        console.log('Failed to get category list: ', error);
      }
    };
    getCategory();
  }, []);

  useEffect(() => {
    const getSeachProduct = async () => {
      try {
        if (query?.length === 0) {
          setResult(false);
        } else {
          const res = await axiosClient.get(`/api/search/?q=${query}`);
          setResult(res);
          setIsOpen(true);
        }
      } catch (error) {
        console.log('Failed to get search product: ', error);
      }
    };
    getSeachProduct();
  }, [query]);

  useEffect(() => {
    let handle = (e) => {
      if (!searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
    };
  }, [searchRef]);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const handleClickCart = () => {
    if (!user.id) {
      navigate('login');
      return toast({
        title: 'Thông báo',
        description: 'Đăng nhập để thêm vào giỏ hàng.',
        status: 'info',
        position: 'top-right',
        duration: 10000,
        isClosable: true,
      });
    } else {
      navigate('cart');
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeCartList());
  };
  return (
    <Box bg='black' w='100%' h='125'>
      <Grid
        w={1200}
        h={125}
        p='0 10px'
        margin='0 auto'
        alignItems='center'
        templateColumns='repeat(4, 1fr)'>
        <GridItem w='280px' padding='0 22px' colSpan={1}>
          <Link to='/'>
            <Image
              width={55}
              m='0 auto'
              src='https://firebasestorage.googleapis.com/v0/b/apple-store-39b14.appspot.com/o/apple-logo.png?alt=media&token=cb5c764a-d239-4e65-a6c6-1431f594d58f'
              alt='Apple logo'
            />
          </Link>
        </GridItem>
        <GridItem w={490} colSpan={2} position='relative' left={-3}>
          <Box className='header-search' ref={searchRef}>
            <Flex className='header__search-select'>
              <span>Tất cả danh mục</span>
              <Icon as={FaAngleDown} className='select-icon' />
              <Box>
                <UnorderedList className='header-category'>
                  {Object.keys(category).length > 0 &&
                    category?.map((item, index) => (
                      <Link key={index} to='/news'>
                        <ListItem className='header-category-item'>
                          {item?.name}
                        </ListItem>
                      </Link>
                    ))}
                </UnorderedList>
              </Box>
            </Flex>

            <Box className='header__search-input '>
              <Input
                variant='unstyled'
                placeholder='Nhập tên sản phẩm, mã sản phẩm, từ khóa'
                style={{ border: 'none' }}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Icon as={FaSearch} className='search-icon' />
            </Box>

            {isOpen ? (
              Object.keys(result).length > 0 && (
                <Box
                  position={'absolute'}
                  top='42px'
                  w='100%'
                  maxH={'290px'}
                  overflowY='scroll'
                  bg={'white'}
                  borderRadius='3px'
                  boxShadow='0 0 6px 0 #c3c3c3'
                  zIndex='68'>
                  {result?.map((item, index) => (
                    <Link to={`product/${item.id}`} key={index}>
                      <Flex
                        mx='5px'
                        p={'15px 0'}
                        justifyContent='space-between'
                        borderBottom={'1px solid #e2e2e2'}>
                        <Text w={'200px'} ml='15px'>
                          {item.name}
                        </Text>
                        <Image
                          boxSize={'60px'}
                          src={item.image.slice(0, 1)}></Image>
                        <Box>
                          <Text
                            mr={'15px'}
                            px
                            fontSize={'14px'}
                            fontWeight='700'
                            color='#707070'
                            textDecoration={'line-through'}>
                            {item.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                            đ
                          </Text>
                          <Text
                            fontSize={'15px'}
                            fontWeight='700'
                            color='var(--primary)'>
                            {item.discountPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                            đ
                          </Text>
                        </Box>
                      </Flex>
                    </Link>
                  ))}
                </Box>
              )
            ) : (
              <></>
            )}
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Flex position='relative' left={-5}>
            <Box w='100%'>
              <Link to='/news' className='icon-link'>
                <Box w='70px'>
                  <Icon
                    as={FaRegListAlt}
                    className='header-icon'
                    fontSize={30}
                    display='flex'
                    margin='0 auto'
                    color='white'
                  />
                  <Text className='icon-text'>Tin tức</Text>
                </Box>
              </Link>
            </Box>
            <Box
              w='100%'
              position={'relative'}
              pr={'15px'}
              onClick={handleClickCart}>
              <Link className='icon-link'>
                <Icon
                  as={FaCartPlus}
                  className='header-icon'
                  fontSize={30}
                  display='flex'
                  margin='0 auto'
                  color='white'
                />
                <Text
                  w={'22px'}
                  position={'absolute'}
                  top='-6px'
                  right='32px'
                  // p='0 5px'
                  bg={'#e5101d'}
                  textAlign='center'
                  color={'white'}
                  borderRadius='22px'
                  fontSize={'12px'}>
                  {cart.cartTotalQuantity}
                </Text>
                <Text className='icon-text'>Giỏ hàng</Text>
              </Link>
            </Box>
            <Box w='100%'>
              {!user.id ? (
                <Link to='/login' className='icon-link'>
                  <Icon
                    as={FaRegUserCircle}
                    className='header-icon'
                    fontSize={30}
                    display='flex'
                    margin='0 auto'
                    color='white'
                  />
                  <Text className='icon-text'>Đăng nhập</Text>
                </Link>
              ) : (
                <div className='user__icon'>
                  <Link to='/admin' className='icon-link'>
                    <Icon
                      as={FaRegUserCircle}
                      className='header-icon'
                      fontSize={30}
                      display='flex'
                      margin='0 auto'
                      color='white'
                    />
                    <Text className='icon-text'>
                      <span>Hi, {user.firstName}</span>
                    </Text>
                    <div className='user__menu'>
                      <ul>
                        {user.isAdmin ? (
                          <Link to='dashboard'>
                            <li>Quản lý</li>
                          </Link>
                        ) : (
                          <div />
                        )}

                        <li>Thông tin</li>
                        <Link to='/order'>
                          <li>Đơn hàng</li>
                        </Link>
                        <Link to='/login' onClick={handleLogout}>
                          <li>Đăng xuất</li>
                        </Link>
                      </ul>
                    </div>
                  </Link>
                </div>
              )}
            </Box>
          </Flex>
        </GridItem>
        {/* </Flex> */}
      </Grid>
    </Box>
  );
}

export default Header;
