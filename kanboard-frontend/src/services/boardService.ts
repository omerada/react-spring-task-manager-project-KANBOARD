import api from "./api";
import { Board, BoardRequest } from "../types/board";

export const boardService = {
  async getBoards(): Promise<Board[]> {
    const response = await api.get<Board[]>("/boards");
    return response.data;
  },

  async getBoardById(id: string): Promise<Board> {
    const response = await api.get<Board>(`/boards/${id}`);
    return response.data;
  },

  async createBoard(data: BoardRequest): Promise<Board> {
    const response = await api.post<Board>("/boards", data);
    return response.data;
  },

  async updateBoard(id: string, data: BoardRequest): Promise<Board> {
    const response = await api.put<Board>(`/boards/${id}`, data);
    return response.data;
  },

  async deleteBoard(id: string): Promise<void> {
    await api.delete(`/boards/${id}`);
  },
};
