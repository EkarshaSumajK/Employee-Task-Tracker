import { useLocalStorage } from '@mantine/hooks';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useLocalStorage<string | null>({
    key: 'task-tracker-user',
    defaultValue: null,
  });
  const router = useRouter();

  const login = (username: string) => {
    setUser(username);
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    router.push('/login');
  };

  return { user, login, logout };
}
