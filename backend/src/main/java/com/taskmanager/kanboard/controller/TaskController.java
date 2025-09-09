package com.taskmanager.kanboard.controller;

import com.taskmanager.kanboard.dto.request.TaskMoveRequest;
import com.taskmanager.kanboard.dto.request.TaskRequest;
import com.taskmanager.kanboard.dto.response.TaskResponse;
import com.taskmanager.kanboard.service.TaskService;
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
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/columns/{columnId}/tasks")
    public ResponseEntity<TaskResponse> createTask(@PathVariable UUID columnId,
            @Valid @RequestBody TaskRequest request,
            Authentication authentication) {
        String username = authentication.getName();
        TaskResponse task = taskService.createTask(columnId, request, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @PutMapping("/tasks/{id}")
    public ResponseEntity<TaskResponse> updateTask(@PathVariable UUID id,
            @Valid @RequestBody TaskRequest request,
            Authentication authentication) {
        String username = authentication.getName();
        TaskResponse task = taskService.updateTask(id, request, username);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/tasks/{id}/move")
    public ResponseEntity<TaskResponse> moveTask(@PathVariable UUID id,
            @Valid @RequestBody TaskMoveRequest request,
            Authentication authentication) {
        String username = authentication.getName();
        TaskResponse task = taskService.moveTask(id, request, username);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable UUID id,
            Authentication authentication) {
        String username = authentication.getName();
        taskService.deleteTask(id, username);
        return ResponseEntity.noContent().build();
    }
}
