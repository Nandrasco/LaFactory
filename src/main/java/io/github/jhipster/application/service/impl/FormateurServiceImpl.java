package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.FormateurService;
import io.github.jhipster.application.domain.Formateur;
import io.github.jhipster.application.repository.FormateurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing Formateur.
 */
@Service
@Transactional
public class FormateurServiceImpl implements FormateurService {

    private final Logger log = LoggerFactory.getLogger(FormateurServiceImpl.class);

    private final FormateurRepository formateurRepository;

    public FormateurServiceImpl(FormateurRepository formateurRepository) {
        this.formateurRepository = formateurRepository;
    }

    /**
     * Save a formateur.
     *
     * @param formateur the entity to save
     * @return the persisted entity
     */
    @Override
    public Formateur save(Formateur formateur) {
        log.debug("Request to save Formateur : {}", formateur);
        return formateurRepository.save(formateur);
    }

    /**
     * Get all the formateurs.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Formateur> findAll() {
        log.debug("Request to get all Formateurs");
        return formateurRepository.findAll();
    }



    /**
     *  get all the formateurs where Adresse is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Formateur> findAllWhereAdresseIsNull() {
        log.debug("Request to get all formateurs where Adresse is null");
        return StreamSupport
            .stream(formateurRepository.findAll().spliterator(), false)
            .filter(formateur -> formateur.getAdresse() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one formateur by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Formateur> findOne(Long id) {
        log.debug("Request to get Formateur : {}", id);
        return formateurRepository.findById(id);
    }

    /**
     * Delete the formateur by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Formateur : {}", id);
        formateurRepository.deleteById(id);
    }
}
