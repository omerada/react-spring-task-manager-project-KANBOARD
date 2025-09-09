import api from "./api";
import { Task, TaskRequest, TaskMoveRequest } from "../types/task";
import { mockTaskService } from "../mocks/mockTaskService";

const isUsingMockApi = process.env.REACT_APP_MOCK_API === "true";

export const taskService = {
  async createTask(columnId: string, data: TaskRequest): Promise<Task> {
    if (isUsingMockApi) {
      return mockTaskService.createTask(columnId, data);
    }
    const response = await api.post<Task>(`/columns/${columnId}/tasks`, data);
    return response.data;
  },

  async updateTask(id: string, data: TaskRequest): Promise<Task> {
    if (isUsingMockApi) {
      const task = await mockTaskService.updateTask(id, data);
      if (!task) {
        throw new Error("Task not found");
      }
      return task;
    }
    const response = await api.put<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  async moveTask(id: string, data: TaskMoveRequest): Promise<Task> {
    if (isUsingMockApi) {
      const task = await mockTaskService.moveTask(id, data);
      if (!task) {
        throw new Error("Task not found");
      }
      return task;
    }
    const response = await api.put<Task>(`/tasks/${id}/move`, data);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    if (isUsingMockApi) {
      const success = await mockTaskService.deleteTask(id);
      if (!success) {
        throw new Error("Task not found");
      }
      return;
    }
    await api.delete(`/tasks/${id}`);
  },

  async getTaskById(id: string): Promise<Task> {
    if (isUsingMockApi) {
      const task = await mockTaskService.getTaskById(id);
      if (!task) {
        throw new Error("Task not found");
      }
      return task;
    }
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },
};
