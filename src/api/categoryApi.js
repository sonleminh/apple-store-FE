import axiosClient from './axiosClient';
const categoryApi = {
  getAll: () => {
    const url = '/api/category';
    return axiosClient.get(url);
  },
  // patch: ({ id, iconUrl, content, course }) => {
  //     const url = `/categories/update/${id}`;
  //     return axiosClient.patch(url, { id, iconUrl, content, course });
  // },
  // delete: ({ id }) => {
  //     const url = `/categories/delete/${id}`;
  //     return axiosClient.delete(url, { id });
  // },
  // post: ({ iconUrl, content, course }) => {
  //     const url = `/categories/create/`;
  //     return axiosClient.post(url, { iconUrl, content, course });
  // },
};
export default categoryApi;
