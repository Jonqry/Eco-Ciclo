package com.ecociclo.api.dto;

import com.ecociclo.api.model.User;

public record UserResponseDTO(
    Long id, 
    String nome, 
    String email, 
    Integer streak, 
    Integer totalPontos
) {
    public UserResponseDTO(User user) {
        this(
            user.getId(), 
            user.getNome(), 
            user.getEmail(), 
            user.getStreak(), 
            user.getTotalPontos()
        );
    }
}