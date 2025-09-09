import api from "./api";
import { Board, BoardRequest } from "../types/board";
import { mockBoardService } from "../mocks/mockBoardService";

const isUsingMockApi = process.env.REACT_APP_MOCK_API === "true";

export const boardService = {
  async getBoards(): Promise<Board[]> {
    if (isUsingMockApi) {
      return mockBoardService.getBoards();
    }
    const response = await api.get<Board[]>("/boards");
    return response.data;
  },

  async getBoardById(id: string): Promise<Board> {
    if (isUsingMockApi) {
      const board = await mockBoardService.getBoardById(id);
      if (!board) {
        throw new Error("Board not found");
      }
      return board;
    }
    const response = await api.get<Board>(`/boards/${id}`);
    return response.data;
  },

  async createBoard(data: BoardRequest): Promise<Board> {
    if (isUsingMockApi) {
      return mockBoardService.createBoard(data);
    }
    const response = await api.post<Board>("/boards", data);
    return response.data;
  },

  async updateBoard(id: string, data: BoardRequest): Promise<Board> {
    if (isUsingMockApi) {
      const board = await mockBoardService.updateBoard(id, data);
      if (!board) {
        throw new Error("Board not found");
      }
      return board;
    }
    const response = await api.put<Board>(`/boards/${id}`, data);
    return response.data;
  },

  async deleteBoard(id: string): Promise<void> {
    if (isUsingMockApi) {
      const success = await mockBoardService.deleteBoard(id);
      if (!success) {
        throw new Error("Board not found");
      }
      return;
    }
    await api.delete(`/boards/${id}`);
  },
};
