import axiosClient from 'helpers/axiosClient';

export const UserAPI = {
  GET_LIST_USER: async (params: IListUserRequest): Promise<IListUserResponse> => {
    const res: IListUserResponse = await axiosClient.get('/user', {
      params,
    });
    return res;
  },
  DELETE_USER_BY_ID: async (id: number): Promise<IDeleteUserResonse> => {
    const res: IDeleteUserResonse = await axiosClient.delete(`/user/${id}`);
    return res;
  },
  ADD_USER: async (params: IAddUserRequest): Promise<IAddUserResponse> => {
    const res: IAddUserResponse = await axiosClient.post('/user', { ...params });
    return res;
  },
  UPDATE_USER: async ({ id, ...payload }: IUpdateUserRequest): Promise<IUpdateUserResponse> => {
    const res: IUpdateUserResponse = await axiosClient.patch(`/user/${id}`, payload);
    return res;
  },
};
