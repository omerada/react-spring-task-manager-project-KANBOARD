import { Task } from "./task";

export interface Column {
  id: string;
  title: string;
  position: number;
  tasks: Task[];
}

export interface ColumnRequest {
  title: string;
  position?: number;
}
