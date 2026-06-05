package com.ecociclo.api.service;

import com.ecociclo.api.dto.RewardDTO;
import com.ecociclo.api.model.Reward;
import com.ecociclo.api.repository.RewardRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RewardService {

    @Autowired
    private RewardRepository rewardRepository;

    public List<Reward> listarRewards(){

        return rewardRepository.findAll();

    }

    public Reward criarReward(RewardDTO dto){

        Reward reward = new Reward();

        reward.setTitulo(dto.getTitulo());
        reward.setCustoPontos(dto.getCustoPontos());
        reward.setCodigoDesconto(dto.getCodigoDesconto());
        reward.setValidade(dto.getValidade());

        return rewardRepository.save(reward);

    }

    public String resgatarReward(Long userPoints, Reward reward){

        if(userPoints < reward.getCustoPontos()){

            return "Pontos insuficientes";

        }

        return "Recompensa resgatada com sucesso";

    }

    public Integer calcularPontos(Integer pontosBase, String categoria){

        if(categoria != null &&
           categoria.equalsIgnoreCase("óleo")){

            return pontosBase * 2;

        }

        return pontosBase;

    }

}