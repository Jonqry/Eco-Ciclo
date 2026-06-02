package com.ecociclo.api.controller;

import com.ecociclo.api.dto.SchedulingDto;
import com.ecociclo.api.model.Scheduling;
import com.ecociclo.api.service.SchedulingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
public class SchedulingController {

    @Autowired
    private SchedulingService schedulingService;

    @PostMapping
    public ResponseEntity<Scheduling> create(@RequestBody SchedulingDto dto) {
        try {
            Scheduling newScheduling = schedulingService.createScheduling(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(newScheduling);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Scheduling>> getHistory() {
        List<Scheduling> history = schedulingService.getAllSchedulings();
        return ResponseEntity.ok(history);
    }
}
