import api from "./api";
import { Column, ColumnRequest } from "../types/column";

export const columnService = {
  async createColumn(boardId: string, data: ColumnRequest): Promise<Column> {
    const response = await api.post<Column>(`/boards/${boardId}/columns`, data);
    return response.data;
  },

  async updateColumn(id: string, data: ColumnRequest): Promise<Column> {
    const response = await api.put<Column>(`/columns/${id}`, data);
    return response.data;
  },

  async deleteColumn(id: string): Promise<void> {
    await api.delete(`/columns/${id}`);
  },

  async reorderColumns(
    boardId: string,
    columnOrders: { id: string; position: number }[]
  ): Promise<Column[]> {
    const response = await api.put<Column[]>(
      `/boards/${boardId}/columns/reorder`,
      {
        columnOrders,
      }
    );
    return response.data;
  },
};
