'use client';

import { useState, useEffect } from 'react';
import { Stack, Text, Group, UnstyledButton, Avatar, Box, ThemeIcon, ActionIcon, useMantineColorScheme, Button, ScrollArea, Tooltip } from '@mantine/core';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  PieChart,
  Hexagon,
  Sun,
  Moon,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface SidebarProps {
  onLinkClick?: () => void;
}

export function Sidebar({ onLinkClick }: SidebarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'Employees', href: '/dashboard/employees' },
    { icon: Calendar, label: 'Projects', href: '/dashboard/projects' },
    { icon: PieChart, label: 'Analytics', href: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  const mainLinks = links.map((link) => {
    const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
    // Default to light theme styles during SSR to avoid hydration mismatch
    const isDark = mounted && colorScheme === 'dark';
    
    return (
      <UnstyledButton
        key={link.label}
        component={Link}
        href={link.href}
        onClick={onLinkClick}
        style={{
          display: 'block',
          width: '100%',
          padding: '12px 16px',
          borderRadius: '12px',
          color: isActive 
            ? (isDark ? 'white' : '#4F46E5') 
            : (isDark ? '#94A3B8' : '#64748B'),
          backgroundColor: isActive 
            ? (isDark ? 'rgba(79, 70, 229, 0.2)' : '#EEF2FF') 
            : 'transparent',
          transition: 'all 0.2s ease',
          fontWeight: isActive ? 600 : 500,
        }}
      >
        <Group>
          <link.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
          <Text size="sm">{link.label}</Text>
        </Group>
      </UnstyledButton>
    );
  });



  return (
    <Box style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--mantine-color-body)' }}>
      {/* Logo Section */}
      <Box p="md" visibleFrom="md" style={{ borderBottom: `1px solid var(--mantine-color-default-border)` }}>
        <Group>
          <ThemeIcon 
            size="xl" 
            radius="md" 
            variant="gradient" 
            gradient={{ from: 'indigo', to: 'violet' }}
            style={{ boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)' }}
          >
            <Hexagon size={24} fill="white" />
          </ThemeIcon>
          <Text fw={800} size="xl" style={{ letterSpacing: '-0.5px' }} className="text-gradient">
            TaskTracker
          </Text>
        </Group>
      </Box>

      {/* Navigation Links */}
      <ScrollArea style={{ flex: 1 }}>
        <Stack gap="xs" p="md">
          <Text size="xs" fw={700} c="dimmed" tt="uppercase" px="sm" mb={4}>
            Menu
          </Text>
          {mainLinks}
        </Stack>
      </ScrollArea>

      {/* User Profile Section */}
      <Box p="md" style={{ borderTop: `1px solid var(--mantine-color-default-border)` }}>
        <Group justify="space-between" mb="sm">
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">Theme</Text>
          <ActionIcon 
            variant="light" 
            color="gray" 
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
            size="sm"
            radius="md"
          >
            {mounted && colorScheme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </ActionIcon>
        </Group>
        
        <Box
          style={{
            padding: '16px',
            borderRadius: '16px',
            backgroundColor: mounted && colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#F8FAFC',
            border: '1px solid var(--mantine-color-default-border)',
          }}
        >
          <Group mb="sm">
            <Avatar 
              src={null} 
              alt={user || 'User'} 
              radius="xl"
              color="indigo"
              variant="filled"
            >
              {user?.charAt(0).toUpperCase()}
            </Avatar>
            <Box style={{ flex: 1 }}>
              <Text size="sm" fw={600} lh={1.2}>
                {user}
              </Text>
              <Text size="xs" c="dimmed" lh={1.2}>
                Admin Workspace
              </Text>
            </Box>
          </Group>
          
          <Button
            fullWidth
            variant="light"
            color="red"
            size="xs"
            leftSection={<LogOut size={14} />}
            onClick={logout}
            radius="md"
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
