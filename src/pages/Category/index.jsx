import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import {
  FaBars,
  FaAngleRight,
  FaHeadphonesAlt,
  FaMobileAlt,
  FaRegNewspaper,
} from 'react-icons/fa';
import { FiWatch } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import './Category.styles.scss';
import axiosClient from '../../api/axiosClient';

function Categories() {
  const [data, setData] = useState();
  const [dataById, setDataById] = useState('');

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axiosClient.get('/api/category');
        setData(response);
      } catch (error) {
        console.log('Failed to fetch category list: ', error);
      }
    };
    fetchCategoryData();
  }, []);
  const options = {
    items: 1,
    rewind: true,
    autoplay: true,
    loop: true,
  };

  const handleClick = (event) => {
    setDataById(data[event.currentTarget.id ?? '']);
  };

  return (
    <>
      <Box backgroundColor='#fff'>
        <Grid
          templateColumns='repeat(4, 1fr)'
          w={1200}
          h='40px'
          margin='0 auto'
          padding='0 10px'
          alignItems='center'>
          <GridItem
            position='relative'
            w='280px'
            h='40px'
            display='flex'
            bg='#c8191f'
            color='white'
            fontSize={17}
            fontWeight={700}
            alignItems='center'>
            <Icon
              as={FaBars}
              position='relative'
              top='-2px'
              margin='0 14px'
              fontSize={18}
            />
            <Text fontSize='md' color={'white'}>
              DANH MỤC SẢN PHẨM
            </Text>
            <UnorderedList
              position={'absolute'}
              top='40px'
              w={'280px'}
              m='0'
              zIndex={69}
              bg='white'
              className='category__list'>
              <Link to='/'>
                <ListItem className='list__item' listStyleType={'none'}>
                  <Box
                    display={'flex'}
                    w={'100%'}
                    h={'40px'}
                    alignItems='center'
                    justifyContent={'space-between'}>
                    <Flex alignItems={'center'}>
                      <Image
                        mx='10px'
                        src='category-icon1.png'
                        alt='icon-category'
                      />
                      <Text fontSize='15px' fontWeight='500' color='#c8191f'>
                        Tin Khuyến Mãi
                      </Text>
                    </Flex>
                    <Icon as={FaAngleRight} className='category__icon-open' />
                  </Box>
                </ListItem>
              </Link>
              <Link to='/iphone'>
                <ListItem
                  className='list__item'
                  listStyleType={'none'}
                  id='0'
                  onMouseOver={handleClick}>
                  <Box
                    display={'flex'}
                    w={'100%'}
                    h={'40px'}
                    alignItems='center'
                    justifyContent={'space-between'}>
                    <Flex alignItems={'center'}>
                      <Image
                        className='category__icon'
                        src='category-icon-apple.png'
                        alt='icon-apple'></Image>
                      iPhone
                    </Flex>
                    <Icon as={FaAngleRight} className='category__icon-open' />
                  </Box>
                </ListItem>
              </Link>
              <Link to='/ipad'>
                <ListItem
                  className='list__item'
                  listStyleType={'none'}
                  id='1'
                  onMouseOver={handleClick}>
                  <Box
                    display={'flex'}
                    w={'100%'}
                    h={'40px'}
                    alignItems='center'
                    justifyContent={'space-between'}>
                    <Flex alignItems={'center'}>
                      <Icon as={FaMobileAlt} className='category__icon' />
                      iPad
                    </Flex>
                    <Icon as={FaAngleRight} className='category__icon-open' />
                  </Box>
                </ListItem>
              </Link>
              <Link to='/apple-watch'>
                <ListItem
                  className='list__item'
                  listStyleType={'none'}
                  id='2'
                  onMouseOver={handleClick}>
                  <Box
                    display={'flex'}
                    w={'100%'}
                    h={'40px'}
                    alignItems='center'
                    justifyContent={'space-between'}>
                    <Flex alignItems={'center'}>
                      <Icon as={FiWatch} m='0 12px' fontSize={'18px'} />
                      <Text>Apple Watch</Text>
                    </Flex>
                    <Icon as={FaAngleRight} className='category__icon-open' />
                  </Box>
                </ListItem>
              </Link>
              <Link to='/'>
                <ListItem
                  className='list__item'
                  listStyleType={'none'}
                  id='3'
                  onMouseOver={handleClick}>
                  <Box
                    display={'flex'}
                    w={'100%'}
                    h={'40px'}
                    alignItems='center'
                    justifyContent={'space-between'}>
                    <Flex alignItems={'center'}>
                      <Image
                        className='category__icon'
                        src='category-icon-laptop.png'
                        alt='icon-macbook'></Image>
                      MacBook
                    </Flex>
                    <Icon as={FaAngleRight} className='category__icon-open' />
                  </Box>
                </ListItem>
              </Link>
              <Link to='/'>
                <ListItem
                  className='list__item'
                  listStyleType={'none'}
                  id='4'
                  onMouseOver={handleClick}>
                  <Box
                    display={'flex'}
                    w={'100%'}
                    h={'40px'}
                    alignItems='center'
                    justifyContent={'space-between'}>
                    <Flex alignItems={'center'}>
                      <Icon as={FaHeadphonesAlt} className='category__icon' />
                      Airpods
                    </Flex>
                    <Icon as={FaAngleRight} className='category__icon-open' />
                  </Box>
                </ListItem>
              </Link>
              <Link to='/'>
                <ListItem
                  className='list__item'
                  listStyleType={'none'}
                  id='5'
                  onMouseOver={handleClick}>
                  <Box
                    display={'flex'}
                    w={'100%'}
                    h={'40px'}
                    alignItems='center'
                    justifyContent={'space-between'}>
                    <Flex alignItems={'center'}>
                      <Image
                        className='category__icon'
                        src='category-icon-PC.png'
                        alt='icon-PC'></Image>
                      iMac, Mac
                    </Flex>
                    <Icon as={FaAngleRight} className='category__icon-open' />
                  </Box>
                </ListItem>
              </Link>
              <Link to='/'>
                <ListItem
                  className='list__item'
                  listStyleType={'none'}
                  id='6'
                  onMouseOver={handleClick}>
                  <Box
                    display={'flex'}
                    w={'100%'}
                    h={'40px'}
                    alignItems='center'
                    justifyContent={'space-between'}>
                    <Flex alignItems={'center'}>
                      <Image
                        className='category__icon'
                        src='category-icon-accessories.png'
                        alt='icon-accessories'></Image>
                      Phụ Kiện
                    </Flex>
                    <Icon as={FaAngleRight} className='category__icon-open' />
                  </Box>
                </ListItem>
              </Link>
              <Link to='/'>
                <ListItem
                  className='list__item'
                  listStyleType={'none'}
                  id='7'
                  onMouseOver={handleClick}>
                  <Box
                    display={'flex'}
                    w={'100%'}
                    h={'40px'}
                    alignItems='center'
                    justifyContent={'space-between'}>
                    <Flex alignItems={'center'}>
                      <Icon as={FaRegNewspaper} className='category__icon' />
                      Tin Công Nghệ
                    </Flex>
                    <Icon as={FaAngleRight} className='category__icon-open' />
                  </Box>
                </ListItem>
              </Link>
              <Box className='category__sub-menu'>
                {dataById?.model?.map((item, index) => (
                  <Link to={`/model/${item?.id}`} key={index}>
                    <Flex
                      minW={'180px'}
                      h={'40px'}
                      alignItems={'center'}
                      justifyContent='space-between'
                      _hover={{ bg: '#f5f5f5' }}>
                      <Text p={'0 15px'} whiteSpace='nowrap' fontWeight='400'>
                        {item?.name}
                      </Text>
                      <Icon as={FaAngleRight} mr='5px' />
                    </Flex>
                  </Link>
                ))}
              </Box>
            </UnorderedList>
          </GridItem>
          <GridItem w='100%' h='100%' display='flex' alignItems='center'>
            <Box position='relative' left='10px' ml='1px'>
              <iframe
                src='https://giphy.com/embed/fjxeswpTKg3Uy2INQx'
                title='gift'
                width='30'
                height='30'
                frameBorder='0'
                allowFullScreen></iframe>
            </Box>
            <Link href='https://chakra-ui.com'>
              <Text className='link-title'>
                Ưu Đãi Thanh Toán iPhone 14 Series
              </Text>
            </Link>
            <Link href='https://chakra-ui.com' className='link-title'>
              <Text borderLeft='1px solid #e2e2e2' pl='20px'>
                Macbook Giảm Đến 2 Triệu
              </Text>
            </Link>

            <Link href='https://chakra-ui.com' className='link-title'>
              <Text borderLeft='1px solid #e2e2e2' pl='20px'>
                Chính Sách Bảo Hành
              </Text>
            </Link>
          </GridItem>
        </Grid>
        <OwlCarousel options={options}>
          <div>
            <img
              className='banner-img'
              src='banner1.jpg'
              alt='The Last of us'
            />
          </div>
          <div>
            <img className='banner-img' src='banner2.png' alt='GTA V' />
          </div>
          <div>
            <img className='banner-img' src='banner3.png' alt='GTA V' />
          </div>
          <div>
            <img className='banner-img' src='banner4.jpg' alt='GTA V' />
          </div>
        </OwlCarousel>
      </Box>
    </>
  );
}

export default Categories;
