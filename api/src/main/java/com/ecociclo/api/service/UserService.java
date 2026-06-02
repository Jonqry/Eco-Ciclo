package com.ecociclo.api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecociclo.api.dto.UserResponseDTO;
import com.ecociclo.api.model.User;
import com.ecociclo.api.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public UserResponseDTO cadastrar(User user) {
        if(repository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado.");
        }
        User salvo = repository.save(user);
        return new UserResponseDTO(salvo);
    }

    public List<UserResponseDTO> listarTodos() {
    return repository.findAll().stream()
            .map(UserResponseDTO::new)
            .toList();
}

    public User buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public UserResponseDTO atualizar(Long id, User userAtualizado) {
        User userExistente = buscarPorId(id);
        
        userExistente.setNome(userAtualizado.getNome());
        userExistente.setEmail(userAtualizado.getEmail());
        
        User salvo = repository.save(userExistente);
        return new UserResponseDTO(salvo);
    }

    public void deletar(Long id) {
        User user = buscarPorId(id);
        repository.delete(user);
    }

    public void incrementarStreak(Long userId) {
        User user = repository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        java.time.LocalDate hoje = java.time.LocalDate.now();
        
        if (user.getUltimaAtividade() == null || user.getUltimaAtividade().plusDays(1).equals(hoje)) {
            user.setStreak(user.getStreak() + 1);
        } else if (user.getUltimaAtividade().isBefore(hoje.minusDays(1))) {
            user.setStreak(1);
        }
        
        user.setUltimaAtividade(hoje);
        repository.save(user);
    }
}