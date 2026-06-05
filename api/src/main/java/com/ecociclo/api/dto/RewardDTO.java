package com.ecociclo.api.dto;

import java.time.LocalDate;

public class RewardDTO {

    private Long userId;

    private String titulo;

    private Integer custoPontos;

    private String codigoDesconto;

    private LocalDate validade;

    private String categoria;

    public RewardDTO(){}

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId=userId;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo=titulo;
    }

    public Integer getCustoPontos() {
        return custoPontos;
    }

    public void setCustoPontos(Integer custoPontos) {
        this.custoPontos=custoPontos;
    }

    public String getCodigoDesconto() {
        return codigoDesconto;
    }

    public void setCodigoDesconto(String codigoDesconto) {
        this.codigoDesconto=codigoDesconto;
    }

    public LocalDate getValidade() {
        return validade;
    }

    public void setValidade(LocalDate validade) {
        this.validade=validade;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria){
        this.categoria=categoria;
    }

}