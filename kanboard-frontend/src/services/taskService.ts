import api from "./api";
import { Task, TaskRequest, TaskMoveRequest } from "../types/task";

export const taskService = {
  async createTask(columnId: string, data: TaskRequest): Promise<Task> {
    const response = await api.post<Task>(`/columns/${columnId}/tasks`, data);
    return response.data;
  },

  async updateTask(id: string, data: TaskRequest): Promise<Task> {
    const response = await api.put<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  async moveTask(id: string, data: TaskMoveRequest): Promise<Task> {
    const response = await api.put<Task>(`/tasks/${id}/move`, data);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
