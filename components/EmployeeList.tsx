import { SimpleGrid, Card, Text, Group, Avatar, Button, Stack, Box, Progress, Badge } from '@mantine/core';
import { Employee, TaskStatus } from '@/types';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { getEmployeeStatusColor } from '@/utils/statusUtils';

interface EmployeeListProps {
  employees: Employee[];
  onUpdateTaskStatus: (employeeId: number, taskId: number, newStatus: TaskStatus) => void;
  onAddTask: (employeeId: number) => void;
  onDeleteTask?: (employeeId: number, taskId: number) => void;
  taskStatusFilter?: TaskStatus | 'All';
}

export function EmployeeList({ employees, onAddTask, taskStatusFilter = 'All' }: EmployeeListProps) {
  const getStatusColor = (status: string) => getEmployeeStatusColor(status);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle2 size={14} />;
      case 'At Risk': return <AlertTriangle size={14} />;
      case 'Behind': return <Clock size={14} />;
      case 'Completed': return <CheckCircle2 size={14} />;
      default: return <CheckCircle2 size={14} />;
    }
  };

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 'md', md: 'lg' }}>
      {employees.map((employee, index) => {
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
        const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        let status: string;
        if (totalTasks === 0) {
          status = 'Active';
        } else if (completedTasks === totalTasks) {
          status = 'Completed';
        } else if (progress < 50 && pendingTasks > 0) {
          status = 'At Risk';
        } else if (progress < 80 && pendingTasks > 0) {
          status = 'Behind';
        } else {
          status = 'Active';
        }
        const statusColor = getStatusColor(status);
        
        const displayTaskCount = taskStatusFilter === 'All' 
          ? `${completedTasks}/${employee.tasks.length} Tasks`
          : `${filteredTasks.length} ${taskStatusFilter} Task${filteredTasks.length !== 1 ? 's' : ''}`;

        return (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card 
              padding="lg"
              radius="lg"
              className="glass-card"
              style={{ height: '100%' }}
            >
              <Stack justify="space-between" h="100%">
                <Box>
                  <Group justify="space-between" mb="md" align="flex-start">
                    <Group gap="sm">
                      <Avatar 
                        src={null}
                        radius="xl" 
                        size="md"
                        color="indigo"
                        variant="light"
                      >
                        {initials}
                      </Avatar>
                      <Box>
                        <Text fw={700} size="md" style={{ lineHeight: 1.2 }}>
                          {employee.name}
                        </Text>
                        <Text size="xs" c="dimmed" fw={500}>
                          {employee.role}
                        </Text>
                      </Box>
                    </Group>
                    <Badge 
                      color={statusColor} 
                      variant="light" 
                      size="sm" 
                      radius="sm"
                      leftSection={getStatusIcon(status)}
                    >
                      {status}
                    </Badge>
                  </Group>

                  <Box mb="md">
                    <Group justify="space-between" mb={6}>
                      <Text size="xs" fw={600} c="dimmed">Sprint Progress</Text>
                      <Text size="xs" fw={700} c={statusColor}>
                        {Math.round(progress)}%
                      </Text>
                    </Group>
                    <Progress 
                      value={progress} 
                      size="sm" 
                      radius="xl" 
                      color={statusColor}
                      striped={progress === 100}
                      animated={progress === 100}
                    />
                    <Group justify="space-between" mt={4}>
                      <Text size="xs" c="dimmed">
                        {displayTaskCount}
                      </Text>
                    </Group>
                  </Box>
                </Box>

                <Group gap="xs" mt="auto">
                  <Button 
                    component={Link}
                    href={`/dashboard/employees/${employee.id}`}
                    variant="light" 
                    color="indigo" 
                    radius="md"
                    size="sm"
                    className="hover-scale"
                    style={{ flex: 1 }}
                  >
                    Profile
                  </Button>
                  <Button 
                    onClick={() => onAddTask(employee.id)}
                    variant="filled" 
                    color="indigo" 
                    radius="md"
                    size="sm"
                    className="hover-scale"
                    style={{ flex: 1 }}
                  >
                    Add Task
                  </Button>
                </Group>
              </Stack>
            </Card>
          </motion.div>
        );
      })}
    </SimpleGrid>
  );
}

