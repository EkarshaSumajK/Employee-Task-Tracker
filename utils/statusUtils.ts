import { TaskStatus } from '@/types';

/**
 * Get the color for a task status
 */
export const getTaskStatusColor = (status: TaskStatus): string => {
  const statusColors: Record<TaskStatus, string> = {
    'Completed': 'teal',
    'In Progress': 'indigo',
    'Pending': 'orange',
  };
  return statusColors[status] || 'gray';
};

/**
 * Get the color for an employee status (Active, At Risk, etc.)
 */
export const getEmployeeStatusColor = (status: string): string => {
  switch (status) {
    case 'Active': return 'teal';
    case 'At Risk': return 'red';
    case 'Behind': return 'orange';
    case 'Completed': return 'blue';
    default: return 'gray';
  }
};

