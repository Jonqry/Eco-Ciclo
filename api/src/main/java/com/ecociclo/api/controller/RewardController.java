package com.ecociclo.api.controller;

import com.ecociclo.api.dto.RewardDTO;
import com.ecociclo.api.model.Reward;
import com.ecociclo.api.service.RewardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rewards")
@CrossOrigin("*")
public class RewardController {

    @Autowired
    private RewardService rewardService;

    @GetMapping
    public List<Reward> listarRewards(){

        return rewardService.listarRewards();

    }

    @PostMapping
    public Reward criarReward(@RequestBody RewardDTO dto){

        return rewardService.criarReward(dto);

    }

    @PostMapping("/resgatar")
    public String resgatarReward(
            @RequestParam Long pontosUsuario,
            @RequestParam Long rewardId){

        List<Reward> rewards =
                rewardService.listarRewards();

        Reward reward =
                rewards.stream()
                        .filter(r -> r.getId().equals(rewardId))
                        .findFirst()
                        .orElseThrow();

        return rewardService.resgatarReward(
                pontosUsuario,
                reward
        );

    }

}
