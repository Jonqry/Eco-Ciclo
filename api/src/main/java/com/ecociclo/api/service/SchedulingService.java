package com.ecociclo.api.service;

import com.ecociclo.api.dto.SchedulingDto;
import com.ecociclo.api.model.Scheduling;
import com.ecociclo.api.model.StatusEnum;
import com.ecociclo.api.model.User;
import com.ecociclo.api.model.WasteItem;
import com.ecociclo.api.repository.SchedulingRepository;
import com.ecociclo.api.repository.UserRepository;
import com.ecociclo.api.repository.WasteItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SchedulingService {

    @Autowired
    private SchedulingRepository schedulingRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private WasteItemRepository wasteItemRepository;

    public Scheduling createScheduling(SchedulingDto dto) {
        
        if (dto.getDataHora().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("A data e hora do agendamento não podem ser no passado.");
        }

        Scheduling scheduling = new Scheduling();
        scheduling.setDataHora(dto.getDataHora());
        scheduling.setEnderecoColeta(dto.getEnderecoColeta());
        scheduling.setStatusEnum(StatusEnum.PENDENTE);

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        WasteItem wasteItem = wasteItemRepository.findById(dto.getWasteId())
                .orElseThrow(() -> new RuntimeException("Resíduo não encontrado"));

        scheduling.setUser(user);
        scheduling.setWasteItem(wasteItem);

        return schedulingRepository.save(scheduling);
    }

    public List<Scheduling> getAllSchedulings() {
        return schedulingRepository.findAll();
    }
}
