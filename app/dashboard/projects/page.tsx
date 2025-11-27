'use client';

import { Container, Title, Text, Paper, Group, Badge, Button, Stack, Avatar, Progress, Box, ScrollArea, Flex } from '@mantine/core';
import { Plus, Calendar, MoreHorizontal, ArrowRight, Clock, CheckCircle2, CircleDashed, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { AddProjectModal } from '@/components/AddProjectModal';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

export default function ProjectsPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [projects, setProjects] = useState([
    {
      id: '1',
      title: 'Website Redesign',
      status: 'In Progress',
      dueDate: 'Dec 24, 2025',
      progress: 65,
      members: ['JK', 'KP', 'LJ'],
      color: 'indigo',
      description: 'Revamping the corporate website with new branding.',
    },
    {
      id: '2',
      title: 'Mobile App Development',
      status: 'Planning',
      dueDate: 'Jan 15, 2026',
      progress: 15,
      members: ['TE', 'JK'],
      color: 'blue',
      description: 'Initial scoping and wireframing for iOS app.',
    },
    {
      id: '3',
      title: 'Marketing Campaign',
      status: 'Active',
      dueDate: 'Nov 30, 2025',
      progress: 80,
      members: ['LJ', 'TE', 'KP'],
      color: 'teal',
      description: 'Q4 marketing push across social media channels.',
    },
    {
      id: '4',
      title: 'Database Migration',
      status: 'On Hold',
      dueDate: 'Feb 10, 2026',
      progress: 40,
      members: ['KP', 'LJ'],
      color: 'orange',
      description: 'Paused pending server infrastructure upgrades.',
    },
    {
      id: '5',
      title: 'User Dashboard',
      status: 'In Progress',
      dueDate: 'Dec 10, 2025',
      progress: 45,
      members: ['JK', 'TE'],
      color: 'violet',
      description: 'Implementing new analytics widgets for users.',
    },
    {
      id: '6',
      title: 'API Documentation',
      status: 'Completed',
      dueDate: 'Nov 15, 2025',
      progress: 100,
      members: ['KP'],
      color: 'green',
      description: 'Updated Swagger docs for v2 API endpoints.',
    },
  ]);

  const handleAddProject = (newProject: any) => {
    setProjects((prev) => [...prev, newProject]);
  };



  const columns = [
    { id: 'Planning', label: 'Planning', color: 'blue', icon: CircleDashed },
    { id: 'In Progress', label: 'In Progress', color: 'indigo', icon: Clock },
    { id: 'Active', label: 'Active', color: 'teal', icon: CheckCircle2 },
    { id: 'Completed', label: 'Completed', color: 'green', icon: CheckCircle2 },
    { id: 'On Hold', label: 'On Hold', color: 'orange', icon: AlertCircle },
  ];

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Create a map of projects by status to handle reordering locally within columns
    const projectsByStatus: Record<string, typeof projects> = {
      'Planning': [],
      'In Progress': [],
      'Active': [],
      'Completed': [],
      'On Hold': []
    };

    // Populate the map
    projects.forEach(project => {
      if (projectsByStatus[project.status]) {
        projectsByStatus[project.status].push(project);
      }
    });

    // Remove from source
    const sourceColumn = Array.from(projectsByStatus[source.droppableId]);
    const [movedProject] = sourceColumn.splice(source.index, 1);

    // Update status
    const updatedProject = { ...movedProject, status: destination.droppableId };

    // Add to destination
    const destinationColumn = source.droppableId === destination.droppableId 
      ? sourceColumn 
      : Array.from(projectsByStatus[destination.droppableId]);
    
    destinationColumn.splice(destination.index, 0, updatedProject);

    // Update the map
    projectsByStatus[source.droppableId] = sourceColumn;
    projectsByStatus[destination.droppableId] = destinationColumn;

    // Flatten back to array, preserving the new order
    // We iterate through our defined columns to ensure the global order roughly follows columns,
    // but the critical part is that within each status, the order is what we just set.
    const newProjects = [
      ...projectsByStatus['Planning'],
      ...projectsByStatus['In Progress'],
      ...projectsByStatus['Active'],
      ...projectsByStatus['Completed'],
      ...projectsByStatus['On Hold']
    ];

    setProjects(newProjects);
  };

  // Group projects by status
  const getProjectsByStatus = (status: string) => projects.filter(p => p.status === status);

  return (
    <Container size="xl" py={{ base: 16, sm: 24, md: 40 }} px={{ base: 12, sm: 20 }} style={{ maxWidth: '100%' }}>
      <Stack gap="xl" h="calc(100vh - 100px)">
        <Group justify="space-between" align="flex-end">
          <Box>
            <Title order={1} size="h1" style={{ letterSpacing: '-1px' }}>
              Projects Board
            </Title>
            <Text c="dimmed" mt={4} size="sm">
              Manage projects across different stages.
            </Text>
          </Box>
          <Button 
            leftSection={<Plus size={18} />}
            variant="gradient"
            gradient={{ from: 'indigo', to: 'violet' }}
            size="md"
            radius="md"
            onClick={open}
          >
            New Project
          </Button>
        </Group>

        <AddProjectModal opened={opened} onClose={close} onSubmit={handleAddProject} />

        <DragDropContext onDragEnd={onDragEnd}>
          <ScrollArea style={{ flex: 1, marginLeft: '-20px', marginRight: '-20px', paddingLeft: '20px', paddingRight: '20px' }}>
            <Flex gap="xl" align="flex-start" style={{ minWidth: 'min-content', paddingBottom: '20px' }}>
              {columns.map((column) => (
                <Stack 
                  key={column.id} 
                  gap="lg" 
                  w={{ base: '85vw', sm: 320 }} 
                  style={{ minWidth: 'auto' }} // Override inline style if needed, but using props is better
                  miw={{ base: '85vw', sm: 320 }}
                >
                  <Group justify="space-between" bg="var(--mantine-color-body)" p="md" style={{ borderRadius: '12px', border: '1px solid var(--mantine-color-default-border)' }}>
                    <Group gap="xs">
                      <column.icon size={18} className={`text-${column.color}-500`} />
                      <Text fw={700} size="sm">{column.label}</Text>
                      <Badge size="xs" variant="light" color={column.color} circle>
                        {getProjectsByStatus(column.id).length}
                      </Badge>
                    </Group>
                    <MoreHorizontal size={16} className="text-gray-400" style={{ cursor: 'pointer' }} />
                  </Group>

                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <Stack 
                        gap="md" 
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                        style={{ minHeight: '100px' }}
                      >
                        {getProjectsByStatus(column.id).map((project, index) => (
                          <Draggable key={project.id} draggableId={project.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  opacity: snapshot.isDragging ? 0.8 : 1,
                                }}
                              >
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <Paper p="md" radius="md" className="glass-card" withBorder style={{ cursor: 'grab' }}>
                                    <Group justify="space-between" mb="xs">
                                      <Badge color={project.color} variant="light" size="xs">{project.status}</Badge>
                                      <MoreHorizontal size={14} className="text-gray-400" />
                                    </Group>
                                    <Title order={5} mb={4} size="sm">{project.title}</Title>
                                    <Text size="xs" c="dimmed" lineClamp={2} mb="md">
                                      {project.description}
                                    </Text>
                                    
                                    <Stack gap="xs">
                                      <Group justify="space-between" align="center">
                                        <Avatar.Group spacing="xs">
                                          {project.members.map((member, i) => (
                                            <Avatar key={i} radius="xl" size="sm" color="blue" style={{ width: 24, height: 24, fontSize: 10 }}>{member}</Avatar>
                                          ))}
                                        </Avatar.Group>
                                        <Text size="xs" c={project.color} fw={600}>{project.progress}%</Text>
                                      </Group>
                                      <Progress value={project.progress} color={project.color} size="xs" radius="xl" />
                                      <Group gap={4} mt={4}>
                                        <Calendar size={12} className="text-gray-400" />
                                        <Text size="xs" c="dimmed">{project.dueDate}</Text>
                                      </Group>
                                    </Stack>
                                  </Paper>
                                </motion.div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Stack>
                    )}
                  </Droppable>
                </Stack>
              ))}
            </Flex>
          </ScrollArea>
        </DragDropContext>
      </Stack>
    </Container>
  );
}
