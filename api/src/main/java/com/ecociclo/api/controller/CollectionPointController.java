package com.ecociclo.api.controller;

import com.ecociclo.api.dto.CollectionPointDto;
import com.ecociclo.api.service.CollectionPointService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collection-points")
@CrossOrigin("*") // Permite requisições de qualquer origem (para desenvolvimento)
public class CollectionPointController {

    @Autowired
    private CollectionPointService service;

    @PostMapping
    public ResponseEntity<CollectionPointDto> criarPontoColeta(@Valid @RequestBody CollectionPointDto dto) {
        CollectionPointDto novoPonto = service.criarPontoColeta(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoPonto);
    }

    @GetMapping
    public ResponseEntity<List<CollectionPointDto>> listarTodosPontosColeta() {
        List<CollectionPointDto> pontos = service.listarTodosPontosColeta();
        return ResponseEntity.ok(pontos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CollectionPointDto> buscarPontoColetaPorId(@PathVariable Long id) {
        CollectionPointDto ponto = service.buscarPontoColetaPorId(id);
        return ResponseEntity.ok(ponto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CollectionPointDto> atualizarPontoColeta(@PathVariable Long id,
            @Valid @RequestBody CollectionPointDto dto) {
        CollectionPointDto pontoAtualizado = service.atualizarPontoColeta(id, dto);
        return ResponseEntity.ok(pontoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPontoColeta(@PathVariable Long id) {
        service.deletarPontoColeta(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoints para busca por tipo de resíduo ou localização
    @GetMapping("/search/by-type")
    public ResponseEntity<List<CollectionPointDto>> buscarPorTipoResiduo(@RequestParam String tipoResiduo) {
        List<CollectionPointDto> pontos = service.buscarPorTipoResiduo(tipoResiduo);
        return ResponseEntity.ok(pontos);
    }

    @GetMapping("/search/by-location")
    public ResponseEntity<List<CollectionPointDto>> buscarPorLocalizacao(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam Double raioKm) {
        List<CollectionPointDto> pontos = service.buscarPorLocalizacao(latitude, longitude, raioKm);
        return ResponseEntity.ok(pontos);
    }
}