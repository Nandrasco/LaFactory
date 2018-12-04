package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Adresse;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Adresse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdresseRepository extends JpaRepository<Adresse, Long> {

}
