package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.LaFactoryApp;

import io.github.jhipster.application.domain.Stagiaire;
import io.github.jhipster.application.repository.StagiaireRepository;
import io.github.jhipster.application.service.StagiaireService;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the StagiaireResource REST controller.
 *
 * @see StagiaireResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LaFactoryApp.class)
public class StagiaireResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_COORDONNEES = "AAAAAAAAAA";
    private static final String UPDATED_COORDONNEES = "BBBBBBBBBB";

    @Autowired
    private StagiaireRepository stagiaireRepository;

    @Mock
    private StagiaireRepository stagiaireRepositoryMock;

    @Mock
    private StagiaireService stagiaireServiceMock;

    @Autowired
    private StagiaireService stagiaireService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStagiaireMockMvc;

    private Stagiaire stagiaire;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StagiaireResource stagiaireResource = new StagiaireResource(stagiaireService);
        this.restStagiaireMockMvc = MockMvcBuilders.standaloneSetup(stagiaireResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Stagiaire createEntity(EntityManager em) {
        Stagiaire stagiaire = new Stagiaire()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .coordonnees(DEFAULT_COORDONNEES);
        return stagiaire;
    }

    @Before
    public void initTest() {
        stagiaire = createEntity(em);
    }

    @Test
    @Transactional
    public void createStagiaire() throws Exception {
        int databaseSizeBeforeCreate = stagiaireRepository.findAll().size();

        // Create the Stagiaire
        restStagiaireMockMvc.perform(post("/api/stagiaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stagiaire)))
            .andExpect(status().isCreated());

        // Validate the Stagiaire in the database
        List<Stagiaire> stagiaireList = stagiaireRepository.findAll();
        assertThat(stagiaireList).hasSize(databaseSizeBeforeCreate + 1);
        Stagiaire testStagiaire = stagiaireList.get(stagiaireList.size() - 1);
        assertThat(testStagiaire.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testStagiaire.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testStagiaire.getCoordonnees()).isEqualTo(DEFAULT_COORDONNEES);
    }

    @Test
    @Transactional
    public void createStagiaireWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stagiaireRepository.findAll().size();

        // Create the Stagiaire with an existing ID
        stagiaire.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStagiaireMockMvc.perform(post("/api/stagiaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stagiaire)))
            .andExpect(status().isBadRequest());

        // Validate the Stagiaire in the database
        List<Stagiaire> stagiaireList = stagiaireRepository.findAll();
        assertThat(stagiaireList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStagiaires() throws Exception {
        // Initialize the database
        stagiaireRepository.saveAndFlush(stagiaire);

        // Get all the stagiaireList
        restStagiaireMockMvc.perform(get("/api/stagiaires?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stagiaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].coordonnees").value(hasItem(DEFAULT_COORDONNEES.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllStagiairesWithEagerRelationshipsIsEnabled() throws Exception {
        StagiaireResource stagiaireResource = new StagiaireResource(stagiaireServiceMock);
        when(stagiaireServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restStagiaireMockMvc = MockMvcBuilders.standaloneSetup(stagiaireResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restStagiaireMockMvc.perform(get("/api/stagiaires?eagerload=true"))
        .andExpect(status().isOk());

        verify(stagiaireServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllStagiairesWithEagerRelationshipsIsNotEnabled() throws Exception {
        StagiaireResource stagiaireResource = new StagiaireResource(stagiaireServiceMock);
            when(stagiaireServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restStagiaireMockMvc = MockMvcBuilders.standaloneSetup(stagiaireResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restStagiaireMockMvc.perform(get("/api/stagiaires?eagerload=true"))
        .andExpect(status().isOk());

            verify(stagiaireServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getStagiaire() throws Exception {
        // Initialize the database
        stagiaireRepository.saveAndFlush(stagiaire);

        // Get the stagiaire
        restStagiaireMockMvc.perform(get("/api/stagiaires/{id}", stagiaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stagiaire.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.coordonnees").value(DEFAULT_COORDONNEES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStagiaire() throws Exception {
        // Get the stagiaire
        restStagiaireMockMvc.perform(get("/api/stagiaires/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStagiaire() throws Exception {
        // Initialize the database
        stagiaireService.save(stagiaire);

        int databaseSizeBeforeUpdate = stagiaireRepository.findAll().size();

        // Update the stagiaire
        Stagiaire updatedStagiaire = stagiaireRepository.findById(stagiaire.getId()).get();
        // Disconnect from session so that the updates on updatedStagiaire are not directly saved in db
        em.detach(updatedStagiaire);
        updatedStagiaire
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .coordonnees(UPDATED_COORDONNEES);

        restStagiaireMockMvc.perform(put("/api/stagiaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStagiaire)))
            .andExpect(status().isOk());

        // Validate the Stagiaire in the database
        List<Stagiaire> stagiaireList = stagiaireRepository.findAll();
        assertThat(stagiaireList).hasSize(databaseSizeBeforeUpdate);
        Stagiaire testStagiaire = stagiaireList.get(stagiaireList.size() - 1);
        assertThat(testStagiaire.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testStagiaire.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testStagiaire.getCoordonnees()).isEqualTo(UPDATED_COORDONNEES);
    }

    @Test
    @Transactional
    public void updateNonExistingStagiaire() throws Exception {
        int databaseSizeBeforeUpdate = stagiaireRepository.findAll().size();

        // Create the Stagiaire

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStagiaireMockMvc.perform(put("/api/stagiaires")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stagiaire)))
            .andExpect(status().isBadRequest());

        // Validate the Stagiaire in the database
        List<Stagiaire> stagiaireList = stagiaireRepository.findAll();
        assertThat(stagiaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStagiaire() throws Exception {
        // Initialize the database
        stagiaireService.save(stagiaire);

        int databaseSizeBeforeDelete = stagiaireRepository.findAll().size();

        // Get the stagiaire
        restStagiaireMockMvc.perform(delete("/api/stagiaires/{id}", stagiaire.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Stagiaire> stagiaireList = stagiaireRepository.findAll();
        assertThat(stagiaireList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Stagiaire.class);
        Stagiaire stagiaire1 = new Stagiaire();
        stagiaire1.setId(1L);
        Stagiaire stagiaire2 = new Stagiaire();
        stagiaire2.setId(stagiaire1.getId());
        assertThat(stagiaire1).isEqualTo(stagiaire2);
        stagiaire2.setId(2L);
        assertThat(stagiaire1).isNotEqualTo(stagiaire2);
        stagiaire1.setId(null);
        assertThat(stagiaire1).isNotEqualTo(stagiaire2);
    }
}
