package com.taskmanager.kanboard.service;

import com.taskmanager.kanboard.dto.request.TaskMoveRequest;
import com.taskmanager.kanboard.dto.request.TaskRequest;
import com.taskmanager.kanboard.dto.response.TaskResponse;
import com.taskmanager.kanboard.entity.BoardColumn;
import com.taskmanager.kanboard.entity.Task;
import com.taskmanager.kanboard.exception.ResourceNotFoundException;
import com.taskmanager.kanboard.exception.UnauthorizedException;
import com.taskmanager.kanboard.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final ColumnService columnService;

    @Autowired
    public TaskService(TaskRepository taskRepository,
            ColumnService columnService) {
        this.taskRepository = taskRepository;
        this.columnService = columnService;
    }

    public TaskResponse createTask(UUID columnId, TaskRequest request, String username) {
        BoardColumn column = columnService.getColumnWithOwnershipCheck(columnId, username);

        // Set position if not provided
        Integer position = request.getPosition();
        if (position == null) {
            position = getNextPosition(columnId);
        } else {
            // Adjust positions of existing tasks
            updateTaskPositionsForInsertion(column, position);
        }

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPosition(position);
        task.setColumn(column);

        task = taskRepository.save(task);

        return convertToTaskResponse(task);
    }

    public TaskResponse updateTask(UUID id, TaskRequest request, String username) {
        Task task = getTaskWithOwnershipCheck(id, username);

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());

        // Handle position update if provided
        if (request.getPosition() != null && !request.getPosition().equals(task.getPosition())) {
            updateTaskPosition(task, request.getPosition());
        }

        task = taskRepository.save(task);

        return convertToTaskResponse(task);
    }

    public TaskResponse moveTask(UUID taskId, TaskMoveRequest request, String username) {
        Task task = getTaskWithOwnershipCheck(taskId, username);
        BoardColumn newColumn = columnService.getColumnWithOwnershipCheck(request.getColumnId(), username);

        // Verify both task and target column belong to the same board (same user)
        if (!task.getColumn().getBoard().getId().equals(newColumn.getBoard().getId())) {
            throw new UnauthorizedException("Cannot move task between different boards");
        }

        BoardColumn oldColumn = task.getColumn();

        // If moving to the same column, just update position
        if (oldColumn.getId().equals(newColumn.getId())) {
            if (!request.getPosition().equals(task.getPosition())) {
                updateTaskPosition(task, request.getPosition());
            }
        } else {
            // Moving to different column
            // Remove from old column
            updateTaskPositionsAfterRemoval(oldColumn, task.getPosition());

            // Add to new column
            updateTaskPositionsBeforeInsertion(newColumn, request.getPosition());

            task.setColumn(newColumn);
            task.setPosition(request.getPosition());
        }

        task = taskRepository.save(task);

        return convertToTaskResponse(task);
    }

    public void deleteTask(UUID id, String username) {
        Task task = getTaskWithOwnershipCheck(id, username);

        // Update positions of remaining tasks
        updateTaskPositionsAfterRemoval(task.getColumn(), task.getPosition());

        taskRepository.delete(task);
    }

    @Transactional(readOnly = true)
    public Task getTaskWithOwnershipCheck(UUID taskId, String username) {
        Task task = taskRepository.findByIdWithColumn(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + taskId));

        if (!task.getColumn().getBoard().getUser().getUsername().equals(username)) {
            throw new UnauthorizedException("You don't have permission to access this task");
        }

        return task;
    }

    private void updateTaskPosition(Task task, Integer newPosition) {
        Integer oldPosition = task.getPosition();
        BoardColumn column = task.getColumn();

        if (newPosition > oldPosition) {
            // Moving down - decrease positions of tasks between old and new position
            taskRepository.decrementPositionsBetween(column.getId(), oldPosition + 1, newPosition);
        } else if (newPosition < oldPosition) {
            // Moving up - increase positions of tasks between new and old position
            taskRepository.incrementPositionsBetween(column.getId(), newPosition, oldPosition - 1);
        }

        task.setPosition(newPosition);
    }

    private void updateTaskPositionsForInsertion(BoardColumn column, Integer position) {
        taskRepository.incrementPositionsFromPosition(column.getId(), position);
    }

    private void updateTaskPositionsAfterRemoval(BoardColumn column, Integer removedPosition) {
        taskRepository.decrementPositionsFromPosition(column.getId(), removedPosition + 1);
    }

    private void updateTaskPositionsBeforeInsertion(BoardColumn column, Integer newPosition) {
        taskRepository.incrementPositionsFromPosition(column.getId(), newPosition);
    }

    private Integer getNextPosition(UUID columnId) {
        return taskRepository.getMaxPositionByColumnId(columnId)
                .map(maxPosition -> maxPosition + 1)
                .orElse(1);
    }

    private TaskResponse convertToTaskResponse(Task task) {
        TaskResponse response = new TaskResponse();
        response.setId(task.getId());
        response.setTitle(task.getTitle());
        response.setDescription(task.getDescription());
        response.setPosition(task.getPosition());
        response.setCreatedAt(task.getCreatedAt());
        response.setUpdatedAt(task.getUpdatedAt());
        return response;
    }
}
