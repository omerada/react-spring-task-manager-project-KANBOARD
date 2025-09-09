import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Board } from "../../types/board";
import { KanbanColumn } from "./KanbanColumn";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";

interface KanbanBoardProps {
  board: Board;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ board }) => {
  const { handleDragStart, handleDragEnd, handleDrop } = useDragAndDrop(
    board.id
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex space-x-6 overflow-x-auto pb-6">
        {board.columns
          .sort((a, b) => a.position - b.position)
          .map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              boardId={board.id}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
            />
          ))}
      </div>
    </DndProvider>
  );
};
