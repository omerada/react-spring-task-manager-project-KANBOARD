package com.taskmanager.kanboard.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class BoardResponse {

    private UUID id;
    private String name;
    private LocalDateTime createdAt;
    private List<ColumnResponse> columns;

    // Constructors
    public BoardResponse() {
    }

    public BoardResponse(UUID id, String name, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
    }

    public BoardResponse(UUID id, String name, LocalDateTime createdAt, List<ColumnResponse> columns) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.columns = columns;
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<ColumnResponse> getColumns() {
        return columns;
    }

    public void setColumns(List<ColumnResponse> columns) {
        this.columns = columns;
    }
}
