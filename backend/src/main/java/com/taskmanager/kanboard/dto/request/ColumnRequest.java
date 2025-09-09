package com.taskmanager.kanboard.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ColumnRequest {

    @NotBlank(message = "Kolon başlığı gereklidir")
    @Size(max = 100, message = "Kolon başlığı 100 karakterden uzun olamaz")
    private String title;

    private Integer position;

    // Constructors
    public ColumnRequest() {
    }

    public ColumnRequest(String title, Integer position) {
        this.title = title;
        this.position = position;
    }

    // Getters and Setters
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
}
