package com.taskmanager.kanboard.controller;

import com.taskmanager.kanboard.dto.request.ColumnRequest;
import com.taskmanager.kanboard.dto.response.ColumnResponse;
import com.taskmanager.kanboard.service.ColumnService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
@PreAuthorize("hasRole('USER')")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ColumnController {

    private final ColumnService columnService;

    @Autowired
    public ColumnController(ColumnService columnService) {
        this.columnService = columnService;
    }

    @PostMapping("/boards/{boardId}/columns")
    public ResponseEntity<ColumnResponse> createColumn(@PathVariable UUID boardId,
            @Valid @RequestBody ColumnRequest request,
            Authentication authentication) {
        String username = authentication.getName();
        ColumnResponse column = columnService.createColumn(boardId, request, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(column);
    }

    @PutMapping("/columns/{id}")
    public ResponseEntity<ColumnResponse> updateColumn(@PathVariable UUID id,
            @Valid @RequestBody ColumnRequest request,
            Authentication authentication) {
        String username = authentication.getName();
        ColumnResponse column = columnService.updateColumn(id, request, username);
        return ResponseEntity.ok(column);
    }

    @DeleteMapping("/columns/{id}")
    public ResponseEntity<Void> deleteColumn(@PathVariable UUID id,
            Authentication authentication) {
        String username = authentication.getName();
        columnService.deleteColumn(id, username);
        return ResponseEntity.noContent().build();
    }
}
