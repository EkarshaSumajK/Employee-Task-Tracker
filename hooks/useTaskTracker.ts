import { useState, useCallback, useMemo } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { Employee, TaskStatus } from '@/types';
import { MOCK_DATA_CONSTANTS, TASK_STATUSES } from '@/constants';

const generateMockData = () => {
  const employees: Employee[] = [];
  
  const firstNames = [
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth",
    "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen",
    "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra",
    "Donald", "Ashley", "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle",
    "Kenneth", "Carol", "Kevin", "Amanda", "Brian", "Dorothy", "George", "Melissa", "Edward", "Deborah",
    "Ronald", "Stephanie", "Timothy", "Rebecca", "Jason", "Sharon", "Jeffrey", "Laura", "Ryan", "Cynthia",
    "Jacob", "Kathleen", "Gary", "Amy", "Nicholas", "Shirley", "Eric", "Angela", "Jonathan", "Helen",
    "Stephen", "Anna", "Larry", "Brenda", "Justin", "Pamela", "Scott", "Nicole", "Brandon", "Emma",
    "Benjamin", "Samantha", "Samuel", "Katherine", "Raymond", "Christine", "Gregory", "Debra", "Frank", "Rachel",
    "Alexander", "Catherine", "Patrick", "Carolyn", "Raymond", "Janet", "Jack", "Ruth", "Dennis", "Maria"
  ];
  
  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
    "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
    "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts",
    "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes",
    "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper",
    "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson",
    "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes",
    "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez"
  ];
  
  const roles = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer", "QA Engineer",
    "UI/UX Designer", "Product Manager", "Project Manager", "Data Analyst", "Business Analyst",
    "Marketing Manager", "Sales Representative", "Content Writer", "Graphic Designer", "System Administrator",
    "Security Analyst", "Mobile Developer", "Machine Learning Engineer", "Cloud Architect", "Scrum Master"
  ];
  
  const taskTemplates = [
    "Implement user authentication", "Design database schema", "Create landing page", "Fix bug in payment module",
    "Update API documentation", "Optimize database queries", "Refactor legacy code", "Write unit tests",
    "Review pull request", "Deploy to production", "Setup CI/CD pipeline", "Integrate third-party API",
    "Conduct user research", "Create wireframes", "Update user interface", "Implement search feature",
    "Add email notifications", "Setup monitoring tools", "Perform security audit", "Write technical documentation",
    "Analyze user metrics", "Create marketing campaign", "Update brand guidelines", "Optimize website performance",
    "Implement caching layer", "Configure load balancer", "Migrate to cloud", "Setup backup system",
    "Create mobile app", "Design admin dashboard", "Implement chat feature", "Add analytics tracking",
    "Setup error logging", "Create data visualization", "Implement file upload", "Add social login",
    "Setup SSL certificate", "Create REST API", "Implement pagination", "Add dark mode",
    "Create onboarding flow", "Setup email templates", "Implement multi-language support", "Add export feature",
    "Create reporting dashboard", "Setup A/B testing", "Implement rate limiting", "Add user permissions",
    "Create notification system", "Setup webhooks", "Implement real-time sync", "Add offline support"
  ];
  
  const statuses: TaskStatus[] = [...TASK_STATUSES];

  let taskIdCounter = 1;

  for (let i = 1; i <= MOCK_DATA_CONSTANTS.TOTAL_EMPLOYEES; i++) {
    // Use deterministic index-based selection instead of Math.random()
    const firstName = firstNames[(i * 7) % firstNames.length];
    const lastName = lastNames[(i * 13) % lastNames.length];
    const name = `${firstName} ${lastName}`;
    const role = roles[(i * 3) % roles.length];
    
    const tasks = [];
    for (let j = 0; j < MOCK_DATA_CONSTANTS.TASKS_PER_EMPLOYEE; j++) {
      const taskTitle = taskTemplates[(i * 11 + j * 17) % taskTemplates.length];
      tasks.push({
        id: taskIdCounter++,
        title: taskTitle,
        status: statuses[(i + j) % statuses.length],
      });
    }
    
    employees.push({
      id: i,
      name: name,
      role: role,
      tasks: tasks,
    });
  }
  return { employees };
};

const INITIAL_DATA = generateMockData();

import { notifications } from '@mantine/notifications';
import { Check, Trash, Plus } from 'lucide-react';
import React from 'react';

// ... (existing imports and mock data generation)

export function useTaskTracker() {
  const [data, setData] = useLocalStorage<{ employees: Employee[] }>({
    key: 'employee-task-tracker-data-v6',
    defaultValue: INITIAL_DATA as { employees: Employee[] },
  });

  const [filter, setFilter] = useState<TaskStatus | 'All'>('All');

  const addTask = useCallback((employeeId: number, title: string) => {
    setData((prev) => ({
      employees: prev.employees.map((emp) => {
        if (emp.id === employeeId) {
          return {
            ...emp,
            tasks: [
              ...emp.tasks,
              {
                id: Date.now(),
                title,
                status: 'Pending',
              },
            ],
          };
        }
        return emp;
      }),
    }));
    notifications.show({
      title: 'Task Created',
      message: `Task "${title}" has been successfully added.`,
      color: 'teal',
      icon: React.createElement(Plus, { size: 16 }),
    });
  }, [setData]);

  const updateTaskStatus = useCallback((employeeId: number, taskId: number, newStatus: TaskStatus) => {
    setData((prev) => ({
      employees: prev.employees.map((emp) => {
        if (emp.id === employeeId) {
          return {
            ...emp,
            tasks: emp.tasks.map((task) => {
              if (task.id === taskId) {
                return { ...task, status: newStatus };
              }
              return task;
            }),
          };
        }
        return emp;
      }),
    }));
    notifications.show({
      title: 'Status Updated',
      message: `Task status changed to ${newStatus}.`,
      color: 'blue',
      icon: React.createElement(Check, { size: 16 }),
    });
  }, [setData]);

  const deleteTask = useCallback((employeeId: number, taskId: number) => {
    setData((prev) => ({
      employees: prev.employees.map((emp) => {
        if (emp.id === employeeId) {
          return {
            ...emp,
            tasks: emp.tasks.filter((task) => task.id !== taskId),
          };
        }
        return emp;
      }),
    }));
    notifications.show({
      title: 'Task Deleted',
      message: 'The task has been permanently removed.',
      color: 'red',
      icon: React.createElement(Trash, { size: 16 }),
    });
  }, [setData]);

  const stats = useMemo(() => {
    const s = {
      total: 0,
      completed: 0,
      pending: 0,
      inProgress: 0,
    };

    data.employees.forEach(emp => {
      emp.tasks.forEach(task => {
        s.total++;
        if (task.status === 'Completed') s.completed++;
        if (task.status === 'Pending') s.pending++;
        if (task.status === 'In Progress') s.inProgress++;
      });
    });
    return s;
  }, [data.employees]);

  return {
    employees: data.employees,
    addTask,
    updateTaskStatus,
    deleteTask,
    filter,
    setFilter,
    stats,
  };
}
