/**
 * Application constants
 */

// Mock data generation constants
export const MOCK_DATA_CONSTANTS = {
  TOTAL_EMPLOYEES: 20,
  TASKS_PER_EMPLOYEE: 2,
} as const;

// Task status options
export const TASK_STATUSES = ['Pending', 'In Progress', 'Completed'] as const;

// Employee status options
export const EMPLOYEE_STATUSES = ['Active', 'At Risk', 'Behind', 'Completed'] as const;

// Department options
export const DEPARTMENTS = [
  'Engineering',
  'Design',
  'Marketing',
  'Product',
  'Sales',
  'Support',
] as const;

