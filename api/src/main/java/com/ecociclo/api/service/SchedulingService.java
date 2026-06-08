package com.ecociclo.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecociclo.api.dto.SchedulingDto;
import com.ecociclo.api.model.Scheduling;
import com.ecociclo.api.model.StatusEnum;
import com.ecociclo.api.model.User;
import com.ecociclo.api.repository.SchedulingRepository;
import com.ecociclo.api.repository.UserRepository;
import com.ecociclo.api.repository.WasteItemRepository;

@Service
public class SchedulingService {

    @Autowired
    private SchedulingRepository schedulingRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private WasteItemRepository wasteItemRepository;

    public Scheduling createScheduling(SchedulingDto dto) {

        Scheduling scheduling = new Scheduling();
        scheduling.setDataHora(dto.getDataHora());
        scheduling.setEnderecoColeta(dto.getEnderecoColeta());
        scheduling.setStatusEnum(StatusEnum.PENDENTE);

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        scheduling.setUser(user);

        if (dto.getWasteId() != null) {
            wasteItemRepository.findById(dto.getWasteId()).ifPresent(scheduling::setWasteItem);
        }

        return schedulingRepository.save(scheduling);
    }

    public List<Scheduling> getAllSchedulings() {
        return schedulingRepository.findAll();
    }
}