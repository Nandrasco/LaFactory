package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.LaFactoryApp;

import io.github.jhipster.application.domain.Adresse;
import io.github.jhipster.application.repository.AdresseRepository;
import io.github.jhipster.application.service.AdresseService;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AdresseResource REST controller.
 *
 * @see AdresseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LaFactoryApp.class)
public class AdresseResourceIntTest {

    @Autowired
    private AdresseRepository adresseRepository;

    @Autowired
    private AdresseService adresseService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAdresseMockMvc;

    private Adresse adresse;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AdresseResource adresseResource = new AdresseResource(adresseService);
        this.restAdresseMockMvc = MockMvcBuilders.standaloneSetup(adresseResource)
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
    public static Adresse createEntity(EntityManager em) {
        Adresse adresse = new Adresse();
        return adresse;
    }

    @Before
    public void initTest() {
        adresse = createEntity(em);
    }

    @Test
    @Transactional
    public void createAdresse() throws Exception {
        int databaseSizeBeforeCreate = adresseRepository.findAll().size();

        // Create the Adresse
        restAdresseMockMvc.perform(post("/api/adresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(adresse)))
            .andExpect(status().isCreated());

        // Validate the Adresse in the database
        List<Adresse> adresseList = adresseRepository.findAll();
        assertThat(adresseList).hasSize(databaseSizeBeforeCreate + 1);
        Adresse testAdresse = adresseList.get(adresseList.size() - 1);
    }

    @Test
    @Transactional
    public void createAdresseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = adresseRepository.findAll().size();

        // Create the Adresse with an existing ID
        adresse.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdresseMockMvc.perform(post("/api/adresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(adresse)))
            .andExpect(status().isBadRequest());

        // Validate the Adresse in the database
        List<Adresse> adresseList = adresseRepository.findAll();
        assertThat(adresseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAdresses() throws Exception {
        // Initialize the database
        adresseRepository.saveAndFlush(adresse);

        // Get all the adresseList
        restAdresseMockMvc.perform(get("/api/adresses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(adresse.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getAdresse() throws Exception {
        // Initialize the database
        adresseRepository.saveAndFlush(adresse);

        // Get the adresse
        restAdresseMockMvc.perform(get("/api/adresses/{id}", adresse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(adresse.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAdresse() throws Exception {
        // Get the adresse
        restAdresseMockMvc.perform(get("/api/adresses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAdresse() throws Exception {
        // Initialize the database
        adresseService.save(adresse);

        int databaseSizeBeforeUpdate = adresseRepository.findAll().size();

        // Update the adresse
        Adresse updatedAdresse = adresseRepository.findById(adresse.getId()).get();
        // Disconnect from session so that the updates on updatedAdresse are not directly saved in db
        em.detach(updatedAdresse);

        restAdresseMockMvc.perform(put("/api/adresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAdresse)))
            .andExpect(status().isOk());

        // Validate the Adresse in the database
        List<Adresse> adresseList = adresseRepository.findAll();
        assertThat(adresseList).hasSize(databaseSizeBeforeUpdate);
        Adresse testAdresse = adresseList.get(adresseList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingAdresse() throws Exception {
        int databaseSizeBeforeUpdate = adresseRepository.findAll().size();

        // Create the Adresse

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdresseMockMvc.perform(put("/api/adresses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(adresse)))
            .andExpect(status().isBadRequest());

        // Validate the Adresse in the database
        List<Adresse> adresseList = adresseRepository.findAll();
        assertThat(adresseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAdresse() throws Exception {
        // Initialize the database
        adresseService.save(adresse);

        int databaseSizeBeforeDelete = adresseRepository.findAll().size();

        // Get the adresse
        restAdresseMockMvc.perform(delete("/api/adresses/{id}", adresse.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Adresse> adresseList = adresseRepository.findAll();
        assertThat(adresseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Adresse.class);
        Adresse adresse1 = new Adresse();
        adresse1.setId(1L);
        Adresse adresse2 = new Adresse();
        adresse2.setId(adresse1.getId());
        assertThat(adresse1).isEqualTo(adresse2);
        adresse2.setId(2L);
        assertThat(adresse1).isNotEqualTo(adresse2);
        adresse1.setId(null);
        assertThat(adresse1).isNotEqualTo(adresse2);
    }
}
