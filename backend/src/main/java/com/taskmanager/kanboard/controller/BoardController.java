package com.taskmanager.kanboard.controller;

import com.taskmanager.kanboard.dto.request.BoardRequest;
import com.taskmanager.kanboard.dto.response.BoardResponse;
import com.taskmanager.kanboard.service.BoardService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/boards")
@PreAuthorize("hasRole('USER')")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BoardController {

    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping
    public ResponseEntity<List<BoardResponse>> getUserBoards(Authentication authentication) {
        String username = authentication.getName();
        List<BoardResponse> boards = boardService.getUserBoards(username);
        return ResponseEntity.ok(boards);
    }

    @PostMapping
    public ResponseEntity<BoardResponse> createBoard(@Valid @RequestBody BoardRequest request,
            Authentication authentication) {
        String username = authentication.getName();
        BoardResponse board = boardService.createBoard(request, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(board);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardResponse> getBoardById(@PathVariable UUID id,
            Authentication authentication) {
        String username = authentication.getName();
        BoardResponse board = boardService.getBoardById(id, username);
        return ResponseEntity.ok(board);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BoardResponse> updateBoard(@PathVariable UUID id,
            @Valid @RequestBody BoardRequest request,
            Authentication authentication) {
        String username = authentication.getName();
        BoardResponse board = boardService.updateBoard(id, request, username);
        return ResponseEntity.ok(board);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable UUID id,
            Authentication authentication) {
        String username = authentication.getName();
        boardService.deleteBoard(id, username);
        return ResponseEntity.noContent().build();
    }
}
