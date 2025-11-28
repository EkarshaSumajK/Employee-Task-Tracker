'use client';

import { Container, Title, Group, Button, Stack, Text, Box, Paper, ThemeIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTaskTracker } from '@/hooks/useTaskTracker';
import { useAuth } from '@/hooks/useAuth';
import { DashboardStats } from '@/components/DashboardStats';
import { EmployeeList } from '@/components/EmployeeList';
import { AddTaskModal } from '@/components/AddTaskModal';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { useState, useEffect, useMemo } from 'react';
import { Plus, TrendingUp, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { employees, addTask, updateTaskStatus, stats } = useTaskTracker();
  const { user } = useAuth();
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isCheckingAuth && !user) {
      router.push('/login');
    }
  }, [user, isCheckingAuth, router]);

  if (isCheckingAuth) {
    return (
      <Container size="xl" py="xl">
        <LoadingSkeleton type="dashboard" />
      </Container>
    );
  }

  if (!user) return null;

  const handleAddTaskClick = (employeeId?: number) => {
    if (employeeId) {
      setSelectedEmployeeId(employeeId.toString());
    } else {
      setSelectedEmployeeId(null);
    }
    open();
  };

  const employeeOptions = employees.map(emp => ({ value: emp.id.toString(), label: emp.name }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box style={{ minHeight: '100vh', backgroundColor: 'var(--mantine-color-body)' }}>
      {/* Main Content */}
      <Container size="xl" py={{ base: 16, sm: 24, md: 40 }} px={{ base: 12, sm: 20 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Stack style={{ gap: 'clamp(24px, 4vw, 40px)' }}>
            {/* Page Header */}
            <Group justify="space-between" align="flex-end">
              <Box>
                <Title order={1} size="h1" style={{ letterSpacing: '-1px', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                  Dashboard Overview
                </Title>
                <Text c="dimmed" mt={4} size="sm">
                  Welcome back, {user}. Here&apos;s what&apos;s happening today.
                </Text>
              </Box>
              <Button 
                leftSection={<Plus size={18} />}
                onClick={() => handleAddTaskClick()}
                size="md"
                radius="md"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'violet' }}
                className="hover:translate-y-[-2px]"
                style={{
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)',
                  transition: 'all 0.2s ease',
                }}
              >
                New Task
              </Button>
            </Group>

            <motion.div variants={itemVariants}>
              <DashboardStats stats={stats} />
            </motion.div>

            {/* Dashboard Content */}
            <Stack gap="xl">
              {/* Top Performers Section */}
              <motion.div variants={itemVariants}>
                <Paper p="xl" radius="lg" className="glass-card">
                  <Group justify="space-between" mb="lg">
                    <Group gap="xs">
                      <ThemeIcon variant="light" color="teal" size="lg" radius="md">
                        <TrendingUp size={20} />
                      </ThemeIcon>
                      <Title order={2} size="h3">Top Performers</Title>
                    </Group>
                    <Button variant="subtle" color="indigo" component={Link} href="/dashboard/employees" size="sm">
                      View All Employees
                    </Button>
                  </Group>
                  <EmployeeList 
                    employees={useMemo(() => employees
                      .map(e => ({
                        ...e,
                        completionRate: e.tasks.length > 0 
                          ? (e.tasks.filter(t => t.status === 'Completed').length / e.tasks.length) * 100 
                          : 0
                      }))
                      .sort((a, b) => b.completionRate - a.completionRate)
                      .slice(0, 3), [employees])
                    } 
                    onUpdateTaskStatus={updateTaskStatus}
                    onAddTask={handleAddTaskClick}
                  />
                </Paper>
              </motion.div>

              {/* Needs Attention Section */}
              <motion.div variants={itemVariants}>
                <Paper p="xl" radius="lg" className="glass-card" style={{ borderColor: 'var(--mantine-color-red-2)' }}>
                  <Group justify="space-between" mb="lg">
                    <Group gap="xs">
                      <ThemeIcon variant="light" color="red" size="lg" radius="md">
                        <AlertCircle size={20} />
                      </ThemeIcon>
                      <Title order={2} size="h3">Needs Attention</Title>
                    </Group>
                  </Group>
                  <EmployeeList 
                    employees={useMemo(() => employees
                      .filter(e => {
                        const status = ['Active', 'At Risk', 'Behind', 'Completed'][e.id % 4];
                        return status === 'At Risk' || status === 'Behind';
                      })
                      .slice(0, 3), [employees])
                    } 
                    onUpdateTaskStatus={updateTaskStatus}
                    onAddTask={handleAddTaskClick}
                  />
                </Paper>
              </motion.div>
            </Stack>
          </Stack>
        </motion.div>
      </Container>

      {/* Add Task Modal */}
      <AddTaskModal
        opened={opened}
        onClose={close}
        onSubmit={addTask}
        employees={employeeOptions}
        initialEmployeeId={selectedEmployeeId}
      />
    </Box>
  );
}
