<div align="center">
  <img src="app/icon.svg" alt="TaskTracker Logo" width="64" height="64" />
  <h1>Employee Task Tracker</h1>
</div>

A modern, responsive web application for tracking employee tasks and managing team productivity. Built with Next.js 16 and Mantine UI, this application provides a comprehensive solution for task management with a beautiful, intuitive interface.

## 🚀 Features

### Core Functionality
- **Employee Management**: View a comprehensive list of employees with their assigned tasks
- **Task Management**: 
  - Add new tasks to employees
  - Update task status (Pending, In Progress, Completed)
  - Delete tasks
  - Filter tasks by status
- **Dashboard Overview**: Real-time statistics including total tasks, completion rates, and pending tasks
- **Employee Profiles**: Detailed individual employee pages with task analytics and activity timeline
- **Search & Filter**: 
  - Search employees by name or role
  - Filter by department
  - Filter tasks by status (All, Pending, In Progress, Completed)

### Advanced Features
- **Projects Kanban Board**: Drag-and-drop project management board with multiple status columns
- **Analytics Dashboard**: Data visualization and performance metrics
- **Local Storage Persistence**: All data persists across browser sessions
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Error Boundaries**: Graceful error handling with user-friendly error pages
- **Loading States**: Skeleton loaders for better perceived performance
- **Empty States**: Contextual illustrations and helpful messaging when no data is available
- **Animations**: Smooth transitions and animations using Framer Motion
- **Notifications**: Toast notifications for user actions (task created, status updated, etc.)

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: [Next.js 16.0.5](https://nextjs.org/) with App Router
- **UI Library**: [Mantine v8.3.9](https://mantine.dev/)
- **Language**: TypeScript 5
- **React**: 19.2.0

### Key Libraries
- **State Management**: React Hooks (`useState`, `useEffect`) & Custom Hooks
- **Form Handling**: `@mantine/form` for form validation and management
- **Animations**: [Framer Motion](https://www.framer.com/motion/) 12.23.24
- **Icons**: [Lucide React](https://lucide.dev/) 0.555.0
- **Drag & Drop**: `@hello-pangea/dnd` 18.0.1 for Kanban board functionality
- **Date Handling**: `dayjs` 1.11.19
- **Notifications**: `@mantine/notifications` for toast notifications
- **Styling**: CSS Modules, Mantine Styles, PostCSS

## 📁 Project Structure

```
employee-task-tracker/
├── app/                          # Next.js App Router pages
│   ├── dashboard/               # Dashboard routes
│   │   ├── analytics/           # Analytics page
│   │   ├── employees/           # Employee management
│   │   │   └── [id]/            # Dynamic employee detail page
│   │   ├── projects/            # Projects Kanban board
│   │   ├── settings/            # Settings page
│   │   ├── layout.tsx           # Dashboard layout with sidebar
│   │   └── page.tsx             # Dashboard overview
│   ├── login/                   # Authentication page
│   ├── layout.tsx               # Root layout with Mantine provider
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Global styles and animations
├── components/                  # Reusable React components
│   ├── AddProjectModal.tsx      # Modal for creating projects
│   ├── AddTaskModal.tsx         # Modal for creating tasks
│   ├── DashboardStats.tsx       # Statistics cards component
│   ├── EmployeeList.tsx         # Employee grid/list component
│   ├── EmptyState.tsx           # Empty state illustrations
│   ├── ErrorBoundary.tsx        # Error boundary component
│   ├── LoadingSkeleton.tsx      # Loading skeleton component
│   ├── Sidebar.tsx              # Navigation sidebar
│   └── TaskList.tsx             # Task list component
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts               # Authentication hook
│   └── useTaskTracker.ts        # Task management hook
├── types/                       # TypeScript type definitions
│   └── index.ts                 # Task, Employee, and AppState types
├── utils/                       # Utility functions
│   └── statusUtils.ts           # Status color mapping utilities
├── constants/                   # Application constants
│   └── index.ts                 # Mock data config, status options, departments
└── public/                      # Static assets

```

## 🎯 Key Components

### Custom Hooks

#### `useTaskTracker`
Central hook for managing employee and task data:
- Generates initial mock data (20 employees, 2 tasks each)
- Provides CRUD operations for tasks
- Calculates aggregate statistics
- Manages task status filtering
- Persists data to localStorage using manual `useState`/`useEffect` for stability
- Optimized with `useMemo` and `useCallback` to prevent unnecessary re-renders

#### `useAuth`
Authentication management:
- Handles user login/logout
- Persists user session in localStorage
- Manages route protection

### UI Components

#### `EmployeeList`
Displays employees in a responsive grid:
- Shows employee avatar, name, role
- Calculates and displays completion status badge
- Progress bars for task completion
- Action buttons (Profile, Add Task)

#### `TaskList`
Displays tasks with status management:
- Color-coded status badges
- Dropdown menu for status updates
- Delete functionality
- Empty state handling

#### `DashboardStats`
Statistics cards showing:
- Total tasks count
- Completion rate with ring progress
- Pending tasks count

#### `ErrorBoundary`
Catches React errors and displays:
- User-friendly error messages
- Retry functionality
- Navigation options

#### `LoadingSkeleton`
Multiple variants for loading states:
- Dashboard skeleton
- Employee list skeleton
- Task list skeleton
- Stats cards skeleton

#### `EmptyState`
Contextual empty states with:
- Customizable icons and messages
- Action buttons
- Multiple types (tasks, employees, search, error)

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd employee-task-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📱 Application Routes

- **`/`** - Landing page
- **`/login`** - Authentication page (demo mode - any credentials work)
- **`/dashboard`** - Main dashboard with overview and statistics
- **`/dashboard/employees`** - Employee list with search and filters
- **`/dashboard/employees/[id]`** - Individual employee profile page
- **`/dashboard/projects`** - Projects Kanban board
- **`/dashboard/analytics`** - Analytics and data visualization
- **`/dashboard/settings`** - Application settings

## 🎨 Design Features

- **Glass Morphism**: Modern glassmorphic card designs
- **Gradient Buttons**: Eye-catching gradient action buttons
- **Smooth Animations**: Staggered animations for list items
- **Responsive Typography**: Fluid typography using clamp()
- **Color System**: Consistent color palette with Mantine theme
- **Custom Scrollbars**: Styled scrollbars for better aesthetics
- **Hover Effects**: Interactive hover states on cards and buttons

## 💾 Data Management

### Mock Data Generation
- Generates 20 employees with realistic names
- Assigns 2 tasks per employee
- Tasks have random statuses (Pending, In Progress, Completed)
- Deterministic generation for consistent initial state

### Local Storage
- Data key: `employee-task-tracker-data-v6`
- User session: `task-tracker-user`
- Implemented with `useState` and `useEffect` for manual control
- Automatically syncs on changes
- Persists across browser sessions
- Handles hydration mismatches gracefully

## 🔧 Configuration

### Constants (`constants/index.ts`)
- `MOCK_DATA_CONSTANTS`: Total employees (20), tasks per employee (2)
- `TASK_STATUSES`: Available task statuses
- `EMPLOYEE_STATUSES`: Employee status options
- `DEPARTMENTS`: Department list for filtering

### Status Colors (`utils/statusUtils.ts`)
- Task statuses: Completed (teal), In Progress (indigo), Pending (orange)
- Employee statuses: Active (teal), At Risk (red), Behind (orange), Completed (blue)

## 🎯 Key Features Implementation

### Task Status Filtering
- Filter tasks by status without filtering employees
- Shows all employees, but displays only filtered tasks
- Task counts update based on filter selection

### Employee Status Calculation
- Dynamically calculated based on task completion:
  - **Completed**: All tasks completed
  - **At Risk**: <50% completion with pending tasks
  - **Behind**: 50-80% completion with pending tasks
  - **Active**: >80% completion or actively working

### Responsive Design
- Mobile-first approach
- Breakpoints: base, sm, md, lg
- Fluid spacing and typography
- Adaptive grid layouts

### Performance & Optimization
- **Memoization**: Heavy calculations (stats, filtered lists) are memoized using `useMemo`
- **Stable Callbacks**: Action functions are wrapped in `useCallback` to prevent child re-renders
- **Hydration Handling**: Sidebar and other components handle SSR/CSR hydration mismatches correctly
- **Dynamic Imports**: Used where appropriate to reduce initial bundle size

## 🐛 Error Handling

- **Error Boundaries**: Catches React component errors
- **Empty States**: Handles missing data gracefully
- **Loading States**: Shows skeletons during data loading
- **Form Validation**: Client-side validation for all forms

## 📝 Assumptions & Notes

- **Mock Authentication**: Login accepts any credentials for demo purposes
- **No Backend**: All data stored in browser localStorage
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Data Reset**: Clearing browser cache resets to initial mock data
- **Deterministic Data**: Mock data generation is deterministic for consistency

## 🚀 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

This project was developed as part of the ProU Intern Software Development coding assignment.

## 👨‍💻 Development Notes

- Built with TypeScript for type safety
- Component-based architecture for reusability
- Custom hooks for logic separation
- Utility functions for shared functionality
- Constants file for easy configuration
- Comprehensive error handling and user feedback
