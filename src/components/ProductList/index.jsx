import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import './ProductList.styles.scss';
import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';

function ProductList() {
  const [saleProduct, setSaleProduct] = useState({});
  const [iphoneProduct, setIphoneProduct] = useState({});
  const [ipadProduct, setIpadProduct] = useState({});

  useEffect(() => {
    const getSaleProduct = async () => {
      try {
        const response = await axiosClient.get('/api/sale');
        setSaleProduct(response);
      } catch (error) {
        console.log('Failed to get sale product list: ', error);
      }
    };
    getSaleProduct();
  }, []);
  useEffect(() => {
    const getIPhoneProduct = async () => {
      try {
        const response = await axiosClient.get('/api/iphone');
        setIphoneProduct(response);
      } catch (error) {
        console.log('Failed to fetch banner list: ', error);
      }
    };
    getIPhoneProduct();
  }, []);
  useEffect(() => {
    const getIpadProduct = async () => {
      try {
        const response = await axiosClient.get('/api/ipad');
        setIpadProduct(response);
      } catch (error) {
        console.log('Failed to fetch banner list: ', error);
      }
    };
    getIpadProduct();
  }, []);
  const options = {
    items: 5,
    margin: 14,
    rewind: true,
    autoplay: false,
    loop: true,
    dots: false,
  };
  return (
    <Box bg='#f0f0f0'>
      <Container maxW='1200px' margin='0 auto' padding='15px 10px'>
        <Box pt={'15px'} pb={'20px'}>
          <Flex
            width={1180}
            mb={15}
            justifyContent='space-between'
            alignItems='center'
            color='#a22327'>
            <Link to={'sale'}>
              <Heading as='h2' fontSize={20} color='#333'>
                SẢN PHẨM KHUYẾN MÃI HOT NHẤT
              </Heading>
            </Link>
            <Link to='sale'>
              <Text>
                xem tất cả
                <Icon
                  as={FaAngleDoubleRight}
                  // mt={5}
                  ml={'5px'}
                  className='heading-icon'
                />
              </Text>
            </Link>
          </Flex>
          {Object.keys(saleProduct).length > 0 && (
            <OwlCarousel options={options}>
              {saleProduct?.map((item, index) => (
                <Link to={`/product/${item.id}`} key={index}>
                  <ProductCard item={item}></ProductCard>
                </Link>
              ))}
            </OwlCarousel>
          )}
        </Box>
        <Image
          boxSize='100%'
          mt={'10px'}
          src='https://philong.com.vn/media/banner/17_Mar207b6370ed3ec363bf6f99f421b4991f.png'
          alt='banner'
          className='product__item-img'
        />
        <Box pt={'15px'} pb={'20px'}>
          <Flex
            width={1180}
            mb={15}
            justifyContent='space-between'
            alignItems='center'
            color='#a22327'>
            <Link to='iphone'>
              <Heading as='h2' fontSize={20} color='#333'>
                APPLE IPHONE
              </Heading>
            </Link>
            <Link to='iphone'>
              <Text>
                xem tất cả
                <Icon
                  as={FaAngleDoubleRight}
                  mt={5}
                  ml={'5px'}
                  className='heading-icon'
                />
              </Text>
            </Link>
          </Flex>
          {Object.keys(iphoneProduct).length > 0 && (
            <OwlCarousel options={options}>
              {iphoneProduct?.map((item, index) => (
                <Link to={`/product/${item.id}`} key={index}>
                  <ProductCard item={item}></ProductCard>
                </Link>
              ))}
            </OwlCarousel>
          )}
        </Box>
        <Box pt={'15px'} pb={'20px'}>
          <Flex
            width={1180}
            mb={15}
            justifyContent='space-between'
            alignItems='center'
            color='#a22327'>
            <Link to='ipad'>
              <Heading as='h2' fontSize={20} color='#333'>
                APPLE IPAD
              </Heading>
            </Link>
            <Link to='ipad'>
              <Text>
                xem tất cả
                <Icon
                  as={FaAngleDoubleRight}
                  mt={5}
                  ml={'5px'}
                  className='heading-icon'
                />
              </Text>
            </Link>
          </Flex>
          {Object.keys(ipadProduct).length > 0 && (
            <OwlCarousel options={options}>
              {ipadProduct?.map((item, index) => (
                <Link to={`/product/${item.id}`} key={index}>
                  <ProductCard item={item}></ProductCard>
                </Link>
              ))}
            </OwlCarousel>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default ProductList;
