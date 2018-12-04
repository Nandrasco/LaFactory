package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Module.
 */
@Entity
@Table(name = "module")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Module implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Stagiaire stagiaires;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "module_formateurs",
               joinColumns = @JoinColumn(name = "modules_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "formateurs_id", referencedColumnName = "id"))
    private Set<Formateur> formateurs = new HashSet<>();

    @ManyToMany(mappedBy = "modules")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Matiere> matieres = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Module nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Stagiaire getStagiaires() {
        return stagiaires;
    }

    public Module stagiaires(Stagiaire stagiaire) {
        this.stagiaires = stagiaire;
        return this;
    }

    public void setStagiaires(Stagiaire stagiaire) {
        this.stagiaires = stagiaire;
    }

    public Set<Formateur> getFormateurs() {
        return formateurs;
    }

    public Module formateurs(Set<Formateur> formateurs) {
        this.formateurs = formateurs;
        return this;
    }

    public Module addFormateurs(Formateur formateur) {
        this.formateurs.add(formateur);
        formateur.getModules().add(this);
        return this;
    }

    public Module removeFormateurs(Formateur formateur) {
        this.formateurs.remove(formateur);
        formateur.getModules().remove(this);
        return this;
    }

    public void setFormateurs(Set<Formateur> formateurs) {
        this.formateurs = formateurs;
    }

    public Set<Matiere> getMatieres() {
        return matieres;
    }

    public Module matieres(Set<Matiere> matieres) {
        this.matieres = matieres;
        return this;
    }

    public Module addMatieres(Matiere matiere) {
        this.matieres.add(matiere);
        matiere.getModules().add(this);
        return this;
    }

    public Module removeMatieres(Matiere matiere) {
        this.matieres.remove(matiere);
        matiere.getModules().remove(this);
        return this;
    }

    public void setMatieres(Set<Matiere> matieres) {
        this.matieres = matieres;
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
        Module module = (Module) o;
        if (module.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), module.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Module{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            "}";
    }
}
