'use client';

import { Container, Title, Text, Group, Avatar, Paper, SimpleGrid, Stack, Badge, Box, Button, Progress, Select } from '@mantine/core';
import { useTaskTracker } from '@/hooks/useTaskTracker';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, Clock, TrendingUp, Calendar } from 'lucide-react';
import { TaskStatus } from '@/types';
import { TaskList } from '@/components/TaskList';
import { useState } from 'react';
import { EmptyState } from '@/components/EmptyState';

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { employees, updateTaskStatus, deleteTask } = useTaskTracker();
  const [taskStatusFilter, setTaskStatusFilter] = useState<TaskStatus | 'All'>('All');
  
  const employee = employees.find(e => e.id.toString() === id);

  if (!employee) {
    return (
      <Container size="xl" py={40}>
        <EmptyState
          type="error"
          title="Employee not found"
          description="The employee you're looking for doesn't exist or has been removed."
          action={{
            label: 'Go Back',
            onClick: () => router.back()
          }}
        />
      </Container>
    );
  }

  const initials = employee.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const filteredTasks = taskStatusFilter === 'All' 
    ? employee.tasks 
    : employee.tasks.filter(t => t.status === taskStatusFilter);

  const totalTasks = employee.tasks.length;
  const completedTasks = employee.tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = employee.tasks.filter(t => t.status === 'Pending').length;
  const inProgressTasks = employee.tasks.filter(t => t.status === 'In Progress').length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Container size="xl" py={{ base: 16, sm: 24, md: 40 }} px={{ base: 12, sm: 20 }} className="animate-fade-in">
      <Button 
        variant="subtle" 
        leftSection={<ArrowLeft size={16} />} 
        onClick={() => router.back()}
        mb={{ base: 'md', md: 'xl' }}
        color="gray"
        size="sm"
      >
        Back to Team
      </Button>

      <Paper p={{ base: 'md', md: 'xl' }} radius="lg" className="glass-card" mb={{ base: 'md', md: 'xl' }}>
        <Group gap="md">
          <Avatar 
            size={100}
            radius="xl" 
            color="indigo" 
            variant="light"
            style={{ width: 'clamp(64px, 10vw, 100px)', height: 'clamp(64px, 10vw, 100px)' }}
          >
            {initials}
          </Avatar>
          <Box style={{ flex: 1 }}>
            <Title order={1} size="h1" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', lineHeight: 1.2 }} mb={4}>
              {employee.name}
            </Title>
            <Text size="md" c="dimmed" fw={500} mb="md" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
              {employee.role}
            </Text>
            <Group gap="sm">
              <Badge size="md" color="indigo" variant="light">
                Employee ID: #{employee.id}
              </Badge>
              <Badge size="md" color="teal" variant="light">
                Active
              </Badge>
            </Group>
          </Box>
        </Group>
      </Paper>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 'md', md: 'lg' }} mb={{ base: 'md', md: 'xl' }}>
        <Paper p={{ base: 'md', md: 'xl' }} radius="lg" className="glass-card" style={{ borderLeft: '4px solid var(--mantine-color-teal-5)' }}>
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">Completion Rate</Text>
            <CheckCircle size={16} style={{ color: 'var(--mantine-color-teal-5)' }} />
          </Group>
          <Text fw={700} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }} mb="sm">
            {Math.round(completionRate)}%
          </Text>
          <Progress value={completionRate} color="teal" size="sm" radius="xl" />
        </Paper>

        <Paper p={{ base: 'md', md: 'xl' }} radius="lg" className="glass-card" style={{ borderLeft: '4px solid var(--mantine-color-blue-5)' }}>
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">Active Tasks</Text>
            <Clock size={16} style={{ color: 'var(--mantine-color-blue-5)' }} />
          </Group>
          <Text fw={700} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }} mb="xs">
            {inProgressTasks}
          </Text>
          <Text size="sm" c="dimmed">In Progress</Text>
          <Text size="xs" c="dimmed" mt="xs">{pendingTasks} Pending</Text>
        </Paper>

        <Paper p={{ base: 'md', md: 'xl' }} radius="lg" className="glass-card" style={{ borderLeft: '4px solid var(--mantine-color-pink-5)' }}>
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">Productivity Score</Text>
            <TrendingUp size={16} style={{ color: 'var(--mantine-color-pink-5)' }} />
          </Group>
          <Group align="flex-end" gap="xs" mb="xs">
            <Text fw={700} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }}>92</Text>
            <Text size="sm" c="teal" fw={700}>+4.5%</Text>
          </Group>
          <Text size="sm" c="dimmed">Top Performer</Text>
        </Paper>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing={{ base: 'md', md: 'lg' }}>
        <Paper p={{ base: 'md', md: 'xl' }} radius="lg" className="glass-card" style={{ gridColumn: 'span 2' }}>
          <Group justify="space-between" mb={{ base: 'md', md: 'xl' }} align="center">
            <Title order={3} size="h3" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
              Assigned Tasks
            </Title>
            <Select
              placeholder="Filter by status"
              data={[
                { value: 'All', label: 'All Tasks' },
                { value: 'Pending', label: 'Pending' },
                { value: 'In Progress', label: 'In Progress' },
                { value: 'Completed', label: 'Completed' },
              ]}
              value={taskStatusFilter}
              onChange={(value) => setTaskStatusFilter(value as TaskStatus | 'All')}
              w={{ base: '100%', sm: '200px' }}
              size="sm"
              radius="md"
              comboboxProps={{ 
                middlewares: { flip: true, shift: true, inline: false },
                onOpen: () => {
                  const scrollY = window.scrollY;
                  requestAnimationFrame(() => {
                    window.scrollTo({ top: scrollY, behavior: 'instant' });
                  });
                }
              }}
            />
          </Group>
          <TaskList 
            tasks={filteredTasks} 
            onUpdateStatus={(taskId, status) => updateTaskStatus(employee.id, taskId, status)}
            onDeleteTask={(taskId) => deleteTask(employee.id, taskId)}
          />
        </Paper>

        <Paper p={{ base: 'md', md: 'xl' }} radius="lg" className="glass-card">
          <Title order={3} size="h3" mb={{ base: 'md', md: 'xl' }} style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
            Activity Timeline
          </Title>
          <Stack gap="lg">
             {[1, 2, 3, 4].map((i) => (
               <Group key={i} align="flex-start" wrap="nowrap" gap="sm">
                 <Box mt={2}>
                   <Calendar size={16} style={{ color: 'var(--mantine-color-gray-6)' }} />
                 </Box>
                 <Box style={{ flex: 1 }}>
                   <Text size="sm" fw={500} mb={2}>
                     Task &quot;{employee.tasks[i % employee.tasks.length]?.title || 'Update Documentation'}&quot; updated
                   </Text>
                   <Text size="xs" c="dimmed">2 hours ago</Text>
                 </Box>
               </Group>
             ))}
          </Stack>
        </Paper>
      </SimpleGrid>
    </Container>
  );
}
