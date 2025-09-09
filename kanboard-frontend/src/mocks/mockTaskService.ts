import { mockTasks } from "../mocks/data";
import { delay, generateId } from "../mocks/utils";
import { Task, TaskRequest, TaskMoveRequest } from "../types/task";

class MockTaskService {
  private tasks = [...mockTasks];

  async getTasksByColumn(columnId: string): Promise<Task[]> {
    await delay(200);
    // In real app, this would filter by columnId from database
    return this.tasks;
  }

  async createTask(columnId: string, taskData: TaskRequest): Promise<Task> {
    await delay(400);

    const newTask: Task = {
      id: generateId(),
      title: taskData.title,
      description: taskData.description || "",
      position: taskData.position || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.tasks.push(newTask);
    return newTask;
  }

  async updateTask(
    id: string,
    taskData: Partial<TaskRequest>
  ): Promise<Task | null> {
    await delay(300);

    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return null;

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...taskData,
      updatedAt: new Date().toISOString(),
    };

    return this.tasks[taskIndex];
  }

  async moveTask(id: string, moveData: TaskMoveRequest): Promise<Task | null> {
    await delay(300);

    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return null;

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      position: moveData.position,
      updatedAt: new Date().toISOString(),
    };

    return this.tasks[taskIndex];
  }

  async deleteTask(id: string): Promise<boolean> {
    await delay(300);

    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return false;

    this.tasks.splice(taskIndex, 1);
    return true;
  }

  async getTaskById(id: string): Promise<Task | null> {
    await delay(200);
    return this.tasks.find((task) => task.id === id) || null;
  }
}

export const mockTaskService = new MockTaskService();
