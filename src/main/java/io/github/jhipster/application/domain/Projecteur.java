package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Projecteur.
 */
@Entity
@Table(name = "projecteur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Projecteur implements Serializable {

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

    @OneToOne    @JoinColumn(unique = true)
    private Salle salle;

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

    public Projecteur code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Float getCout() {
        return cout;
    }

    public Projecteur cout(Float cout) {
        this.cout = cout;
        return this;
    }

    public void setCout(Float cout) {
        this.cout = cout;
    }

    public Boolean isDispo() {
        return dispo;
    }

    public Projecteur dispo(Boolean dispo) {
        this.dispo = dispo;
        return this;
    }

    public void setDispo(Boolean dispo) {
        this.dispo = dispo;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public Projecteur dateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public Projecteur dateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
        return this;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public Salle getSalle() {
        return salle;
    }

    public Projecteur salle(Salle salle) {
        this.salle = salle;
        return this;
    }

    public void setSalle(Salle salle) {
        this.salle = salle;
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
        Projecteur projecteur = (Projecteur) o;
        if (projecteur.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), projecteur.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Projecteur{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", cout=" + getCout() +
            ", dispo='" + isDispo() + "'" +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            "}";
    }
}
