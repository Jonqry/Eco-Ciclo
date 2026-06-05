package com.ecociclo.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "rewards")
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private Integer custoPontos;

    private String codigoDesconto;

    private LocalDate validade;

    public Reward() {}

    public Reward(Long id, String titulo, Integer custoPontos,
                  String codigoDesconto, LocalDate validade) {

        this.id = id;
        this.titulo = titulo;
        this.custoPontos = custoPontos;
        this.codigoDesconto = codigoDesconto;
        this.validade = validade;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id=id;
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

}