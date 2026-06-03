package com.ecociclo.api.dto;

import com.ecociclo.api.model.CollectionPoint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CollectionPointDto {

    private Long id;

    @NotBlank(message = "O nome da unidade é obrigatório")
    private String nomeUnidade;

    @NotBlank(message = "O endereço é obrigatório")
    private String endereco;

    @NotNull(message = "A latitude é obrigatória")
    private Double latitude;

    @NotNull(message = "A longitude é obrigatória")
    private Double longitude;

    @NotNull(message = "A capacidade máxima é obrigatória")
    private Double capacidadeMax;

    private Double volumeAtual;

    private String tiposResiduosAceitos;

    // Construtor para converter de entidade para DTO (opcional, mas útil para
    // respostas)
    public CollectionPointDto(CollectionPoint collectionPoint) {
        this.id = collectionPoint.getId();
        this.nomeUnidade = collectionPoint.getNomeUnidade();
        this.endereco = collectionPoint.getEndereco();
        this.latitude = collectionPoint.getLatitude();
        this.longitude = collectionPoint.getLongitude();
        this.capacidadeMax = collectionPoint.getCapacidadeMax();
        this.volumeAtual = collectionPoint.getVolumeAtual();
        this.tiposResiduosAceitos = collectionPoint.getTiposResiduosAceitos();
    }
}