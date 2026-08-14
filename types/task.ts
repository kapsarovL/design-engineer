export type TaskStatus = "todo" | "in_progress" | "completed" | "in_review";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Assignee {
  id: string;
  name: string;
  avatar: string;
  role?: string;
}

export interface TaskComment {
  id: string;
  author: Assignee;
  text: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: Assignee;
  createdAt: string;
  dueDate?: string;
  tags: string[];
  estimatedHours?: number;
  commentsCount?: number;
  hasReminder?: boolean;
  completedAt?: string;
  isArchived?: boolean;
}

export interface TaskTemplate {
  id: string;
  name: string;
  title: string;
  description: string;
  priority: TaskPriority;
  tags: string;
  assignee: string;
}

export type ActionResponse = {
  success: boolean;
  message?: string;
  task?: Task;
};

export interface TaskFilterParams {
  status?: string;
  priority?: string;
  assignee?: string;
  search?: string;
  view?: "list" | "kanban" | "analytics";
}
