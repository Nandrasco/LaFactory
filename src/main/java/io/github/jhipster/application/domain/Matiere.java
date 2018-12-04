package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import io.github.jhipster.application.domain.enumeration.Niveau;

/**
 * A Matiere.
 */
@Entity
@Table(name = "matiere")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Matiere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Enumerated(EnumType.STRING)
    @Column(name = "niveau")
    private Niveau niveau;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "matiere_formateurs",
               joinColumns = @JoinColumn(name = "matieres_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "formateurs_id", referencedColumnName = "id"))
    private Set<Formateur> formateurs = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "matiere_stagiaires",
               joinColumns = @JoinColumn(name = "matieres_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "stagiaires_id", referencedColumnName = "id"))
    private Set<Stagiaire> stagiaires = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "matiere_modules",
               joinColumns = @JoinColumn(name = "matieres_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "modules_id", referencedColumnName = "id"))
    private Set<Module> modules = new HashSet<>();

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

    public Matiere nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Niveau getNiveau() {
        return niveau;
    }

    public Matiere niveau(Niveau niveau) {
        this.niveau = niveau;
        return this;
    }

    public void setNiveau(Niveau niveau) {
        this.niveau = niveau;
    }

    public Set<Formateur> getFormateurs() {
        return formateurs;
    }

    public Matiere formateurs(Set<Formateur> formateurs) {
        this.formateurs = formateurs;
        return this;
    }

    public Matiere addFormateurs(Formateur formateur) {
        this.formateurs.add(formateur);
        formateur.getMatieres().add(this);
        return this;
    }

    public Matiere removeFormateurs(Formateur formateur) {
        this.formateurs.remove(formateur);
        formateur.getMatieres().remove(this);
        return this;
    }

    public void setFormateurs(Set<Formateur> formateurs) {
        this.formateurs = formateurs;
    }

    public Set<Stagiaire> getStagiaires() {
        return stagiaires;
    }

    public Matiere stagiaires(Set<Stagiaire> stagiaires) {
        this.stagiaires = stagiaires;
        return this;
    }

    public Matiere addStagiaires(Stagiaire stagiaire) {
        this.stagiaires.add(stagiaire);
        stagiaire.getMatieres().add(this);
        return this;
    }

    public Matiere removeStagiaires(Stagiaire stagiaire) {
        this.stagiaires.remove(stagiaire);
        stagiaire.getMatieres().remove(this);
        return this;
    }

    public void setStagiaires(Set<Stagiaire> stagiaires) {
        this.stagiaires = stagiaires;
    }

    public Set<Module> getModules() {
        return modules;
    }

    public Matiere modules(Set<Module> modules) {
        this.modules = modules;
        return this;
    }

    public Matiere addModules(Module module) {
        this.modules.add(module);
        module.getMatieres().add(this);
        return this;
    }

    public Matiere removeModules(Module module) {
        this.modules.remove(module);
        module.getMatieres().remove(this);
        return this;
    }

    public void setModules(Set<Module> modules) {
        this.modules = modules;
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
        Matiere matiere = (Matiere) o;
        if (matiere.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), matiere.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Matiere{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", niveau='" + getNiveau() + "'" +
            "}";
    }
}
