package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Formateur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Formateur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormateurRepository extends JpaRepository<Formateur, Long> {

    @Query(value = "select distinct formateur from Formateur formateur left join fetch formateur.salles",
        countQuery = "select count(distinct formateur) from Formateur formateur")
    Page<Formateur> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct formateur from Formateur formateur left join fetch formateur.salles")
    List<Formateur> findAllWithEagerRelationships();

    @Query("select formateur from Formateur formateur left join fetch formateur.salles where formateur.id =:id")
    Optional<Formateur> findOneWithEagerRelationships(@Param("id") Long id);

}
