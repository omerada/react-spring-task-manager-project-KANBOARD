package com.taskmanager.kanboard.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class BoardRequest {

    @NotBlank(message = "Board adı gereklidir")
    @Size(max = 100, message = "Board adı 100 karakterden uzun olamaz")
    private String name;

    // Constructors
    public BoardRequest() {
    }

    public BoardRequest(String name) {
        this.name = name;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
