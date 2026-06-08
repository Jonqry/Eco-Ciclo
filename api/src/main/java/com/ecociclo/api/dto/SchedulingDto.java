package com.ecociclo.api.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class SchedulingDto {
    private Long userId;
    private Long wasteId;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataHora;
    private String enderecoColeta;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getWasteId() { return wasteId; }
    public void setWasteId(Long wasteId) { this.wasteId = wasteId; }

    public LocalDateTime getDataHora() { return dataHora; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }

    public String getEnderecoColeta() { return enderecoColeta; }
    public void setEnderecoColeta(String enderecoColeta) { this.enderecoColeta = enderecoColeta; }
}