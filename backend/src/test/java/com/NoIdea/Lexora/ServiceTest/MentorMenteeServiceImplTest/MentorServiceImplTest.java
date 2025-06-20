package com.NoIdea.Lexora.ServiceTest.MentorMenteeServiceImplTest;

import com.NoIdea.Lexora.exception.MentorMentee.MentorNotFoundException;
import com.NoIdea.Lexora.model.MentorMenteeModel.Mentor;
import com.NoIdea.Lexora.repository.MentorMenteeRepository.MentorRepository;
import com.NoIdea.Lexora.service.MentorMenteeService.MentorMenteeServiceImpl.MentorServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MentorServiceImplTest {

    @Mock
    private MentorRepository mentorRepository;

    @InjectMocks
    private MentorServiceImpl mentorService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveMentor_Success() {
        Mentor mentor = new Mentor();
        when(mentorRepository.save(mentor)).thenReturn(mentor);

        Mentor saved = mentorService.saveMentor(mentor);

        assertNotNull(saved);
        verify(mentorRepository, times(1)).save(mentor);
    }

    @Test
    void testDeleteMentor_Success() {
        Long id = 1L;
        when(mentorRepository.findById(id)).thenReturn(Optional.of(new Mentor()));
        doNothing().when(mentorRepository).deleteById(id);

        assertDoesNotThrow(() -> mentorService.deleteMentor(id));
        verify(mentorRepository).deleteById(id);
    }

    @Test
    void testDeleteMentor_NotFound() {
        Long id = 99L;
        when(mentorRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(MentorNotFoundException.class, () -> mentorService.deleteMentor(id));
    }

    @Test
    void testViewAllMentors_ReturnsList() {
        List<Mentor> mentors = Arrays.asList(new Mentor(), new Mentor());
        when(mentorRepository.findAll()).thenReturn(mentors);

        List<Mentor> result = mentorService.viewAllMentors();

        assertEquals(2, result.size());
    }

    @Test
    void testViewMentorById_Found() {
        Mentor mentor = new Mentor();
        when(mentorRepository.findById(1L)).thenReturn(Optional.of(mentor));

        Mentor result = mentorService.viewMentorById(1L);

        assertNotNull(result);
    }

    @Test
    void testViewMentorById_NotFound() {
        when(mentorRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(MentorNotFoundException.class, () -> mentorService.viewMentorById(1L));
    }

    @Test
    void testUpdateMentor_Success() {
        Mentor existing = new Mentor();
        existing.setName("Old");

        Mentor updated = new Mentor();
        updated.setName("New");
        updated.setEmail("new@mail.com");

        when(mentorRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(mentorRepository.save(any(Mentor.class))).thenReturn(existing);

        Mentor result = mentorService.updateMentor(1L, updated);

        assertEquals("New", result.getName());
        assertEquals("new@mail.com", result.getEmail());
        verify(mentorRepository).save(existing);
    }

    @Test
    void testUpdateMentor_NotFound() {
        when(mentorRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(MentorNotFoundException.class, () -> mentorService.updateMentor(1L, new Mentor()));
    }
}
