package com.ecociclo.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecociclo.api.dto.WasteItemResponseDTO;
import com.ecociclo.api.model.WasteItem;
import com.ecociclo.api.repository.WasteItemRepository;

@Service
public class WasteItemService {

    @Autowired
    private WasteItemRepository repository;

    private void classificarPrioridade(WasteItem item) {
        if (item.getTipo() != null && item.getTipo().equalsIgnoreCase("eletrônico")) {
            item.setIsPrioritario(true);
        } else {
            item.setIsPrioritario(false);
        }
    }

    public WasteItemResponseDTO cadastrar(WasteItem item) {
        classificarPrioridade(item);
        
        WasteItem salvo = repository.save(item);
        return new WasteItemResponseDTO(salvo);
    }

    public List<WasteItemResponseDTO> listarTodos() {
        return repository.findAll().stream()
                .map(WasteItemResponseDTO::new)
                .toList();
    }

    public WasteItem buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resíduo não encontrado."));
    }

    public WasteItemResponseDTO atualizar(Long id, WasteItem itemAtualizado) {
        WasteItem itemExistente = buscarPorId(id);
        
        itemExistente.setNome(itemAtualizado.getNome());
        itemExistente.setTipo(itemAtualizado.getTipo());
        itemExistente.setIsPerigoso(itemAtualizado.getIsPerigoso());
        itemExistente.setPesoEstimado(itemAtualizado.getPesoEstimado());
        
        classificarPrioridade(itemExistente);
        
        WasteItem salvo = repository.save(itemExistente);
        return new WasteItemResponseDTO(salvo);
    }

    public void deletar(Long id) {
        WasteItem item = buscarPorId(id);
        repository.delete(item);
    }
}