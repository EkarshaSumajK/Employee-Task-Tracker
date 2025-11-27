import { Modal, TextInput, Textarea, Select, Button, Group, ColorInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';

interface AddProjectModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (project: any) => void;
}

export function AddProjectModal({ opened, onClose, onSubmit }: AddProjectModalProps) {
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      status: 'Planning',
      dueDate: new Date(),
      color: '#4dabf7', // Default blue
      members: [],
    },
    validate: {
      title: (value) => (value.length < 2 ? 'Title must be at least 2 characters' : null),
      status: (value) => (!value ? 'Status is required' : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    // Format date to string like 'Dec 24, 2025'
    const formattedDate = values.dueDate.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    // Determine color name based on hex or keep hex
    // For simplicity in this demo, we'll map some common colors or just pass the hex if the badge supports it.
    // The existing app uses color names like 'blue', 'indigo'. Let's try to map or just use the color prop directly.
    // Since the Badge component in Mantine supports hex colors, we can pass the hex directly.
    
    // Generate a random progress for demo purposes or add a field. Let's default to 0.
    
    const newProject = {
      id: Date.now().toString(), // Simple ID generation
      title: values.title,
      description: values.description,
      status: values.status,
      dueDate: formattedDate,
      progress: 0,
      members: ['ME'], // Default to current user
      color: values.color,
    };

    onSubmit(newProject);
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create New Project" centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Project Title"
          placeholder="e.g., Website Redesign"
          required
          mb="md"
          {...form.getInputProps('title')}
        />
        
        <Textarea
          label="Description"
          placeholder="Brief description of the project"
          mb="md"
          {...form.getInputProps('description')}
        />

        <Select
          label="Status"
          placeholder="Select status"
          data={['Planning', 'In Progress', 'Active', 'Completed', 'On Hold']}
          required
          mb="md"
          {...form.getInputProps('status')}
        />

        <DateInput
          label="Due Date"
          placeholder="Select date"
          mb="md"
          {...form.getInputProps('dueDate')}
        />

        <ColorInput
          label="Project Color"
          placeholder="Pick a color"
          mb="xl"
          {...form.getInputProps('color')}
        />

        <Group justify="flex-end">
          <Button variant="default" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="gradient" gradient={{ from: 'indigo', to: 'violet' }}>Create Project</Button>
        </Group>
      </form>
    </Modal>
  );
}
