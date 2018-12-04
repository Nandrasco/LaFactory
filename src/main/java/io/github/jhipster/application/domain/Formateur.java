package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import io.github.jhipster.application.domain.enumeration.Niveau;

/**
 * A Formateur.
 */
@Entity
@Table(name = "formateur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Formateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "coordonnees")
    private String coordonnees;

    @Enumerated(EnumType.STRING)
    @Column(name = "niveau")
    private Niveau niveau;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "formateur_salles",
               joinColumns = @JoinColumn(name = "formateurs_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "salles_id", referencedColumnName = "id"))
    private Set<Salle> salles = new HashSet<>();

    @OneToOne(mappedBy = "formateur")
    @JsonIgnore
    private Adresse adresse;

    @ManyToMany(mappedBy = "formateurs")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Matiere> matieres = new HashSet<>();

    @ManyToMany(mappedBy = "formateurs")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
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

    public Formateur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Formateur prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getCoordonnees() {
        return coordonnees;
    }

    public Formateur coordonnees(String coordonnees) {
        this.coordonnees = coordonnees;
        return this;
    }

    public void setCoordonnees(String coordonnees) {
        this.coordonnees = coordonnees;
    }

    public Niveau getNiveau() {
        return niveau;
    }

    public Formateur niveau(Niveau niveau) {
        this.niveau = niveau;
        return this;
    }

    public void setNiveau(Niveau niveau) {
        this.niveau = niveau;
    }

    public Set<Salle> getSalles() {
        return salles;
    }

    public Formateur salles(Set<Salle> salles) {
        this.salles = salles;
        return this;
    }

    public Formateur addSalles(Salle salle) {
        this.salles.add(salle);
        salle.getFormateurs().add(this);
        return this;
    }

    public Formateur removeSalles(Salle salle) {
        this.salles.remove(salle);
        salle.getFormateurs().remove(this);
        return this;
    }

    public void setSalles(Set<Salle> salles) {
        this.salles = salles;
    }

    public Adresse getAdresse() {
        return adresse;
    }

    public Formateur adresse(Adresse adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }

    public Set<Matiere> getMatieres() {
        return matieres;
    }

    public Formateur matieres(Set<Matiere> matieres) {
        this.matieres = matieres;
        return this;
    }

    public Formateur addMatieres(Matiere matiere) {
        this.matieres.add(matiere);
        matiere.getFormateurs().add(this);
        return this;
    }

    public Formateur removeMatieres(Matiere matiere) {
        this.matieres.remove(matiere);
        matiere.getFormateurs().remove(this);
        return this;
    }

    public void setMatieres(Set<Matiere> matieres) {
        this.matieres = matieres;
    }

    public Set<Module> getModules() {
        return modules;
    }

    public Formateur modules(Set<Module> modules) {
        this.modules = modules;
        return this;
    }

    public Formateur addModules(Module module) {
        this.modules.add(module);
        module.getFormateurs().add(this);
        return this;
    }

    public Formateur removeModules(Module module) {
        this.modules.remove(module);
        module.getFormateurs().remove(this);
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
        Formateur formateur = (Formateur) o;
        if (formateur.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), formateur.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Formateur{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", coordonnees='" + getCoordonnees() + "'" +
            ", niveau='" + getNiveau() + "'" +
            "}";
    }
}
