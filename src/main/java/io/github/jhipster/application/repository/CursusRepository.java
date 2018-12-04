package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Cursus;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cursus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CursusRepository extends JpaRepository<Cursus, Long> {

}
