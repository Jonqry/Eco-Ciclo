package com.ecociclo.api.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ecociclo.api.model.CollectionPoint;
import com.ecociclo.api.repository.CollectionPointRepository;

@Component
public class CollectionSimulationTask {

    @Autowired
    private CollectionPointRepository repository;

    @Scheduled(fixedRate = 60000) 
    public void simularCaminhaoDeColeta() {
        System.out.println("🚛 [EcoCiclo] O camião de recolha está a passar... A esvaziar os pontos!");

        List<CollectionPoint> pontos = repository.findAll();
        boolean houveAlteracao = false;
        
        for (CollectionPoint ponto : pontos) {
            if (ponto.getVolumeAtual() != null && ponto.getVolumeAtual() > 0) {
                
                ponto.setVolumeAtual(ponto.getVolumeAtual() / 3);
                houveAlteracao = true;
            }
        }
        
        if (houveAlteracao) {
            repository.saveAll(pontos);
            System.out.println("✅ [EcoCiclo] Os pontos de recolha foram esvaziados com sucesso!");
        } else {
            System.out.println("ℹ️ [EcoCiclo] Nenhum volume para recolher neste momento.");
        }
    }
}