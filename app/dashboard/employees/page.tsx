'use client';

import { Container, Title, Stack, TextInput, Select, Button, Flex } from '@mantine/core';
import { EmployeeList } from '@/components/EmployeeList';
import { useTaskTracker } from '@/hooks/useTaskTracker';
import { Search, Filter, Plus } from 'lucide-react';
import { useState } from 'react';
import { AddTaskModal } from '@/components/AddTaskModal';
import { useDisclosure } from '@mantine/hooks';
import { TaskStatus } from '@/types';
import { DEPARTMENTS } from '@/constants';
import { EmptyState } from '@/components/EmptyState';

export default function EmployeesPage() {
  const { employees, addTask, updateTaskStatus, filter, setFilter } = useTaskTracker();
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string | null>('All');
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  const handleAddTaskClick = (employeeId?: number) => {
    if (employeeId) {
      setSelectedEmployeeId(employeeId.toString());
    } else {
      setSelectedEmployeeId(null);
    }
    open();
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) || 
                          emp.role.toLowerCase().includes(search.toLowerCase());
    const department = DEPARTMENTS[emp.id % DEPARTMENTS.length];
    const matchesDepartment = departmentFilter === 'All' || !departmentFilter || department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const employeeOptions = employees.map(emp => ({ value: emp.id.toString(), label: emp.name }));

  return (
    <Container size="xl" py={{ base: 16, sm: 24, md: 40 }} px={{ base: 12, sm: 16, md: 'xl' }} className="animate-fade-in">
      <Stack style={{ gap: 'clamp(var(--mantine-spacing-lg), 4vw, var(--mantine-spacing-xl))' }}>
        <Flex direction={{ base: 'column', md: 'row' }} justify={{ md: 'space-between' }} align={{ md: 'flex-end' }} gap="md">
          <Title order={1} style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>Team Members</Title>
          <Button 
            leftSection={<Plus size={18} />} 
            color="blue" 
            size="sm" 
            radius="md"
            px="lg"
            onClick={() => handleAddTaskClick()}
            w={{ base: '100%', md: 'auto' }}
            style={{
              maxWidth: '210px',
            }}
          >
            Add Task
          </Button>
        </Flex>

        <Flex direction={{ base: 'column', sm: 'row' }} gap="sm">
          <TextInput
            placeholder="Search employees..."
            leftSection={<Search size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            style={{ flex: 1 }}
            w={{ base: '100%', sm: 'auto' }}
            radius="md"
            size="sm"
          />
          <Select
            placeholder="Department"
            data={['All', ...DEPARTMENTS]}
            value={departmentFilter}
            onChange={setDepartmentFilter}
            leftSection={<Filter size={16} />}
            w={{ base: '100%', sm: '200px' }}
            radius="md"
            size="sm"
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
          <Select
            placeholder="Task Status"
            data={[
              { value: 'All', label: 'All Tasks' },
              { value: 'Pending', label: 'Pending' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Completed', label: 'Completed' },
            ]}
            value={filter}
            onChange={(value) => setFilter(value as TaskStatus | 'All')}
            w={{ base: '100%', sm: '200px' }}
            radius="md"
            size="sm"
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
        </Flex>

        {filteredEmployees.length === 0 ? (
          <EmptyState
            type="employees"
            title="No employees found"
            description="No employees match your current filters. Try adjusting your search criteria or filters."
            action={{
              label: 'Clear Filters',
              onClick: () => {
                setSearch('');
                setDepartmentFilter('All');
                setFilter('All');
              }
            }}
          />
        ) : (
          <EmployeeList 
            employees={filteredEmployees} 
            onUpdateTaskStatus={updateTaskStatus}
            onAddTask={handleAddTaskClick}
            taskStatusFilter={filter}
          />
        )}
      </Stack>

      <AddTaskModal
        opened={opened}
        onClose={close}
        onSubmit={addTask}
        employees={employeeOptions}
        initialEmployeeId={selectedEmployeeId}
      />
    </Container>
  );
}
