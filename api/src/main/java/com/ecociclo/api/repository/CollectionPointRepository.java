package com.ecociclo.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecociclo.api.model.CollectionPoint;

@Repository
public interface CollectionPointRepository extends JpaRepository<CollectionPoint, Long> {
    List<CollectionPoint> findByTiposResiduosAceitosContainingIgnoreCase(String tipoResiduo);

    @Query(value = "SELECT * FROM tb_collection_points p WHERE " +
            "(6371 * acos(cos(radians(:lat)) * cos(radians(p.latitude)) * " +
            "cos(radians(p.longitude) - radians(:lng)) + sin(radians(:lat)) * " +
            "sin(radians(p.latitude)))) <= :distance", nativeQuery = true)
    List<CollectionPoint> findByLocation(
            @Param("lat") Double lat,
            @Param("lng") Double lng,
            @Param("distance") Double distance);
}
