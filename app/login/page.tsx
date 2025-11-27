'use client';

import { TextInput, PasswordInput, Button, Paper, Title, Text, Group, ThemeIcon, Anchor, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, Lock, ArrowRight, Hexagon, Mail } from 'lucide-react';
import classes from './AuthenticationImage.module.css';

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const form = useForm<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      username: (value) => (value ? null : 'Username is required'),
      email: (value) => {
        if (!isSignUp) return null;
        return /^\S+@\S+$/.test(value) ? null : 'Invalid email';
      },
      password: (value) => (value ? null : 'Password is required'),
      confirmPassword: (value, values) => {
        if (!isSignUp) return null;
        return value === values.password ? null : 'Passwords do not match';
      },
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    login(values.username);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    form.reset();
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        {/* Logo */}
        <Group gap="sm" className={classes.logo}>
          <ThemeIcon 
            size={56} 
            radius="md" 
            variant="gradient" 
            gradient={{ from: 'blue', to: 'cyan', deg: 135 }}
          >
            <Hexagon size={28} fill="white" />
          </ThemeIcon>
          <div>
            <Title order={1} size={26}>
              TaskTracker
            </Title>
            <Text c="dimmed" size="xs">
              Employee Management System
            </Text>
          </div>
        </Group>

        <div className={classes.formContent}>
          <Title order={2} className={classes.title}>
            {isSignUp ? 'Create an account' : 'Welcome back!'}
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput 
                label="Username" 
                placeholder="Enter your username" 
                required
                leftSection={<User size={18} />}
                size="md"
                radius="md"
                {...form.getInputProps('username')} 
              />
              
              {isSignUp && (
                <TextInput 
                  label="Email" 
                  placeholder="your.email@example.com" 
                  required
                  leftSection={<Mail size={18} />}
                  size="md"
                  radius="md"
                  type="email"
                  {...form.getInputProps('email')} 
                />
              )}
              
              <PasswordInput 
                label="Password" 
                placeholder="Enter your password" 
                required
                leftSection={<Lock size={18} />}
                size="md"
                radius="md"
                {...form.getInputProps('password')} 
              />

              {isSignUp && (
                <PasswordInput 
                  label="Confirm Password" 
                  placeholder="Confirm your password" 
                  required
                  leftSection={<Lock size={18} />}
                  size="md"
                  radius="md"
                  {...form.getInputProps('confirmPassword')} 
                />
              )}

              {!isSignUp && (
                <Group justify="flex-end">
                  <Anchor 
                    component="button" 
                    type="button" 
                    size="sm"
                    c="blue"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Password reset functionality would be implemented here');
                    }}
                  >
                    Forgot password?
                  </Anchor>
                </Group>
              )}
              
              <Button 
                fullWidth 
                mt="md" 
                size="md"
                radius="md"
                type="submit"
                color="blue"
                rightSection={<ArrowRight size={18} />}
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
            </Stack>
          </form>

          <Text ta="center" mt="xl" size="sm">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Anchor 
              component="button" 
              type="button" 
              fw={600} 
              c="blue"
              onClick={toggleMode}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Anchor>
          </Text>

          <Text ta="center" mt="md" size="sm" c="dimmed">
            💡 <strong>Demo Mode:</strong> Use any credentials to login
          </Text>
        </div>
      </Paper>
    </div>
  );
}
