'use client';

import { Box, Title, Paper, TextInput, Button, Group, Switch, Stack, Text, Avatar, Divider, Select } from '@mantine/core';
import { useAuth } from '@/hooks/useAuth';
import { Save, Bell, Moon, Shield, Users, Database } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <Box py={{ base: 16, sm: 24, md: 40 }} px={{ base: 12, sm: 16, md: 'xl' }} className="animate-fade-in">
      <Title order={1} mb="xl" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>Settings</Title>

      <Stack gap="lg">
        {/* Profile Settings */}
        <Paper p={{ base: 'md', md: 'xl' }} radius="lg" className="glass-card">
          <Title order={3} size="h4" mb="lg">Profile Information</Title>
          <Group mb="xl">
            <Avatar size={80} radius={80} color="indigo" variant="light">
              {user?.charAt(0).toUpperCase()}
            </Avatar>
            <Stack gap={4}>
              <Button variant="light" size="xs">Change Avatar</Button>
              <Text size="xs" c="dimmed">JPG, GIF or PNG. Max size of 800K</Text>
            </Stack>
          </Group>

          <Stack gap="md" maw={500}>
            <Group grow>
              <TextInput label="First Name" defaultValue={user?.split(' ')[0]} />
              <TextInput label="Last Name" defaultValue={user?.split(' ')[1] || ''} />
            </Group>
            <TextInput label="Email Address" defaultValue={`${user?.toLowerCase().replace(' ', '.')}@company.com`} />
            <Button leftSection={<Save size={16} />} w="fit-content" mt="md" color="indigo">
              Save Changes
            </Button>
          </Stack>
        </Paper>

        {/* CRM Configuration */}
        <Paper p={{ base: 'md', md: 'xl' }} radius="lg" className="glass-card">
          <Title order={3} size="h4" mb="lg">CRM Configuration</Title>
          <Stack gap="lg">
            <Group justify="space-between">
              <Group>
                <Users size={20} className="text-gray-500" />
                <Box>
                  <Text fw={500}>Auto-Assign Tasks</Text>
                  <Text size="sm" c="dimmed">Automatically assign tasks based on workload</Text>
                </Box>
              </Group>
              <Switch color="indigo" />
            </Group>

            <Divider />

            <Group justify="space-between">
              <Group>
                <Bell size={20} className="text-gray-500" />
                <Box>
                  <Text fw={500}>Client Notifications</Text>
                  <Text size="sm" c="dimmed">Notify clients when task status changes</Text>
                </Box>
              </Group>
              <Switch defaultChecked color="teal" />
            </Group>

            <Divider />

            <Group justify="space-between">
              <Group>
                <Database size={20} className="text-gray-500" />
                <Box>
                  <Text fw={500}>Data Retention</Text>
                  <Text size="sm" c="dimmed">Keep completed tasks for 30 days</Text>
                </Box>
              </Group>
              <Select 
                data={['30 Days', '60 Days', '90 Days', 'Forever']}
                defaultValue="30 Days"
                w={120}
              />
            </Group>
          </Stack>
        </Paper>

        {/* App Preferences */}
        <Paper p={{ base: 'md', md: 'xl' }} radius="lg" className="glass-card">
          <Title order={3} size="h4" mb="lg">Preferences</Title>
          <Stack gap="lg">
            <Group justify="space-between">
              <Group>
                <Bell size={20} className="text-gray-500" />
                <Box>
                  <Text fw={500}>Email Notifications</Text>
                  <Text size="sm" c="dimmed">Receive emails about your account activity</Text>
                </Box>
              </Group>
              <Switch defaultChecked color="teal" />
            </Group>
            
            <Divider />

            <Group justify="space-between">
              <Group>
                <Moon size={20} className="text-gray-500" />
                <Box>
                  <Text fw={500}>Dark Mode</Text>
                  <Text size="sm" c="dimmed">Switch between light and dark themes</Text>
                </Box>
              </Group>
              <Switch color="indigo" />
            </Group>

            <Divider />

            <Group justify="space-between">
              <Group>
                <Shield size={20} className="text-gray-500" />
                <Box>
                  <Text fw={500}>Two-Factor Authentication</Text>
                  <Text size="sm" c="dimmed">Add an extra layer of security</Text>
                </Box>
              </Group>
              <Switch color="indigo" />
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}

