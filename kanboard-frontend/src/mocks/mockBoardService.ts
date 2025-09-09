import { mockBoards } from "../mocks/data";
import { delay, generateId } from "../mocks/utils";
import { Board, BoardRequest } from "../types/board";

class MockBoardService {
  private boards = [...mockBoards];

  async getBoards(): Promise<Board[]> {
    await delay(300);
    return this.boards;
  }

  async getBoardById(id: string): Promise<Board | null> {
    await delay(200);
    return this.boards.find((board) => board.id === id) || null;
  }

  async createBoard(boardData: BoardRequest): Promise<Board> {
    await delay(400);

    const newBoard: Board = {
      id: generateId(),
      name: boardData.name,
      createdAt: new Date().toISOString(),
      columns: [
        {
          id: generateId(),
          title: "Yapılacaklar",
          position: 0,
          tasks: [],
        },
        {
          id: generateId(),
          title: "Devam Eden",
          position: 1,
          tasks: [],
        },
        {
          id: generateId(),
          title: "Tamamlandı",
          position: 2,
          tasks: [],
        },
      ],
    };

    this.boards.push(newBoard);
    return newBoard;
  }

  async updateBoard(
    id: string,
    boardData: Partial<BoardRequest>
  ): Promise<Board | null> {
    await delay(300);

    const boardIndex = this.boards.findIndex((board) => board.id === id);
    if (boardIndex === -1) return null;

    this.boards[boardIndex] = {
      ...this.boards[boardIndex],
      ...boardData,
    };

    return this.boards[boardIndex];
  }

  async deleteBoard(id: string): Promise<boolean> {
    await delay(300);

    const boardIndex = this.boards.findIndex((board) => board.id === id);
    if (boardIndex === -1) return false;

    this.boards.splice(boardIndex, 1);
    return true;
  }
}

export const mockBoardService = new MockBoardService();
