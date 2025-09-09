package com.taskmanager.kanboard.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TaskRequest {

    @NotBlank(message = "Task başlığı gereklidir")
    @Size(max = 200, message = "Task başlığı 200 karakterden uzun olamaz")
    private String title;

    @Size(max = 1000, message = "Açıklama 1000 karakterden uzun olamaz")
    private String description;

    private Integer position;

    // Constructors
    public TaskRequest() {
    }

    public TaskRequest(String title, String description, Integer position) {
        this.title = title;
        this.description = description;
        this.position = position;
    }

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }
}
