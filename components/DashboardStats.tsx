import { SimpleGrid, Paper, Text, Group, RingProgress, Center, Stack, Box } from '@mantine/core';
import { TrendingUp, AlertCircle } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
    inProgress: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={{ base: 'md', md: 'lg' }}>
      {/* Total Tasks Card */}
      <Paper p={{ base: 'md', md: 'xl' }} radius="lg" className="glass-card" style={{ borderLeft: '4px solid var(--mantine-color-indigo-5)' }}>
        <Group justify="space-between" mb="xs">
          <Text c="dimmed" size="xs" fw={700} tt="uppercase">Total Tasks</Text>
          <TrendingUp size={16} style={{ color: 'var(--mantine-color-indigo-5)' }} />
        </Group>
        <Text fw={700} style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1 }}>
          {stats.total}
        </Text>
        <Text c="dimmed" size="sm" mt="sm">All active projects</Text>
      </Paper>

      {/* Completion Rate Card */}
      <Paper p={{ base: 'sm', md: 'md' }} radius="lg" className="glass-card" style={{ borderLeft: '4px solid var(--mantine-color-teal-5)' }}>
        <Stack align="center" gap={0}>
          <Text c="dimmed" size="xs" fw={700} tt="uppercase" mb="xs">Completion Rate</Text>
          <RingProgress
            size={110}
            thickness={10}
            roundCaps
            sections={[{ value: completionRate, color: 'teal' }]}
            label={
              <Center>
                <Stack gap={0} align="center">
                  <Text fw={700} size="xl" style={{ lineHeight: 1 }}>
                    {Math.round(completionRate)}%
                  </Text>
                  <Text size="xs" c="teal" fw={600}>On track</Text>
                </Stack>
              </Center>
            }
          />
        </Stack>
      </Paper>

      {/* Pending Tasks Card */}
      <Paper p={{ base: 'md', md: 'xl' }} radius="lg" className="glass-card" style={{ borderLeft: '4px solid var(--mantine-color-red-5)' }}>
        <Group justify="space-between" mb="xs">
          <Text c="dimmed" size="xs" fw={700} tt="uppercase">Pending Tasks</Text>
          <AlertCircle size={16} style={{ color: 'var(--mantine-color-red-5)' }} />
        </Group>
        <Text fw={700} style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1 }}>
          {stats.pending}
        </Text>
        <Group gap={6} mt="sm">
          <Box w={8} h={8} style={{ borderRadius: '50%', background: 'var(--mantine-color-red-5)' }} />
          <Text c="dimmed" size="sm">Requires attention</Text>
        </Group>
      </Paper>
    </SimpleGrid>
  );
}
