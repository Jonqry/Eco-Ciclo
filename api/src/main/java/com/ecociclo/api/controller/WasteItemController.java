package com.ecociclo.api.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecociclo.api.dto.WasteItemResponseDTO;
import com.ecociclo.api.model.WasteItem;
import com.ecociclo.api.service.WasteItemService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/waste-items")
public class WasteItemController {

    @Autowired
    private WasteItemService service;

    @PostMapping
    public ResponseEntity<WasteItemResponseDTO> cadastrar(@RequestBody @Valid WasteItem item) {
        WasteItemResponseDTO novoItem = service.cadastrar(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoItem);
    }

    @GetMapping
    public ResponseEntity<List<WasteItemResponseDTO>> listarTodos() {
        List<WasteItemResponseDTO> lista = service.listarTodos();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WasteItemResponseDTO> buscarPorId(@PathVariable Long id) {
        WasteItem item = service.buscarPorId(id);
        return ResponseEntity.ok(new WasteItemResponseDTO(item));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WasteItemResponseDTO> atualizar(@PathVariable Long id, @RequestBody @Valid WasteItem itemAtualizado) {
        WasteItemResponseDTO itemSalvo = service.atualizar(id, itemAtualizado);
        return ResponseEntity.ok(itemSalvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}