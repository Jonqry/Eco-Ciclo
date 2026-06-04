package com.ecociclo.api.dto;

import com.ecociclo.api.model.WasteItem;

public record WasteItemResponseDTO(
    Long id, 
    String nome, 
    String tipo, 
    Boolean isPerigoso, 
    Double pesoEstimado,
    Boolean isPrioritario 
) {
    public WasteItemResponseDTO(WasteItem item) {
        this(
            item.getId(), 
            item.getNome(), 
            item.getTipo(), 
            item.getIsPerigoso(), 
            item.getPesoEstimado(),
            item.getIsPrioritario() 
        );
    }
}