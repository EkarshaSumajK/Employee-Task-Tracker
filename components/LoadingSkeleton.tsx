import { Skeleton, Stack, SimpleGrid, Card, Group, Box } from '@mantine/core';

interface LoadingSkeletonProps {
  type?: 'dashboard' | 'employee-list' | 'employee-card' | 'task-list' | 'stats';
  count?: number;
}

/**
 * Loading skeleton component for better loading states
 */
export function LoadingSkeleton({ type = 'dashboard', count = 3 }: LoadingSkeletonProps) {
  if (type === 'dashboard') {
    return (
      <Stack gap="xl">
        {/* Header skeleton */}
        <Group justify="space-between">
          <Stack gap="xs" style={{ flex: 1 }}>
            <Skeleton height={40} width="60%" radius="md" />
            <Skeleton height={20} width="40%" radius="md" />
          </Stack>
          <Skeleton height={40} width={120} radius="md" />
        </Group>

        {/* Stats skeleton */}
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="xl" radius="lg" className="glass-card">
              <Stack gap="md">
                <Skeleton height={16} width="40%" radius="md" />
                <Skeleton height={48} width="60%" radius="md" />
                <Skeleton height={12} width="80%" radius="md" />
              </Stack>
            </Card>
          ))}
        </SimpleGrid>

        {/* Content skeleton */}
        <Card padding="xl" radius="lg" className="glass-card">
          <Stack gap="md">
            <Skeleton height={32} width="30%" radius="md" />
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} height={200} radius="md" />
              ))}
            </SimpleGrid>
          </Stack>
        </Card>
      </Stack>
    );
  }

  if (type === 'employee-list') {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 'md', md: 'lg' }}>
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i} padding="lg" radius="lg" className="glass-card">
            <Stack gap="md">
              <Group justify="space-between">
                <Group gap="sm">
                  <Skeleton height={48} width={48} radius="xl" />
                  <Stack gap="xs">
                    <Skeleton height={18} width={120} radius="md" />
                    <Skeleton height={14} width={100} radius="md" />
                  </Stack>
                </Group>
                <Skeleton height={24} width={80} radius="sm" />
              </Group>
              <Skeleton height={8} radius="xl" />
              <Group gap="xs">
                <Skeleton height={32} width="48%" radius="md" />
                <Skeleton height={32} width="48%" radius="md" />
              </Group>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    );
  }

  if (type === 'employee-card') {
    return (
      <Card padding="xl" radius="lg" className="glass-card">
        <Stack gap="lg">
          <Group>
            <Skeleton height={100} width={100} radius="xl" />
            <Stack gap="xs" style={{ flex: 1 }}>
              <Skeleton height={32} width="60%" radius="md" />
              <Skeleton height={20} width="40%" radius="md" />
              <Group gap="sm" mt="md">
                <Skeleton height={28} width={120} radius="md" />
                <Skeleton height={28} width={100} radius="md" />
              </Group>
            </Stack>
          </Group>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} height={120} radius="md" />
            ))}
          </SimpleGrid>
        </Stack>
      </Card>
    );
  }

  if (type === 'task-list') {
    return (
      <Stack gap="sm">
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i} padding="md" radius="md" className="glass-card">
            <Group justify="space-between">
              <Stack gap="xs" style={{ flex: 1 }}>
                <Skeleton height={18} width="70%" radius="md" />
                <Skeleton height={24} width={100} radius="sm" />
              </Stack>
              <Skeleton height={32} width={32} radius="md" />
            </Group>
          </Card>
        ))}
      </Stack>
    );
  }

  if (type === 'stats') {
    return (
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={{ base: 'md', md: 'lg' }}>
        {[1, 2, 3].map((i) => (
          <Card key={i} padding="xl" radius="lg" className="glass-card">
            <Stack gap="md">
              <Skeleton height={16} width="40%" radius="md" />
              <Skeleton height={48} width="60%" radius="md" />
              <Skeleton height={12} width="80%" radius="md" />
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    );
  }

  return null;
}

