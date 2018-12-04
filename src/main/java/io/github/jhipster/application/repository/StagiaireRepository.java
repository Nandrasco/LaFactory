package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Stagiaire;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Stagiaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StagiaireRepository extends JpaRepository<Stagiaire, Long> {

    @Query(value = "select distinct stagiaire from Stagiaire stagiaire left join fetch stagiaire.salles",
        countQuery = "select count(distinct stagiaire) from Stagiaire stagiaire")
    Page<Stagiaire> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct stagiaire from Stagiaire stagiaire left join fetch stagiaire.salles")
    List<Stagiaire> findAllWithEagerRelationships();

    @Query("select stagiaire from Stagiaire stagiaire left join fetch stagiaire.salles where stagiaire.id =:id")
    Optional<Stagiaire> findOneWithEagerRelationships(@Param("id") Long id);

}
