package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Stagiaire.
 */
@Entity
@Table(name = "stagiaire")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Stagiaire implements Serializable {

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

    @OneToOne(mappedBy = "stagiaire")
    @JsonIgnore
    private Ordinateur ordinateur;

    @OneToOne(mappedBy = "stagiaire")
    @JsonIgnore
    private Adresse adresse;

    @ManyToMany(mappedBy = "stagiaires")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Matiere> matieres = new HashSet<>();

    @ManyToMany(mappedBy = "stagiaires")
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

    public Stagiaire nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Stagiaire prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getCoordonnees() {
        return coordonnees;
    }

    public Stagiaire coordonnees(String coordonnees) {
        this.coordonnees = coordonnees;
        return this;
    }

    public void setCoordonnees(String coordonnees) {
        this.coordonnees = coordonnees;
    }

    public Ordinateur getOrdinateur() {
        return ordinateur;
    }

    public Stagiaire ordinateur(Ordinateur ordinateur) {
        this.ordinateur = ordinateur;
        return this;
    }

    public void setOrdinateur(Ordinateur ordinateur) {
        this.ordinateur = ordinateur;
    }

    public Adresse getAdresse() {
        return adresse;
    }

    public Stagiaire adresse(Adresse adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }

    public Set<Matiere> getMatieres() {
        return matieres;
    }

    public Stagiaire matieres(Set<Matiere> matieres) {
        this.matieres = matieres;
        return this;
    }

    public Stagiaire addMatieres(Matiere matiere) {
        this.matieres.add(matiere);
        matiere.getStagiaires().add(this);
        return this;
    }

    public Stagiaire removeMatieres(Matiere matiere) {
        this.matieres.remove(matiere);
        matiere.getStagiaires().remove(this);
        return this;
    }

    public void setMatieres(Set<Matiere> matieres) {
        this.matieres = matieres;
    }

    public Set<Module> getModules() {
        return modules;
    }

    public Stagiaire modules(Set<Module> modules) {
        this.modules = modules;
        return this;
    }

    public Stagiaire addModules(Module module) {
        this.modules.add(module);
        module.getStagiaires().add(this);
        return this;
    }

    public Stagiaire removeModules(Module module) {
        this.modules.remove(module);
        module.getStagiaires().remove(this);
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
        Stagiaire stagiaire = (Stagiaire) o;
        if (stagiaire.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stagiaire.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Stagiaire{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", coordonnees='" + getCoordonnees() + "'" +
            "}";
    }
}
