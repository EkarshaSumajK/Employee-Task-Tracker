'use client';

import { Container, Title, SimpleGrid, Paper, Text, Group, RingProgress, Stack, Progress, Box, Grid } from '@mantine/core';
import { useTaskTracker } from '@/hooks/useTaskTracker';
import { 
  BarChart, 
  PieChart, 
  Activity, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  Target,
  Briefcase,
  Calendar,
  Award,
  Zap
} from 'lucide-react';

export default function AnalyticsPage() {
  const { stats, employees } = useTaskTracker();

  // Comprehensive dummy data for analytics
  const monthlyRevenue = [
    { month: 'Jan', revenue: 45000, cost: 28000 },
    { month: 'Feb', revenue: 52000, cost: 30000 },
    { month: 'Mar', revenue: 48000, cost: 29000 },
    { month: 'Apr', revenue: 61000, cost: 32000 },
    { month: 'May', revenue: 55000, cost: 31000 },
    { month: 'Jun', revenue: 67000, cost: 33000 },
  ];

  const departmentPerformance = [
    { name: 'Engineering', value: 92, tasks: 45, color: 'indigo' },
    { name: 'Design', value: 88, tasks: 32, color: 'pink' },
    { name: 'Marketing', value: 85, tasks: 28, color: 'cyan' },
    { name: 'Product', value: 90, tasks: 38, color: 'teal' },
    { name: 'Sales', value: 78, tasks: 25, color: 'orange' },
    { name: 'Support', value: 95, tasks: 41, color: 'grape' },
  ];

  const taskDistribution = [
    { name: 'Completed', value: stats.completed, color: 'teal' },
    { name: 'In Progress', value: stats.inProgress, color: 'blue' },
    { name: 'Pending', value: stats.pending, color: 'orange' },
  ];

  const resourceUtilization = [
    { resource: 'Developers', capacity: 100, used: 87 },
    { resource: 'Designers', capacity: 100, used: 92 },
    { resource: 'DevOps', capacity: 100, used: 76 },
    { resource: 'QA Team', capacity: 100, used: 84 },
  ];

  const projectTimeline = [
    { project: 'Mobile App', progress: 75, status: 'On Track', color: 'teal' },
    { project: 'Website Redesign', progress: 92, status: 'Near Complete', color: 'blue' },
    { project: 'API Integration', progress: 45, status: 'At Risk', color: 'orange' },
    { project: 'Dashboard V2', progress: 30, status: 'Early Stage', color: 'indigo' },
  ];

  const weeklyVelocity = [65, 72, 68, 78, 82, 85, 90];
  const currentRevenue = monthlyRevenue[monthlyRevenue.length - 1].revenue;
  const currentCost = monthlyRevenue[monthlyRevenue.length - 1].cost;
  const profitMargin = ((currentRevenue - currentCost) / currentRevenue * 100).toFixed(1);

  return (
    <Box py={{ base: 16, sm: 24, md: 40 }} px={{ base: 12, sm: 16, md: 'xl' }} className="animate-fade-in">
      <Group justify="space-between" mb="xl" style={{ flexWrap: 'wrap' }}>
        <Box>
          <Title order={1} style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>Analytics Overview</Title>
          <Text c="dimmed" size="sm" mt={4}>
            Comprehensive insights into team performance and business metrics
          </Text>
        </Box>
      </Group>

      {/* Key Performance Indicators */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={{ base: 'md', md: 'lg' }} mb="xl">
        <Paper p={{ base: 'md', md: 'lg' }} radius="lg" className="glass-card">
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">Task Completion Rate</Text>
            <Activity size={18} className="text-teal-500" />
          </Group>
          <Group align="flex-end" gap="xs">
            <Text fw={700} size="2rem" style={{ lineHeight: 1 }}>
              {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
            </Text>
            <Text c="teal" size="sm" fw={600} mb={2}>
              +12.3%
            </Text>
          </Group>
          <Text size="xs" c="dimmed" mt="xs">vs. previous period</Text>
        </Paper>

        <Paper p={{ base: 'md', md: 'lg' }} radius="lg" className="glass-card">
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">Team Efficiency</Text>
            <Zap size={18} className="text-indigo-500" />
          </Group>
          <Group align="flex-end" gap="xs">
            <Text fw={700} size="2rem" style={{ lineHeight: 1 }}>94</Text>
            <Text c="indigo" size="sm" fw={600} mb={2}>
              +8 pts
            </Text>
          </Group>
          <Text size="xs" c="dimmed" mt="xs">top 5% of teams</Text>
        </Paper>
        
        <Paper p={{ base: 'md', md: 'lg' }} radius="lg" className="glass-card">
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">Avg Tasks / Employee</Text>
            <Users size={18} className="text-blue-500" />
          </Group>
          <Group align="flex-end" gap="xs">
            <Text fw={700} size="2rem" style={{ lineHeight: 1 }}>
              {employees.length > 0 ? (stats.total / employees.length).toFixed(1) : 0}
            </Text>
            <Text c="blue" size="sm" fw={600} mb={2}>
              +0.8
            </Text>
          </Group>
          <Text size="xs" c="dimmed" mt="xs">balanced workload</Text>
        </Paper>

        <Paper p={{ base: 'md', md: 'lg' }} radius="lg" className="glass-card">
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">Monthly Revenue</Text>
            <DollarSign size={18} className="text-green-500" />
          </Group>
          <Group align="flex-end" gap="xs">
            <Text fw={700} size="2rem" style={{ lineHeight: 1 }}>
              ${(currentRevenue / 1000).toFixed(0)}K
            </Text>
            <Text c="teal" size="sm" fw={600} mb={2}>
              +22%
            </Text>
          </Group>
          <Text size="xs" c="dimmed" mt="xs">{profitMargin}% profit margin</Text>
        </Paper>
      </SimpleGrid>

      <Grid gutter={{ base: 'md', md: 'lg' }} mb="lg">
        {/* Task Distribution */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper p={{ base: 'md', md: 'xl' }} radius="lg" className="glass-card" style={{ height: '100%' }}>
            <Group justify="space-between" mb="lg">
              <Title order={3} size="h4">Task Distribution</Title>
              <PieChart size={20} className="text-gray-400" />
            </Group>
            <Stack align="center" gap="xl">
              <RingProgress
                size={200}
                thickness={20}
                roundCaps
                sections={taskDistribution.map(d => ({ 
                  value: stats.total > 0 ? (d.value / stats.total) * 100 : 0, 
                  color: d.color 
                }))}
                label={
                  <Stack gap={0} align="center">
                    <Text fw={700} size="xl">{stats.total}</Text>
                    <Text size="xs" c="dimmed">Total Tasks</Text>
                  </Stack>
                }
              />
              <Stack gap="sm" w="100%">
                {taskDistribution.map(d => (
                  <Group key={d.name} justify="space-between">
                    <Group gap="xs">
                      <Box w={12} h={12} style={{ borderRadius: 4, background: `var(--mantine-color-${d.color}-6)` }} />
                      <Text size="sm">{d.name}</Text>
                    </Group>
                    <Text size="sm" fw={700}>{d.value}</Text>
                  </Group>
                ))}
              </Stack>
            </Stack>
          </Paper>
        </Grid.Col>

        {/* Revenue vs Cost Trend */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper p={{ base: 'md', md: 'xl' }} radius="lg" className="glass-card" style={{ height: '100%' }}>
            <Group justify="space-between" mb="lg">
              <Title order={3} size="h4">Revenue & Cost Analysis</Title>
              <TrendingUp size={20} className="text-gray-400" />
            </Group>
            <Box h={{ base: 180, sm: 220 }} style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
              {monthlyRevenue.map((data, i) => (
                <Stack key={i} style={{ flex: 1 }} gap={4} align="center">
                  <Box style={{ display: 'flex', gap: '4px', height: 180, alignItems: 'flex-end', width: '100%', justifyContent: 'center' }}>
                    <Box 
                      style={{ 
                        width: '12px', 
                        height: `${(data.revenue / 700)}%`, 
                        background: 'var(--mantine-color-teal-5)', 
                        borderRadius: '4px 4px 0 0',
                        minHeight: 20,
                      }} 
                    />
                    <Box 
                      style={{ 
                        width: '12px', 
                        height: `${(data.cost / 700)}%`, 
                        background: 'var(--mantine-color-red-4)', 
                        borderRadius: '4px 4px 0 0',
                        minHeight: 20,
                      }} 
                    />
                  </Box>
                  <Text size="10px" c="dimmed" fw={500}>{data.month}</Text>
                </Stack>
              ))}
            </Box>
            <Group justify="center" gap="xl" mt="lg">
              <Group gap="xs">
                <Box w={12} h={12} style={{ background: 'var(--mantine-color-teal-5)', borderRadius: 2 }} />
                <Text size="xs" c="dimmed">Revenue</Text>
              </Group>
              <Group gap="xs">
                <Box w={12} h={12} style={{ background: 'var(--mantine-color-red-4)', borderRadius: 2 }} />
                <Text size="xs" c="dimmed">Cost</Text>
              </Group>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Department Performance */}
      <Paper p="xl" radius="lg" className="glass-card" mb="lg">
        <Group justify="space-between" mb="lg">
          <Box>
            <Title order={3} size="h4">Department Performance</Title>
            <Text size="sm" c="dimmed">Performance scores and task completion by department</Text>
          </Box>
          <BarChart size={20} className="text-gray-400" />
        </Group>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          {departmentPerformance.map(dept => (
            <Box key={dept.name}>
              <Group justify="space-between" mb={8}>
                <Group gap="xs">
                  <Box w={10} h={10} style={{ borderRadius: '50%', background: `var(--mantine-color-${dept.color}-6)` }} />
                  <Text size="sm" fw={600}>{dept.name}</Text>
                </Group>
                <Text size="sm" fw={700} c={dept.color}>{dept.value}%</Text>
              </Group>
              <Progress 
                value={dept.value} 
                color={dept.color} 
                size="md" 
                radius="xl"
                mb={4}
              />
              <Text size="xs" c="dimmed">{dept.tasks} tasks completed</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Paper>

      <Grid gutter="lg" mb="lg">
        {/* Project Timeline */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper p="xl" radius="lg" className="glass-card" style={{ height: '100%' }}>
            <Group justify="space-between" mb="lg">
              <Title order={3} size="h4">Active Projects</Title>
              <Briefcase size={20} className="text-gray-400" />
            </Group>
            <Stack gap="lg">
              {projectTimeline.map(project => (
                <Box key={project.project}>
                  <Group justify="space-between" mb={6}>
                    <Text size="sm" fw={600}>{project.project}</Text>
                    <Group gap="xs">
                      <Text size="xs" c="dimmed">{project.status}</Text>
                      <Text size="sm" fw={700}>{project.progress}%</Text>
                    </Group>
                  </Group>
                  <Progress 
                    value={project.progress} 
                    color={project.color} 
                    size="lg" 
                    radius="xl"
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>

        {/* Resource Utilization */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper p="xl" radius="lg" className="glass-card" style={{ height: '100%' }}>
            <Group justify="space-between" mb="lg">
              <Title order={3} size="h4">Resource Utilization</Title>
              <Target size={20} className="text-gray-400" />
            </Group>
            <Stack gap="lg">
              {resourceUtilization.map(resource => (
                <Box key={resource.resource}>
                  <Group justify="space-between" mb={6}>
                    <Text size="sm" fw={600}>{resource.resource}</Text>
                    <Text size="sm" fw={700} 
                      c={resource.used > 90 ? 'red' : resource.used > 75 ? 'orange' : 'teal'}
                    >
                      {resource.used}%
                    </Text>
                  </Group>
                  <Progress 
                    value={resource.used} 
                    color={resource.used > 90 ? 'red' : resource.used > 75 ? 'orange' : 'teal'}
                    size="lg" 
                    radius="xl"
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Weekly Velocity */}
      <Paper p="xl" radius="lg" className="glass-card">
        <Group justify="space-between" mb="lg">
          <Box>
            <Title order={3} size="h4">Team Velocity Trend</Title>
            <Text size="sm" c="dimmed">Task completion rate over the past 7 days</Text>
          </Box>
          <Clock size={20} className="text-gray-400" />
        </Group>
        <Box h={{ base: 160, sm: 200 }} style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', paddingBottom: '20px' }}>
          {weeklyVelocity.map((value, i) => (
            <Box key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <Box 
                style={{ 
                  width: '100%', 
                  height: `${value}%`, 
                  background: i === weeklyVelocity.length - 1 
                    ? 'var(--mantine-color-indigo-6)' 
                    : 'var(--mantine-color-indigo-4)', 
                  borderRadius: '8px 8px 0 0',
                  opacity: i === weeklyVelocity.length - 1 ? 1 : 0.7,
                  transition: 'all 0.3s',
                  position: 'relative',
                  minHeight: 30,
                }} 
                className="hover:opacity-100"
              >
                <Text 
                  size="xs" 
                  fw={700} 
                  c="white" 
                  style={{ 
                    position: 'absolute', 
                    top: -20, 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {value}%
                </Text>
              </Box>
              <Text size="xs" c="dimmed" fw={500}>
                {i === 0 ? 'Mon' : i === 1 ? 'Tue' : i === 2 ? 'Wed' : i === 3 ? 'Thu' : i === 4 ? 'Fri' : i === 5 ? 'Sat' : 'Sun'}
              </Text>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
