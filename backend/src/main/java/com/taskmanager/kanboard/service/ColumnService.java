package com.taskmanager.kanboard.service;

import com.taskmanager.kanboard.dto.request.ColumnRequest;
import com.taskmanager.kanboard.dto.response.ColumnResponse;
import com.taskmanager.kanboard.dto.response.TaskResponse;
import com.taskmanager.kanboard.entity.Board;
import com.taskmanager.kanboard.entity.BoardColumn;
import com.taskmanager.kanboard.exception.ResourceNotFoundException;
import com.taskmanager.kanboard.exception.UnauthorizedException;
import com.taskmanager.kanboard.repository.BoardRepository;
import com.taskmanager.kanboard.repository.ColumnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class ColumnService {

    private final ColumnRepository columnRepository;
    private final BoardRepository boardRepository;
    private final BoardService boardService;

    @Autowired
    public ColumnService(ColumnRepository columnRepository,
            BoardRepository boardRepository,
            BoardService boardService) {
        this.columnRepository = columnRepository;
        this.boardRepository = boardRepository;
        this.boardService = boardService;
    }

    public ColumnResponse createColumn(UUID boardId, ColumnRequest request, String username) {
        // Verify board ownership
        boardService.verifyBoardOwnership(boardId, username);

        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new ResourceNotFoundException("Board not found with id: " + boardId));

        // Set position if not provided
        Integer position = request.getPosition();
        if (position == null) {
            position = getNextPosition(boardId);
        } else {
            // Adjust positions of existing columns
            updateColumnPositionsForInsertion(boardId, position);
        }

        BoardColumn column = new BoardColumn();
        column.setTitle(request.getTitle());
        column.setPosition(position);
        column.setBoard(board);

        column = columnRepository.save(column);

        return convertToColumnResponse(column);
    }

    public ColumnResponse updateColumn(UUID id, ColumnRequest request, String username) {
        BoardColumn column = getColumnWithOwnershipCheck(id, username);

        column.setTitle(request.getTitle());

        // Handle position update if provided
        if (request.getPosition() != null && !request.getPosition().equals(column.getPosition())) {
            updateColumnPosition(column, request.getPosition());
        }

        column = columnRepository.save(column);

        return convertToColumnResponse(column);
    }

    public void deleteColumn(UUID id, String username) {
        BoardColumn column = getColumnWithOwnershipCheck(id, username);

        // Update positions of remaining columns
        updateColumnPositionsAfterDeletion(column.getBoard().getId(), column.getPosition());

        columnRepository.delete(column);
    }

    @Transactional(readOnly = true)
    public BoardColumn getColumnWithOwnershipCheck(UUID columnId, String username) {
        BoardColumn column = columnRepository.findByIdWithBoard(columnId)
                .orElseThrow(() -> new ResourceNotFoundException("Column not found with id: " + columnId));

        if (!column.getBoard().getUser().getUsername().equals(username)) {
            throw new UnauthorizedException("You don't have permission to access this column");
        }

        return column;
    }

    private void updateColumnPosition(BoardColumn column, Integer newPosition) {
        Integer oldPosition = column.getPosition();
        UUID boardId = column.getBoard().getId();

        if (newPosition > oldPosition) {
            // Moving down - decrease positions of columns between old and new position
            columnRepository.decrementPositionsBetween(boardId, oldPosition + 1, newPosition);
        } else if (newPosition < oldPosition) {
            // Moving up - increase positions of columns between new and old position
            columnRepository.incrementPositionsBetween(boardId, newPosition, oldPosition - 1);
        }

        column.setPosition(newPosition);
    }

    private void updateColumnPositionsForInsertion(UUID boardId, Integer position) {
        columnRepository.incrementPositionsFromPosition(boardId, position);
    }

    private void updateColumnPositionsAfterDeletion(UUID boardId, Integer deletedPosition) {
        columnRepository.decrementPositionsFromPosition(boardId, deletedPosition + 1);
    }

    private Integer getNextPosition(UUID boardId) {
        return columnRepository.getMaxPositionByBoardId(boardId)
                .map(maxPosition -> maxPosition + 1)
                .orElse(1);
    }

    private ColumnResponse convertToColumnResponse(BoardColumn column) {
        ColumnResponse response = new ColumnResponse();
        response.setId(column.getId());
        response.setTitle(column.getTitle());
        response.setPosition(column.getPosition());

        List<TaskResponse> taskResponses = column.getTasks().stream()
                .map(task -> {
                    TaskResponse taskResponse = new TaskResponse();
                    taskResponse.setId(task.getId());
                    taskResponse.setTitle(task.getTitle());
                    taskResponse.setDescription(task.getDescription());
                    taskResponse.setPosition(task.getPosition());
                    taskResponse.setCreatedAt(task.getCreatedAt());
                    taskResponse.setUpdatedAt(task.getUpdatedAt());
                    return taskResponse;
                })
                .collect(Collectors.toList());

        response.setTasks(taskResponses);

        return response;
    }
}
