package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Salle.
 */
@Entity
@Table(name = "salle")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Salle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "cout")
    private Float cout;

    @Column(name = "dispo")
    private Boolean dispo;

    @Column(name = "date_debut")
    private LocalDate dateDebut;

    @Column(name = "date_fin")
    private LocalDate dateFin;

    @Column(name = "capacite_max")
    private Integer capaciteMax;

    @OneToOne(mappedBy = "salle")
    @JsonIgnore
    private Projecteur projecteur;

    @ManyToMany(mappedBy = "salles")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Formateur> formateurs = new HashSet<>();

    @ManyToMany(mappedBy = "salles")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Stagiaire> stagiaires = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Salle code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Float getCout() {
        return cout;
    }

    public Salle cout(Float cout) {
        this.cout = cout;
        return this;
    }

    public void setCout(Float cout) {
        this.cout = cout;
    }

    public Boolean isDispo() {
        return dispo;
    }

    public Salle dispo(Boolean dispo) {
        this.dispo = dispo;
        return this;
    }

    public void setDispo(Boolean dispo) {
        this.dispo = dispo;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public Salle dateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public Salle dateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
        return this;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public Integer getCapaciteMax() {
        return capaciteMax;
    }

    public Salle capaciteMax(Integer capaciteMax) {
        this.capaciteMax = capaciteMax;
        return this;
    }

    public void setCapaciteMax(Integer capaciteMax) {
        this.capaciteMax = capaciteMax;
    }

    public Projecteur getProjecteur() {
        return projecteur;
    }

    public Salle projecteur(Projecteur projecteur) {
        this.projecteur = projecteur;
        return this;
    }

    public void setProjecteur(Projecteur projecteur) {
        this.projecteur = projecteur;
    }

    public Set<Formateur> getFormateurs() {
        return formateurs;
    }

    public Salle formateurs(Set<Formateur> formateurs) {
        this.formateurs = formateurs;
        return this;
    }

    public Salle addFormateurs(Formateur formateur) {
        this.formateurs.add(formateur);
        formateur.getSalles().add(this);
        return this;
    }

    public Salle removeFormateurs(Formateur formateur) {
        this.formateurs.remove(formateur);
        formateur.getSalles().remove(this);
        return this;
    }

    public void setFormateurs(Set<Formateur> formateurs) {
        this.formateurs = formateurs;
    }

    public Set<Stagiaire> getStagiaires() {
        return stagiaires;
    }

    public Salle stagiaires(Set<Stagiaire> stagiaires) {
        this.stagiaires = stagiaires;
        return this;
    }

    public Salle addStagiaires(Stagiaire stagiaire) {
        this.stagiaires.add(stagiaire);
        stagiaire.getSalles().add(this);
        return this;
    }

    public Salle removeStagiaires(Stagiaire stagiaire) {
        this.stagiaires.remove(stagiaire);
        stagiaire.getSalles().remove(this);
        return this;
    }

    public void setStagiaires(Set<Stagiaire> stagiaires) {
        this.stagiaires = stagiaires;
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
        Salle salle = (Salle) o;
        if (salle.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Salle{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", cout=" + getCout() +
            ", dispo='" + isDispo() + "'" +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            ", capaciteMax=" + getCapaciteMax() +
            "}";
    }
}
