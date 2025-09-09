export interface Task {
  id: string;
  title: string;
  description?: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface TaskRequest {
  title: string;
  description?: string;
  position?: number;
}

export interface TaskMoveRequest {
  columnId: string;
  position: number;
}

export interface DraggedTask {
  id: string;
  title: string;
  description?: string;
  sourceColumnId: string;
  sourcePosition: number;
}
