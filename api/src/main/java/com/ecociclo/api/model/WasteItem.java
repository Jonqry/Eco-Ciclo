package com.ecociclo.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_waste_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WasteItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome do resíduo é obrigatório")
    private String nome; 

    @NotBlank(message = "O tipo do resíduo é obrigatório")
    private String tipo;

    @NotNull(message = "Informe se o resíduo é perigoso")
    private Boolean isPerigoso; 

    @NotNull(message = "O peso estimado é obrigatório")
    private Double pesoEstimado;

    private Boolean isPrioritario = false; 
}