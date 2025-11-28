'use client';

import { Component, ReactNode } from 'react';
import { Container, Title, Text, Button, Paper, Stack, ThemeIcon, Box, Group } from '@mantine/core';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch and handle React errors gracefully
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console or error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container size="md" py={60}>
          <Paper p="xl" radius="lg" className="glass-card" style={{ textAlign: 'center' }}>
            <Stack align="center" gap="lg">
              <ThemeIcon 
                size={80} 
                radius="xl" 
                variant="light" 
                color="red"
              >
                <AlertTriangle size={40} />
              </ThemeIcon>
              
              <Box>
                <Title order={1} size="h2" mb="md">
                  Oops! Something went wrong
                </Title>
                <Text c="dimmed" size="lg" mb="xl">
                  We encountered an unexpected error. Don&apos;t worry, your data is safe.
                </Text>
                
                {this.state.error && (
                  <Paper p="md" radius="md" bg="red.0" style={{ textAlign: 'left' }} mb="xl">
                    <Text size="sm" fw={600} c="red" mb="xs">Error Details:</Text>
                    <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>
                      {this.state.error.message}
                    </Text>
                  </Paper>
                )}
              </Box>

              <Group gap="md">
                <Button
                  leftSection={<RefreshCw size={18} />}
                  onClick={this.handleReset}
                  variant="filled"
                  color="indigo"
                  size="md"
                >
                  Try Again
                </Button>
                <Button
                  component={Link}
                  href="/dashboard"
                  leftSection={<Home size={18} />}
                  variant="light"
                  color="gray"
                  size="md"
                >
                  Go Home
                </Button>
              </Group>
            </Stack>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

