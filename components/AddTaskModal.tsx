import { Modal, TextInput, Button, Group, Select, Textarea, Stack, Text, Box, SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { Calendar, User, Flag, AlignLeft } from 'lucide-react';

interface AddTaskModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (employeeId: number, title: string) => void;
  employees: { value: string; label: string }[];
  initialEmployeeId?: string | null;
}

export function AddTaskModal({ opened, onClose, onSubmit, employees, initialEmployeeId }: AddTaskModalProps) {
  const form = useForm({
    initialValues: {
      employeeId: initialEmployeeId || '',
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
    },
    validate: {
      employeeId: (value) => (value ? null : 'Please select an assignee'),
      title: (value) => (value.length > 0 ? null : 'Task title is required'),
    },
  });

  useEffect(() => {
    if (initialEmployeeId) {
      form.setFieldValue('employeeId', initialEmployeeId);
    } else {
      form.setFieldValue('employeeId', '');
    }
  }, [initialEmployeeId, opened]);

  const handleSubmit = (values: typeof form.values) => {
    onSubmit(parseInt(values.employeeId), values.title);
    form.reset();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal 
      opened={opened} 
      onClose={handleClose}
      size="lg"
      centered
      title={
        <Group gap="xs">
          <Box 
            style={{ 
              width: 4, 
              height: 24, 
              backgroundColor: 'var(--mantine-color-indigo-6)', 
              borderRadius: 2 
            }} 
          />
          <Text fw={600} size="lg">Create new task</Text>
        </Group>
      }
      padding="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          {/* Task Title */}
          <Box>
            <Group gap={8} mb={4}>
              <AlignLeft size={16} style={{ color: 'var(--mantine-color-gray-6)' }} />
              <Text size="sm" fw={500}>Task Title</Text>
            </Group>
            <TextInput
              placeholder="Enter a descriptive task name"
              size="md"
              {...form.getInputProps('title')}
            />
          </Box>

          {/* Description */}
          <Box>
            <Text size="sm" fw={500} mb={4}>Description (Optional)</Text>
            <Textarea
              placeholder="Add more details about this task..."
              minRows={3}
              size="md"
              {...form.getInputProps('description')}
            />
          </Box>

          {/* Assignee and Priority Row */}
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <Box>
              <Group gap={8} mb={4}>
                <User size={16} style={{ color: 'var(--mantine-color-gray-6)' }} />
                <Text size="sm" fw={500}>Assigned to</Text>
              </Group>
              <Select
                placeholder="Select a team member"
                data={employees}
                size="md"
                searchable
                limit={20}
                nothingFoundMessage="No team members found"
                comboboxProps={{ 
                  middlewares: { flip: true, shift: true, inline: false },
                  onOpen: () => {
                    const scrollY = window.scrollY;
                    requestAnimationFrame(() => {
                      window.scrollTo({ top: scrollY, behavior: 'instant' });
                    });
                  }
                }}
                {...form.getInputProps('employeeId')}
              />
            </Box>

            <Box>
              <Group gap={8} mb={4}>
                <Flag size={16} style={{ color: 'var(--mantine-color-gray-6)' }} />
                <Text size="sm" fw={500}>Priority</Text>
              </Group>
              <Select
                data={[
                  { value: 'Low', label: 'Low' },
                  { value: 'Medium', label: 'Medium' },
                  { value: 'High', label: 'High' },
                  { value: 'Urgent', label: 'Urgent' },
                ]}
                size="md"
                comboboxProps={{ 
                  middlewares: { flip: true, shift: true, inline: false },
                  onOpen: () => {
                    const scrollY = window.scrollY;
                    requestAnimationFrame(() => {
                      window.scrollTo({ top: scrollY, behavior: 'instant' });
                    });
                  }
                }}
                {...form.getInputProps('priority')}
              />
            </Box>
          </SimpleGrid>

          {/* Due Date */}
          <Box>
            <Group gap={8} mb={4}>
              <Calendar size={16} style={{ color: 'var(--mantine-color-gray-6)' }} />
              <Text size="sm" fw={500}>Due Date (Optional)</Text>
            </Group>
            <TextInput
              type="date"
              size="md"
              {...form.getInputProps('dueDate')}
            />
          </Box>

          {/* Action Buttons */}
          <Group justify="flex-end" mt="md" pt="md" style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}>
            <Button 
              variant="subtle" 
              color="gray" 
              onClick={handleClose}
              size="md"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'violet' }}
              size="md"
              radius="md"
            >
              Create task
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
