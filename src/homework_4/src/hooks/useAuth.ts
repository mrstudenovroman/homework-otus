import { setUserToken } from '../utils/APIConfig';


export function useAuth(): boolean {
  const token: string | null = JSON.parse(`${localStorage.getItem('token')}`);
  console.log(token)
  if (token === null) return false;
  setUserToken(token);
  return true;
}
