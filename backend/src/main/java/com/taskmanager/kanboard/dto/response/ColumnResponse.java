package com.taskmanager.kanboard.dto.response;

import java.util.List;
import java.util.UUID;

public class ColumnResponse {

    private UUID id;
    private String title;
    private Integer position;
    private List<TaskResponse> tasks;

    // Constructors
    public ColumnResponse() {
    }

    public ColumnResponse(UUID id, String title, Integer position) {
        this.id = id;
        this.title = title;
        this.position = position;
    }

    public ColumnResponse(UUID id, String title, Integer position, List<TaskResponse> tasks) {
        this.id = id;
        this.title = title;
        this.position = position;
        this.tasks = tasks;
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public List<TaskResponse> getTasks() {
        return tasks;
    }

    public void setTasks(List<TaskResponse> tasks) {
        this.tasks = tasks;
    }
}
