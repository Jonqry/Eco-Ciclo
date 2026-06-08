package com.ecociclo.api.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecociclo.api.dto.SchedulingDto;
import com.ecociclo.api.model.Scheduling;
import com.ecociclo.api.model.StatusEnum;
import com.ecociclo.api.model.User;
import com.ecociclo.api.model.CollectionPoint;
import com.ecociclo.api.repository.SchedulingRepository;
import com.ecociclo.api.repository.UserRepository;
import com.ecociclo.api.repository.WasteItemRepository;
import com.ecociclo.api.repository.CollectionPointRepository;

@Service
public class SchedulingService {

    @Autowired
    private SchedulingRepository schedulingRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private WasteItemRepository wasteItemRepository;

    @Autowired
    private CollectionPointRepository collectionPointRepository;

    @Transactional 
    public Scheduling createScheduling(SchedulingDto dto) {

        if (dto.getDataHora().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Não é permitido criar agendamentos em datas ou horários passados.");
        }

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        CollectionPoint ponto = collectionPointRepository.findById(dto.getPontoColetaId())
                .orElseThrow(() -> new RuntimeException("Ponto de coleta não encontrado"));

        // (Opcional) Validação da capacidade máxima do ponto
        // if ((ponto.getVolumeAtual() == null ? 0.0 : ponto.getVolumeAtual()) + dto.getQuantidade() > ponto.getCapacidadeMax()) {
        //    throw new RuntimeException("Ponto de coleta sem capacidade disponível.");
        // }

        // CORREÇÃO AQUI: Usando setVolumeAtual e getVolumeAtual
        ponto.setVolumeAtual((ponto.getVolumeAtual() == null ? 0.0 : ponto.getVolumeAtual()) + dto.getQuantidade().doubleValue());
        collectionPointRepository.save(ponto);

        int pontosBase = dto.getQuantidade() * 50;
        
        if (dto.getWasteId() != null && dto.getWasteId() == 1L) {
            pontosBase *= 2; 
        }

        user.setTotalPontos((user.getTotalPontos() == null ? 0 : user.getTotalPontos()) + pontosBase);
        user.setTotalResiduosKg((user.getTotalResiduosKg() == null ? 0 : user.getTotalResiduosKg()) + dto.getQuantidade());
        userRepository.save(user);

        Scheduling scheduling = new Scheduling();
        scheduling.setDataHora(dto.getDataHora());
        scheduling.setEnderecoColeta(dto.getEnderecoColeta());
        scheduling.setStatusEnum(StatusEnum.PENDENTE);
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