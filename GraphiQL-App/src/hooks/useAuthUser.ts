import { useAppSelector } from '../store/hooksRedux';

export function useAuthUser() {
  const { email, id, token } = useAppSelector((state) => state.userAuth);

  return { isLogged: !!email, token, email, id };
}
