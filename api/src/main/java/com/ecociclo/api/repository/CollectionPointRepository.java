package com.ecociclo.api.repository;

import com.ecociclo.api.model.CollectionPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectionPointRepository extends JpaRepository<CollectionPoint, Long> {

    /**
     * Busca pontos que aceitam um determinado tipo de resíduo.
     * O 'Containing' faz uma busca parcial (como o LIKE do SQL).
     */
    List<CollectionPoint> findByTiposResiduosAceitosContainingIgnoreCase(String tipoResiduo);

    /**
     * Busca pontos de coleta próximos a uma coordenada (latitude/longitude).
     * Esta é uma fórmula matemática (Haversine) para calcular distância em KM no
     * SQL.
     */
    @Query(value = "SELECT * FROM tb_collection_points p WHERE " +
            "(6371 * acos(cos(radians(:lat)) * cos(radians(p.latitude)) * " +
            "cos(radians(p.longitude) - radians(:lng)) + sin(radians(:lat)) * " +
            "sin(radians(p.latitude)))) <= :distance", nativeQuery = true)
    List<CollectionPoint> findByLocation(
            @Param("lat") Double lat,
            @Param("lng") Double lng,
            @Param("distance") Double distance);
}
