import axiosClient from 'helpers/axiosClient';

export const AuthAPI = {
  LOGIN: async (payload: LoginRequest): Promise<ILoginResponse> => {
    const res: ILoginResponse = await axiosClient.post('/auth/sign-in', payload);
    return res;
  },
  LOGOUT: async (): Promise<any> => {
    return await axiosClient.post('/api/user/logout');
  },
  GET_PROFILE: async (): Promise<any> => {
    return await axiosClient.get(`/api/user/getProfile`);
  },
};
