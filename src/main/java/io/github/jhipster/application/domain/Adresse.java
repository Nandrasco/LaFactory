package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Adresse.
 */
@Entity
@Table(name = "adresse")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Adresse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne    @JoinColumn(unique = true)
    private Stagiaire stagiaire;

    @OneToOne    @JoinColumn(unique = true)
    private Formateur formateur;

    @OneToOne    @JoinColumn(unique = true)
    private Technicien technicien;

    @OneToOne    @JoinColumn(unique = true)
    private Gestionnaire gestionnaire;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Stagiaire getStagiaire() {
        return stagiaire;
    }

    public Adresse stagiaire(Stagiaire stagiaire) {
        this.stagiaire = stagiaire;
        return this;
    }

    public void setStagiaire(Stagiaire stagiaire) {
        this.stagiaire = stagiaire;
    }

    public Formateur getFormateur() {
        return formateur;
    }

    public Adresse formateur(Formateur formateur) {
        this.formateur = formateur;
        return this;
    }

    public void setFormateur(Formateur formateur) {
        this.formateur = formateur;
    }

    public Technicien getTechnicien() {
        return technicien;
    }

    public Adresse technicien(Technicien technicien) {
        this.technicien = technicien;
        return this;
    }

    public void setTechnicien(Technicien technicien) {
        this.technicien = technicien;
    }

    public Gestionnaire getGestionnaire() {
        return gestionnaire;
    }

    public Adresse gestionnaire(Gestionnaire gestionnaire) {
        this.gestionnaire = gestionnaire;
        return this;
    }

    public void setGestionnaire(Gestionnaire gestionnaire) {
        this.gestionnaire = gestionnaire;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Adresse adresse = (Adresse) o;
        if (adresse.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), adresse.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Adresse{" +
            "id=" + getId() +
            "}";
    }
}
