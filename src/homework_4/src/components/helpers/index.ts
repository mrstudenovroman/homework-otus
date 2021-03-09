import { API } from '../../utils/APIConfig';

export type ReasonAuthType = 'signup' | 'signin';
export enum STATUS_CODE {
  SUCCESS = 'SUCCESS',
  ERROR_EMAIL = 'ERROR_EMAIL',
  ERROR_EMAIL_OR_PASSWORD = 'ERROR_EMAIL_OR_PASSWORD',
}

interface AuthInterfaces {
  token?: string;
  status: keyof typeof STATUS_CODE;
}

export const AuthUser = async (email: string, password: string, reason: ReasonAuthType): Promise<AuthInterfaces> => {
  const { data } = await API.post<AuthInterfaces>(`/${reason}`, { email, password });
  return data;
};
