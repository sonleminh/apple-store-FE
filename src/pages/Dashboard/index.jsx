import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Box, Image, ListItem, Text, UnorderedList } from '@chakra-ui/react';

import './Dashboard.styles.scss';

function Dashboard() {
  return (
    <Box position='relative'>
      <Box bg='black' w='180px' h='100vh' position='fixed' zIndex='3'>
        <Link to='/'>
          <Image
            width='40px'
            p='20px 0 10px 0 '
            m='0 auto'
            src='https://firebasestorage.googleapis.com/v0/b/apple-store-39b14.appspot.com/o/apple-logo.png?alt=media&token=cb5c764a-d239-4e65-a6c6-1431f594d58f'
            alt='Apple logo'
          />
        </Link>
        <Text
          paddingBottom={'15px'}
          fontSize={20}
          fontWeight='bold'
          textAlign={'center'}
          color={'var(--primary)'}
          borderBottom='1px solid #333'>
          Apple Store
        </Text>
        <UnorderedList
          pt={'30px'}
          m={0}
          fontSize={16}
          color={'white'}
          listStyleType={'none'}>
          <Link to='/dashboard/product'>
            <ListItem className='menu__item'>Sản phẩm</ListItem>
          </Link>
          <Link to='/dashboard/category'>
            <ListItem className='menu__item'>Danh mục</ListItem>
          </Link>
          <Link to='/dashboard/user'>
            <ListItem className='menu__item'>Tài khoản</ListItem>
          </Link>
          <Link to='/dashboard/couting'>
            <ListItem className='menu__item'>Thống kê</ListItem>
          </Link>
        </UnorderedList>
      </Box>
      <Box
        bg='white'
        display={'flex'}
        alignItems='center'
        pl='180px'
        w='100%'
        h='80px'
        position='fixed'
        top={0}
        boxShadow={'0 1px 5px rgb(189 189 189)'}
        zIndex='2'>
        <Text fontSize={25} ml={'20px'}>
          Welcome, admin
          <Image
            display={'inline-block'}
            ml={'10px'}
            boxSize='30px'
            objectFit={'cover'}
            src='https://www.macmillandictionary.com/external/slideshow/full/emoji_party_popper_full.jpg'
          />
        </Text>
      </Box>
      <Outlet />
    </Box>
  );
}

export default Dashboard;
