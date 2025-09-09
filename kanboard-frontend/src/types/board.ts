import { Column } from "./column";

export interface Board {
  id: string;
  name: string;
  createdAt: string;
  columns: Column[];
}

export interface BoardRequest {
  name: string;
}

export interface CreateBoardData {
  name: string;
}
