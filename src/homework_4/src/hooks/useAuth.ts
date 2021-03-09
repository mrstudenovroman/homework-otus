import { setUserToken } from '../utils/APIConfig';

interface UserInterface {
  name: string;
  lastName: string;
  token: string;
}

export function useAuth(): boolean {
  const user: UserInterface | null = JSON.parse(`${localStorage.getItem('user')}`);
  if (user === null) return false;
  setUserToken(user.token);
  return true;
}
