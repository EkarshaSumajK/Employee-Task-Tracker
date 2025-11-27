'use client';

import { AppShell, Burger, Group, Text, ThemeIcon } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Sidebar } from '@/components/Sidebar';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Hexagon } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const isDesktop = useMediaQuery('(min-width: 62em)');

  return (
    <AppShell
      header={{ height: 60, collapsed: !!isDesktop }}
      navbar={{
        width: 260,
        breakpoint: 'md',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <ThemeIcon 
              size="lg" 
              radius="md" 
              variant="gradient" 
              gradient={{ from: 'indigo', to: 'cyan' }}
            >
              <Hexagon size={18} fill="white" />
            </ThemeIcon>
            <Text fw={700} size="lg" style={{ letterSpacing: '-0.5px' }}>
              TaskTracker
            </Text>
          </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p={0}>
        <Sidebar onLinkClick={toggle} />
      </AppShell.Navbar>

      <AppShell.Main>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </AppShell.Main>
    </AppShell>
  );
}
