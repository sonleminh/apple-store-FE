import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

function Footer() {
  return (
    <div className='footer'>
      <Container maxW='1200px' margin='0 auto' padding='40px 0'>
        <Grid templateColumns='repeat(12, 1fr)' gap={6}>
          <GridItem colSpan={2}>
            <Heading as='h3' size='md' color='#333' pl={13} mb={15}>
              Thông tin chung
            </Heading>
            <UnorderedList listStyleType='none' fontSize={14}>
              <ListItem>Giới thiệu về Apple Store</ListItem>
              <ListItem>Tin tức</ListItem>
              <ListItem>Tin khuyến mãi</ListItem>
              <ListItem>Liên hệ, góp ý</ListItem>
              <ListItem>Khách hàng doanh nghiệp</ListItem>
            </UnorderedList>
          </GridItem>
          <GridItem colSpan={3}>
            <Heading as='h3' size='md' color='#333' pl={13} mb={15}>
              Hỗ trợ khách hàng
            </Heading>
            <UnorderedList listStyleType='none' fontSize={14}>
              <ListItem>Tìm hiểu về mua trả góp</ListItem>
              <ListItem>Chính sách vận chuyển, giao hàng</ListItem>
              <ListItem>Chính sách, quy định chung</ListItem>
              <ListItem>Chính sách bảo hành</ListItem>
              <ListItem>Bảo mật thông tin khách hàng</ListItem>
            </UnorderedList>
          </GridItem>
          <GridItem colSpan={4}>
            <Heading as='h3' size='md' color='#333' pl={13} mb={15}>
              <b style={{ color: '#ed1d24' }}>Apple Store</b> Đà Nẵng
            </Heading>
            <UnorderedList listStyleType='none' fontSize={14}>
              <ListItem>
                <b>Thời gian làm việc: </b>
                07h30 - 20h30
              </ListItem>
              <ListItem>
                <b>Email: </b>danang@applestore.com.vn
              </ListItem>
              <ListItem>
                <b>Showroom 1: </b>123 Hàm Nghi, Quận Thanh Khê, Đà Nẵng
              </ListItem>
              <ListItem>
                <b>Tel: </b>(0236) 3 888 000 <b>Mobile: </b>(84) 0903 555 310
              </ListItem>

              <ListItem>
                <b>Showroom 2: </b>123 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng
              </ListItem>
              <ListItem>
                <b>Tel: </b>(0236) 3 888 000 <b>Mobile: </b>(84) 0903 555 310
              </ListItem>
            </UnorderedList>
          </GridItem>
          <GridItem colSpan={3}>
            <Heading as='h3' size='md' color='#333' pl={13} mb={15}>
              Customer's Care
            </Heading>
            <UnorderedList listStyleType='none' fontSize={14}>
              <ListItem>
                <b>Trung tâm Bảo Hành và Sửa chữa: </b>Tầng 3 - 123 Hàm Nghi, Đà
                Nẵng (Giờ LV: 7:30 - 11:30 và 13:30 - 17:30 )
              </ListItem>
              <ListItem>Tel: (0236)3 872 000 ( 7:30 - 17:30 )</ListItem>
              <ListItem>
                Gọi sửa chữa: (0236)3 655 000 ( 7:30 - 11:30 và 13:30 - 17:30 )
              </ListItem>
            </UnorderedList>
          </GridItem>
        </Grid>
      </Container>
      <Box background='#f2f2f2'>
        <Container maxW='1200px' margin='0 auto' padding='10px 0'>
          <Text textAlign='center' fontSize={14}>
            © 2022. CÔNG TY TNHH CÔNG NGHỆ TIN HỌC APPLE STORE. Giấy phép kinh
            doanh: 0400127402 - do sở KH & ĐT TP. Đà Nẵng cấp ngày: 17/09/1998.
            Địa chỉ: 123 Hàm Nghi, Phường Thạc Gián, Quận Thanh Khê, Đà Nẵng.
            Điện thoại: 02363 888 000 - 02363 816 000 - Fax: 02363 653 000.
            Email: danang@applestore.com.vn. Chịu trách nhiệm nội dung: Son Le.
            All rights reserved. Xem chính sách sử dụng web
          </Text>
        </Container>
      </Box>
    </div>
  );
}

export default Footer;
