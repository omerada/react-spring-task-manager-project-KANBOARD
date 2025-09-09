package com.taskmanager.kanboard.service;

import com.taskmanager.kanboard.dto.request.BoardRequest;
import com.taskmanager.kanboard.dto.response.BoardResponse;
import com.taskmanager.kanboard.dto.response.ColumnResponse;
import com.taskmanager.kanboard.entity.Board;
import com.taskmanager.kanboard.entity.BoardColumn;
import com.taskmanager.kanboard.entity.User;
import com.taskmanager.kanboard.exception.ResourceNotFoundException;
import com.taskmanager.kanboard.exception.UnauthorizedException;
import com.taskmanager.kanboard.repository.BoardRepository;
import com.taskmanager.kanboard.repository.ColumnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;
    private final ColumnRepository columnRepository;
    private final AuthService authService;

    @Autowired
    public BoardService(BoardRepository boardRepository,
            ColumnRepository columnRepository,
            AuthService authService) {
        this.boardRepository = boardRepository;
        this.columnRepository = columnRepository;
        this.authService = authService;
    }

    @Transactional(readOnly = true)
    public List<BoardResponse> getUserBoards(String username) {
        User user = authService.getCurrentUser(username);

        List<Board> boards = boardRepository.findByUserOrderByCreatedAtDesc(user);

        return boards.stream()
                .map(this::convertToBoardResponse)
                .collect(Collectors.toList());
    }

    public BoardResponse createBoard(BoardRequest request, String username) {
        User user = authService.getCurrentUser(username);

        Board board = new Board();
        board.setName(request.getName());
        board.setUser(user);

        board = boardRepository.save(board);

        // Create default columns
        createDefaultColumns(board);

        // Reload board with columns
        board = boardRepository.findByIdWithColumns(board.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Board not found after creation"));

        return convertToBoardResponse(board);
    }

    @Transactional(readOnly = true)
    public BoardResponse getBoardById(UUID id, String username) {
        Board board = getBoardWithOwnershipCheck(id, username);
        return convertToBoardResponse(board);
    }

    public BoardResponse updateBoard(UUID id, BoardRequest request, String username) {
        Board board = getBoardWithOwnershipCheck(id, username);

        board.setName(request.getName());
        board = boardRepository.save(board);

        return convertToBoardResponse(board);
    }

    public void deleteBoard(UUID id, String username) {
        Board board = getBoardWithOwnershipCheck(id, username);
        boardRepository.delete(board);
    }

    public void verifyBoardOwnership(UUID boardId, String username) {
        getBoardWithOwnershipCheck(boardId, username);
    }

    private Board getBoardWithOwnershipCheck(UUID boardId, String username) {
        Board board = boardRepository.findByIdWithColumns(boardId)
                .orElseThrow(() -> new ResourceNotFoundException("Board not found with id: " + boardId));

        if (!board.getUser().getUsername().equals(username)) {
            throw new UnauthorizedException("You don't have permission to access this board");
        }

        return board;
    }

    private void createDefaultColumns(Board board) {
        BoardColumn todoColumn = new BoardColumn("To Do", 1, board);
        BoardColumn inProgressColumn = new BoardColumn("In Progress", 2, board);
        BoardColumn doneColumn = new BoardColumn("Done", 3, board);

        columnRepository.saveAll(Arrays.asList(todoColumn, inProgressColumn, doneColumn));
    }

    private BoardResponse convertToBoardResponse(Board board) {
        BoardResponse response = new BoardResponse();
        response.setId(board.getId());
        response.setName(board.getName());
        response.setCreatedAt(board.getCreatedAt());

        List<ColumnResponse> columnResponses = board.getColumns().stream()
                .map(this::convertToColumnResponse)
                .collect(Collectors.toList());

        response.setColumns(columnResponses);

        return response;
    }

    private ColumnResponse convertToColumnResponse(BoardColumn column) {
        ColumnResponse response = new ColumnResponse();
        response.setId(column.getId());
        response.setTitle(column.getTitle());
        response.setPosition(column.getPosition());

        // Tasks will be populated by TaskService when needed
        response.setTasks(column.getTasks().stream()
                .map(task -> {
                    var taskResponse = new com.taskmanager.kanboard.dto.response.TaskResponse();
                    taskResponse.setId(task.getId());
                    taskResponse.setTitle(task.getTitle());
                    taskResponse.setDescription(task.getDescription());
                    taskResponse.setPosition(task.getPosition());
                    taskResponse.setCreatedAt(task.getCreatedAt());
                    taskResponse.setUpdatedAt(task.getUpdatedAt());
                    return taskResponse;
                })
                .collect(Collectors.toList()));

        return response;
    }
}
