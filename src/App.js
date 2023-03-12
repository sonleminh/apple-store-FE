import Routers from './routers';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <div className='App'>
      <ChakraProvider>
        <Routers />
      </ChakraProvider>
    </div>
  );
}

export default App;
