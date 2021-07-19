interface LoginRequest {
  username: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  expiresIn: number;
  role: number;
}

interface ILoginErrorReponse {
  status: number;
}
