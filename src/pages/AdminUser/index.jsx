import {
  Box,
  Checkbox,
  Icon,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUser } from '../../Redux/apiRequest';

function AdminUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user.list);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllUser(user.accessToken, dispatch);
  }, [loading, user.accessToken, dispatch]);
  const handleDelete = async (id) => {
    // deleteUser(user?.accessToken, dispatch, id);
    await deleteUser(id);

    setLoading(!loading);
    // console.log('state Load handle:', isLoad);
  };
  // console.log('state Load:', isLoad);

  // console.log('Admin User:', user);
  return (
    <Box bg='#f2edf3' w='100%' h='100vh'>
      <Box pl={'180px'} pt='80px'>
        <Text ml={'15px'} mt='10px' fontSize={20}>
          User
        </Text>
        <TableContainer m={15} bg={'white'} borderRadius='5px'>
          <Table variant='simple'>
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Admin</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.map((item, id) => (
                <Tr key={id}>
                  <Td>{item.firstName}</Td>
                  <Td>{item.email}</Td>
                  <Td>
                    <Checkbox defaultChecked={item?.isAdmin} />
                  </Td>
                  <Td>
                    <Icon as={FaTrash} onClick={() => handleDelete(item.id)} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default AdminUser;
