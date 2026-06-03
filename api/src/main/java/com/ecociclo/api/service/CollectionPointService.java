package com.ecociclo.api.service;

import com.ecociclo.api.dto.CollectionPointDto;
import com.ecociclo.api.model.CollectionPoint;
import com.ecociclo.api.repository.CollectionPointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CollectionPointService {

    @Autowired
    private CollectionPointRepository repository;

    // --- MÉTODOS DE APOIO (Lógica de Negócio) ---

    /**
     * NOVO MÉTODO: Valida se o ponto tem capacidade disponível.
     * como 'private' porque ele é usado apenas dentro desta classe.
     */
    private void validarCapacidade(CollectionPoint ponto, Double volumeAdicional) {
        if (ponto.getVolumeAtual() + volumeAdicional > ponto.getCapacidadeMax()) {
            throw new RuntimeException("Capacidade máxima excedida! O ponto '" +
                    ponto.getNomeUnidade() + "' suporta apenas mais " +
                    (ponto.getCapacidadeMax() - ponto.getVolumeAtual()) + " unidades.");
        }
    }

    // --- MÉTODOS PRINCIPAIS (CRUD) ---

    public CollectionPointDto criarPontoColeta(CollectionPointDto dto) {
        CollectionPoint collectionPoint = new CollectionPoint();
        collectionPoint.setNomeUnidade(dto.getNomeUnidade());
        collectionPoint.setEndereco(dto.getEndereco());
        collectionPoint.setLatitude(dto.getLatitude());
        collectionPoint.setLongitude(dto.getLongitude());
        collectionPoint.setCapacidadeMax(dto.getCapacidadeMax());
        collectionPoint.setVolumeAtual(dto.getVolumeAtual() != null ? dto.getVolumeAtual() : 0.0);
        collectionPoint.setTiposResiduosAceitos(dto.getTiposResiduosAceitos());

        // CHAMADA DA VALIDAÇÃO: Antes de salvar, verificamos se o volume inicial é
        // válido
        validarCapacidade(collectionPoint, 0.0);

        CollectionPoint salvo = repository.save(collectionPoint);
        return new CollectionPointDto(salvo);
    }

    public List<CollectionPointDto> listarTodosPontosColeta() {
        return repository.findAll().stream()
                .map(CollectionPointDto::new)
                .collect(Collectors.toList());
    }

    public CollectionPointDto buscarPontoColetaPorId(Long id) {
        CollectionPoint collectionPoint = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ponto de coleta não encontrado"));
        return new CollectionPointDto(collectionPoint);
    }

    public CollectionPointDto atualizarPontoColeta(Long id, CollectionPointDto dto) {
        CollectionPoint collectionPointExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ponto de coleta não encontrado"));

        collectionPointExistente.setNomeUnidade(dto.getNomeUnidade());
        collectionPointExistente.setEndereco(dto.getEndereco());
        collectionPointExistente.setLatitude(dto.getLatitude());
        collectionPointExistente.setLongitude(dto.getLongitude());
        collectionPointExistente.setCapacidadeMax(dto.getCapacidadeMax());
        collectionPointExistente.setVolumeAtual(
                dto.getVolumeAtual() != null ? dto.getVolumeAtual() : collectionPointExistente.getVolumeAtual());
        collectionPointExistente.setTiposResiduosAceitos(dto.getTiposResiduosAceitos());

        // CHAMADA DA VALIDAÇÃO: Verificamos se a atualização não quebra a regra de
        // capacidade
        validarCapacidade(collectionPointExistente, 0.0);

        CollectionPoint salvo = repository.save(collectionPointExistente);
        return new CollectionPointDto(salvo);
    }

    public void deletarPontoColeta(Long id) {
        CollectionPoint collectionPoint = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ponto de coleta não encontrado"));
        repository.delete(collectionPoint);
    }

    /**
     * NOVO MÉTODO: Para ser usado quando um resíduo for entregue.
     */
    public CollectionPointDto registrarEntradaResiduo(Long id, Double volumeEntrada) {
        CollectionPoint ponto = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ponto de coleta não encontrado"));

        // CHAMADA DA VALIDAÇÃO: Verifica se cabe o novo volume que está chegando
        validarCapacidade(ponto, volumeEntrada);

        ponto.setVolumeAtual(ponto.getVolumeAtual() + volumeEntrada);
        return new CollectionPointDto(repository.save(ponto));
    }

    // --- MÉTODOS DE BUSCA PERSONALIZADA ---

    public List<CollectionPointDto> buscarPorTipoResiduo(String tipoResiduo) {
        // Usamos o novo método do repository
        return repository.findByTiposResiduosAceitosContainingIgnoreCase(tipoResiduo).stream()
                .map(CollectionPointDto::new)
                .collect(Collectors.toList());
    }

    public List<CollectionPointDto> buscarPorLocalizacao(Double latitude, Double longitude, Double raioKm) {
        // Usamos a query matemática que adicionamos ao repository
        return repository.findByLocation(latitude, longitude, raioKm).stream()
                .map(CollectionPointDto::new)
                .collect(Collectors.toList());
    }

}
