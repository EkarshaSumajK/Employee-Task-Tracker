export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export interface Employee {
  id: number;
  name: string;
  role: string;
  tasks: Task[];
}

export interface AppState {
  employees: Employee[];
}
