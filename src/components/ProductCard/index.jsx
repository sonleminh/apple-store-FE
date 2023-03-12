import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

function ProductCard(props) {
  const price = props.item?.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const discountPrice = props.item?.discountPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (
    <Box
      h={'400px'}
      key={props.item.id}
      position='relative'
      p={'10px 12px'}
      bg='white'>
      <Image
        boxSize='200px'
        src={props.item.image.slice(0, 1)}
        alt='Dan Abramov'
        mt={'10px'}
        p={'25px'}
        className='product__item-img'
      />

      <Box
        position={'absolute'}
        top='10px'
        right={'10px'}
        display='flex'
        alignItems={'center'}
        justifyContent='center'
        w='38px'
        h='38px'
        m={'auto 0'}
        fontSize={'12px'}
        fontWeight='600'
        border='1px solid var(--primary)'
        borderRadius={'50%'}>
        -
        {Math.ceil(
          ((parseInt(props.item?.price) - parseInt(props.item?.discountPrice)) /
            parseInt(props.item?.price)) *
            100
        )}
        %
      </Box>
      <Text
        mb={'10px'}
        as={'h3'}
        h={'40px'}
        lineHeight='20px'
        fontSize='16px'
        fontWeight={'600'}
        overflow='hidden'>
        {props.item?.name}
      </Text>
      <Box w='100%' h={'50px'} wordBreak='break-word' overflow={'hidden'}>
        {props?.item?.storage?.map((item, index) => (
          <Text
            key={index}
            display='inline-flex'
            width='80px'
            height={'22px'}
            m={'2px 10px 2px 0'}
            p={'2px 5px'}
            justifyContent='center'
            fontSize={'12px'}
            color='#3a3a3a'
            border={'1px solid #d1d5db'}
            borderRadius='5px'>
            {item}
          </Text>
        ))}
      </Box>
      <Flex mt={'10px'}>
        <Text
          mr={'15px'}
          px
          fontSize={'14px'}
          fontWeight='700'
          color='#707070'
          textDecoration={'line-through'}>
          {price} đ
        </Text>
        <Text fontSize={'15px'} fontWeight='700' color='var(--primary)'>
          {discountPrice} đ
        </Text>
      </Flex>
      <Flex alignItems={'center'}>
        <Icon as={FaStar} color='var(--primary)' />
        <Icon as={FaStar} color='var(--primary)' />
        <Icon as={FaStar} color='var(--primary)' />
        <Icon as={FaStar} color='var(--primary)' />
        <Icon as={FaStar} color='var(--primary)' />
        <Text ml={'5px'} fontSize={'13px'}>
          (22)
        </Text>
      </Flex>
    </Box>
  );
}

export default ProductCard;
