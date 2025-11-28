import { Badge, Group, Text, Menu, Stack, Box, ActionIcon, Paper } from '@mantine/core';
import { Task, TaskStatus } from '@/types';
import { Check, Clock, Loader, MoreHorizontal, Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTaskStatusColor } from '@/utils/statusUtils';
import { EmptyState } from '@/components/EmptyState';
import { memo } from 'react';

interface TaskListProps {
  tasks: Task[];
  onUpdateStatus: (taskId: number, newStatus: TaskStatus) => void;
  onDeleteTask?: (taskId: number) => void;
}

export const TaskList = memo(function TaskList({ tasks, onUpdateStatus, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        type="tasks"
        description="This employee doesn't have any tasks assigned yet. Create one to get started!"
      />
    );
  }

  return (
    <Stack gap="sm">
      {tasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Paper 
            p="md"
            radius="md"
            className="glass-card"
            style={{
              transition: 'all 0.2s ease',
            }}
          >
            <Group justify="space-between" align="flex-start">
              <Box style={{ flex: 1 }}>
                <Text fw={600} size="sm" mb={6} style={{ lineHeight: 1.3 }}>
                  {task.title}
                </Text>
                <Badge 
                  color={getTaskStatusColor(task.status)} 
                  variant="light"
                  size="sm"
                  radius="sm"
                >
                  {task.status}
                </Badge>
              </Box>
              
              <Menu shadow="md" width={160} position="bottom-end" radius="md">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray" size="sm" radius="md">
                    <MoreHorizontal size={18} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Update Status</Menu.Label>
                  <Menu.Item 
                    leftSection={<Clock size={14} />} 
                    onClick={() => onUpdateStatus(task.id, 'Pending')}
                    color="orange"
                  >
                    Pending
                  </Menu.Item>
                  <Menu.Item 
                    leftSection={<Loader size={14} />} 
                    onClick={() => onUpdateStatus(task.id, 'In Progress')}
                    color="indigo"
                  >
                    In Progress
                  </Menu.Item>
                  <Menu.Item 
                    leftSection={<Check size={14} />} 
                    onClick={() => onUpdateStatus(task.id, 'Completed')}
                    color="teal"
                  >
                    Completed
                  </Menu.Item>
                  
                  <Menu.Divider />
                  
                  <Menu.Item 
                    leftSection={<Trash size={14} />} 
                    onClick={() => onDeleteTask && onDeleteTask(task.id)}
                    color="red"
                  >
                    Delete Task
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Paper>
        </motion.div>
      ))}
    </Stack>
  );
});

