import { Box } from '@chakra-ui/react';

import ProductList from '../../components/ProductList';
import Category from '../Category';

function Homepage() {
  // const [category, setCategory] = useState([]);

  // useEffect(() => {
  //   const fetchCategoryData = async () => {
  //     try {
  //       const response = await categoryApi.getById();

  //       setCategory(response);
  //       console.log('c:', response);
  //     } catch (error) {
  //       console.log('Failed to fetch banner list: ', error);
  //     }
  //   };
  //   fetchCategoryData();
  // }, []);
  return (
    <Box bg='#f0f0f0'>
      <Category />
      <Box>
        <ProductList />
      </Box>
    </Box>
  );
}

export default Homepage;
