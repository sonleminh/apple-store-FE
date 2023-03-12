import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
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
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import OwlCarousel from 'react-owl-carousel2';
import ProductCard from '../../components/ProductCard';

function ProductByModel() {
  let { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axiosClient.get(`/api/model/${id}`);
        setData(res);
      } catch (error) {
        return console.log(error);
      }
    };
    getProduct();
  }, [id]);

  const options = {
    items: 1,
    rewind: true,
    autoplay: true,
    loop: true,
  };
  return (
    <Box bg='#f0f0f0' pb={'15px'}>
      <Container maxW='1200px' margin='0 auto' padding='15px 10px'>
        <Breadcrumb separator={<ChevronRightIcon color='gray.500' />}>
          <BreadcrumbItem>
            <Link to={'/'}>
              <BreadcrumbLink>Home</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <Link to={`/${data?.category?.slug}`}>
              <BreadcrumbLink>{data?.category?.name}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{data?.name} Series</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box mt={'10px'}>
          <OwlCarousel options={options}>
            <Box h={'200px'}>
              <Image
                className='banner-img'
                src='https://firebasestorage.googleapis.com/v0/b/apple-store-39b14.appspot.com/o/web-14-nho.jpg?alt=media&token=8cc750c4-c85a-4b1a-b797-63b9c6ffc15c'
                alt='GTA V'
                objectFit={'cover'}
              />
            </Box>
            <Box h={'200px'}>
              <Image
                className='banner-img'
                src='https://firebasestorage.googleapis.com/v0/b/apple-store-39b14.appspot.com/o/banner-tet.jpg?alt=media&token=bec6ad3c-b3a3-4217-94ba-12f767dd54c3'
                alt='GTA V'
                objectFit={'cover'}
              />
            </Box>
          </OwlCarousel>
        </Box>

        <Flex
          mx={'10px'}
          p={'15px 0 0px 0'}
          // textAlign='center'
          justifyContent={'space-around'}>
          {data?.category?.model?.map((item, index) => (
            <Link to={`/model/${item?.id}`} key={index}>
              <Button
                h={'30px'}
                // m={'5px 5px'}
                p='2px 10px'
                bg={'#f3f3f3'}
                border={'1px solid #d1d5db'}
                fontSize='14px'
                _hover={{ bg: 'var(--primary)', color: 'white' }}>
                {item?.name} Series
              </Button>
            </Link>
          ))}
        </Flex>
        <Box m='15px 0 10px 0' bg={'white'}>
          <Flex mx='20px' alignItems={'center'} justifyContent='space-between'>
            <Text m='0 0 0 10px' fontSize={'16px'} fontWeight='600'>
              Bộ lọc:
            </Text>
            <Box mr={'140px'}>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bg='white'
                  _hover={{ bg: 'white' }}
                  _expanded={{ bg: 'white' }}>
                  Giá
                </MenuButton>
                <MenuList>
                  <MenuItem>Trên 6 inch</MenuItem>
                  <MenuItem>Dưới 6 inch</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bg='white'
                  _hover={{ bg: 'white' }}
                  _expanded={{ bg: 'white' }}>
                  Hãng
                </MenuButton>
                <MenuList>
                  <MenuItem>Apple</MenuItem>
                  <MenuItem>Samsung</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bg='white'
                  _hover={{ bg: 'white' }}
                  _expanded={{ bg: 'white' }}>
                  Màn hình
                </MenuButton>
                <MenuList>
                  <MenuItem>Trên 6 inch</MenuItem>
                  <MenuItem>Dưới 6 inch</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bg='white'
                  _hover={{ bg: 'white' }}
                  _expanded={{ bg: 'white' }}>
                  Dung lượng
                </MenuButton>
                <MenuList>
                  <MenuItem>Trên 6 inch</MenuItem>
                  <MenuItem>Dưới 6 inch</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bg='white'
                  _hover={{ bg: 'white' }}
                  _expanded={{ bg: 'white' }}>
                  Pin
                </MenuButton>
                <MenuList>
                  <MenuItem>Trên 6 inch</MenuItem>
                  <MenuItem>Dưới 6 inch</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bg='white'
                  _hover={{ bg: 'white' }}
                  _expanded={{ bg: 'white' }}>
                  RAM
                </MenuButton>
                <MenuList>
                  <MenuItem>Trên 6 inch</MenuItem>
                  <MenuItem>Dưới 6 inch</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bg='white'
                  _hover={{ bg: 'white' }}
                  _expanded={{ bg: 'white' }}>
                  Tính năng
                </MenuButton>
                <MenuList>
                  <MenuItem>Trên 6 inch</MenuItem>
                  <MenuItem>Dưới 6 inch</MenuItem>
                </MenuList>
              </Menu>
            </Box>
            <Box mr={'10px'}>
              <Menu>
                <MenuButton
                  h={'35px'}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bg='white'
                  _hover={{ bg: 'white' }}
                  _expanded={{ bg: 'white' }}>
                  Lọc
                </MenuButton>
                <MenuList>
                  <MenuItem>Trên 6 inch</MenuItem>
                  <MenuItem>Dưới 6 inch</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Box>
        <Text m={'15px 0 10px 0'} fontSize={'18px'} fontWeight='600'>
          {data?.name} Series
        </Text>
        <Grid templateColumns='repeat(5, 1fr)' gap={3} w='100%'>
          {data?.products?.map((item, index) => (
            <GridItem key={index}>
              <Link to={`/product/${item.id}`}>
                <ProductCard item={item}></ProductCard>
              </Link>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductByModel;
