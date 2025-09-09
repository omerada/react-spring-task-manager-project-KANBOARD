package com.taskmanager.kanboard.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class TaskMoveRequest {

    @NotNull(message = "Kolon ID gereklidir")
    private UUID columnId;

    @NotNull(message = "Pozisyon gereklidir")
    private Integer position;

    // Constructors
    public TaskMoveRequest() {
    }

    public TaskMoveRequest(UUID columnId, Integer position) {
        this.columnId = columnId;
        this.position = position;
    }

    // Getters and Setters
    public UUID getColumnId() {
        return columnId;
    }

    public void setColumnId(UUID columnId) {
        this.columnId = columnId;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }
}
