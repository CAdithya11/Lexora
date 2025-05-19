package com.NoIdea.Lexora.ServiceTest.PersonaMatchingServiceImplTest;

import com.NoIdea.Lexora.model.PersonaMatchingModel.PersonaMatchingModel;
import com.NoIdea.Lexora.repository.PersonaMatchingRepo.PersonaMatchingRepo;
import com.NoIdea.Lexora.service.PersonaMatchingService.PersonaMatchingServiceImpl.PersonaMatchingServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class PersonaMatchingServiceImplTest {

    @Mock
    private PersonaMatchingRepo personaMatchingRepo;

    @InjectMocks
    private PersonaMatchingServiceImpl personaMatchingService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllPersonaDetails() {
        PersonaMatchingModel p1 = new PersonaMatchingModel();
        PersonaMatchingModel p2 = new PersonaMatchingModel();

        when(personaMatchingRepo.findAll()).thenReturn(Arrays.asList(p1, p2));

        List<PersonaMatchingModel> result = personaMatchingService.getAllPersonaDetails();
        assertEquals(2, result.size());
        verify(personaMatchingRepo, times(1)).findAll();
    }

    @Test
    void testGetPersonaDetails() {
        PersonaMatchingModel p = new PersonaMatchingModel();
        p.setId(1);

        when(personaMatchingRepo.findById(1)).thenReturn(Optional.of(p));

        Optional<PersonaMatchingModel> result = personaMatchingService.getPersonaDetails(1);
        assertTrue(result.isPresent());
        assertEquals(1, result.get().getId());
        verify(personaMatchingRepo, times(1)).findById(1);
    }

    @Test
    void testSaveAll() {
        PersonaMatchingModel p1 = new PersonaMatchingModel();
        PersonaMatchingModel p2 = new PersonaMatchingModel();
        List<PersonaMatchingModel> list = Arrays.asList(p1, p2);

        when(personaMatchingRepo.saveAll(list)).thenReturn(list);

        List<PersonaMatchingModel> result = personaMatchingService.saveAll(list);
        assertEquals(2, result.size());
        verify(personaMatchingRepo, times(1)).saveAll(list);
    }

    @Test
    void testUpdatePersona() {
        PersonaMatchingModel p = new PersonaMatchingModel();
        p.setId(1);

        when(personaMatchingRepo.save(p)).thenReturn(p);

        PersonaMatchingModel result = personaMatchingService.updatePersona(p);
        assertEquals(1, result.getId());
        verify(personaMatchingRepo, times(1)).save(p);
    }

    @Test
    void testDeletePersona() {
        doNothing().when(personaMatchingRepo).deleteAll();

        personaMatchingService.deletePersona();

        verify(personaMatchingRepo, times(1)).deleteAll();
    }
}
