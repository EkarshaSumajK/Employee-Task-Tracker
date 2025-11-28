import { Paper, Stack, Text, Button, ThemeIcon, Title, Box } from '@mantine/core';
import { 
  Users, 
  ClipboardList, 
  Search, 
  FileQuestion,
  Plus,
  AlertCircle
} from 'lucide-react';
import { ReactNode } from 'react';

interface EmptyStateProps {
  type?: 'tasks' | 'employees' | 'search' | 'error' | 'generic';
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Empty state component with illustrations for better UX
 */
export function EmptyState({ 
  type = 'generic', 
  title, 
  description, 
  icon,
  action 
}: EmptyStateProps) {
  const getDefaultContent = () => {
    switch (type) {
      case 'tasks':
        return {
          icon: <ClipboardList size={48} />,
          title: title || 'No tasks found',
          description: description || 'This employee doesn\'t have any tasks assigned yet. Create one to get started!',
          color: 'indigo',
        };
      case 'employees':
        return {
          icon: <Users size={48} />,
          title: title || 'No employees found',
          description: description || 'No employees match your search criteria. Try adjusting your filters.',
          color: 'blue',
        };
      case 'search':
        return {
          icon: <Search size={48} />,
          title: title || 'No results found',
          description: description || 'We couldn\'t find anything matching your search. Try different keywords.',
          color: 'gray',
        };
      case 'error':
        return {
          icon: <AlertCircle size={48} />,
          title: title || 'Something went wrong',
          description: description || 'We encountered an error while loading this content. Please try again.',
          color: 'red',
        };
      default:
        return {
          icon: <FileQuestion size={48} />,
          title: title || 'Nothing here',
          description: description || 'There\'s nothing to display at the moment.',
          color: 'gray',
        };
    }
  };

  const content = getDefaultContent();
  const displayIcon = icon || content.icon;
  const displayTitle = title || content.title;
  const displayDescription = description || content.description;

  return (
    <Paper 
      p="xl" 
      radius="lg"
      className="glass-card"
      style={{ 
        textAlign: 'center',
        border: '2px dashed var(--mantine-color-default-border)',
      }}
    >
      <Stack align="center" gap="lg">
        <ThemeIcon 
          variant="light" 
          color={content.color} 
          size={80} 
          radius="xl"
          className="empty-state-icon"
        >
          {displayIcon}
        </ThemeIcon>
        
        <Box>
          <Title order={3} size="h4" mb="sm">
            {displayTitle}
          </Title>
          <Text c="dimmed" size="sm" maw={400} mx="auto">
            {displayDescription}
          </Text>
        </Box>

        {action && (
          <Button
            leftSection={<Plus size={18} />}
            onClick={action.onClick}
            variant="filled"
            color={content.color}
            size="md"
            radius="md"
          >
            {action.label}
          </Button>
        )}
      </Stack>
    </Paper>
  );
}

