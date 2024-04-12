export interface Todo {
    userId: number;
    id: number;
    title: string;
    description: string;
    createdAt?: string;
    status: string,
    priority: string,
  }