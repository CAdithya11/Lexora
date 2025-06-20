package com.NoIdea.Lexora.ServiceTest.SkillgapServiceTest;

import com.NoIdea.Lexora.model.SkillGapModel.SkillScore;
import com.NoIdea.Lexora.repository.SkillGapRepo.SkillScoreRepo;
import com.NoIdea.Lexora.service.SkillGapService.SkillGapServiceImpl.SkillScoreServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SkillScoreServiceImplTest {

    @Mock
    private SkillScoreRepo skillScoreRepo;

    @InjectMocks
    private SkillScoreServiceImpl skillScoreService;

    private SkillScore skillScore1;
    private SkillScore skillScore2;

    @BeforeEach
    void setUp() {
        // Initialize test data with new entity structure
        skillScore1 = new SkillScore();
        skillScore1.setSkillScoreId(1);
        skillScore1.setPredictedScore(85);
        skillScore1.setTotalQuestions(10);
        skillScore1.setJobRoleName("Java Developer");
        skillScore1.setSkillName("Spring Boot");
        skillScore1.setLearningPath("Begin with Spring Core, then Spring MVC");
        skillScore1.setCourseLinks(Arrays.asList(
            "https://course1.com",
            "https://course2.com"
        ));

        skillScore2 = new SkillScore();
        skillScore2.setSkillScoreId(2);
        skillScore2.setPredictedScore(90);
        skillScore2.setTotalQuestions(15);
        skillScore2.setJobRoleName("Data Engineer");
        skillScore2.setSkillName("Apache Spark");
        skillScore2.setLearningPath("Start with Python, then PySpark");
        skillScore2.setCourseLinks(Arrays.asList(
            "https://course3.com",
            "https://course4.com"
        ));
    }

    @Test
    void getAllSkillScores_ShouldReturnAllScores() {
        when(skillScoreRepo.findAll()).thenReturn(Arrays.asList(skillScore1, skillScore2));

        List<SkillScore> result = skillScoreService.getAllSkillScores();

        assertEquals(2, result.size());
        assertTrue(result.contains(skillScore1));
        assertTrue(result.contains(skillScore2));
        verify(skillScoreRepo, times(1)).findAll();
    }

    @Test
    void getSkillScoreById_ShouldReturnScore_WhenExists() {
        when(skillScoreRepo.findById(1)).thenReturn(Optional.of(skillScore1));

        Optional<SkillScore> result = skillScoreService.getSkillScoreById(1);

        assertTrue(result.isPresent());
        assertEquals("Java Developer", result.get().getJobRoleName());
        assertEquals(2, result.get().getCourseLinks().size());
        verify(skillScoreRepo, times(1)).findById(1);
    }

    @Test
    void saveSkillScore_ShouldReturnSavedScoreWithAllFields() {
        SkillScore newScore = new SkillScore();
        newScore.setPredictedScore(75);
        newScore.setTotalQuestions(8);
        newScore.setJobRoleName("Frontend Developer");
        newScore.setSkillName("React");
        newScore.setLearningPath("Learn JavaScript first");
        newScore.setCourseLinks(List.of("https://react-course.com"));

        when(skillScoreRepo.save(any(SkillScore.class))).thenReturn(newScore);

        SkillScore result = skillScoreService.saveSkillScore(newScore);

        assertNotNull(result);
        assertEquals("React", result.getSkillName());
        assertEquals(1, result.getCourseLinks().size());
        verify(skillScoreRepo, times(1)).save(newScore);
    }

    @Test
    void updateSkillScore_ShouldUpdateAllFields() {
        SkillScore updatedScore = new SkillScore();
        updatedScore.setSkillScoreId(1);
        updatedScore.setPredictedScore(95);  // Updated from 85
        updatedScore.setTotalQuestions(12); // Updated from 10
        updatedScore.setLearningPath("Updated learning path");
        updatedScore.setCourseLinks(Arrays.asList(
            "https://new-course1.com",
            "https://new-course2.com"
        ));

        when(skillScoreRepo.save(any(SkillScore.class))).thenReturn(updatedScore);

        SkillScore result = skillScoreService.updateSkillScore(updatedScore);

        assertEquals(95, result.getPredictedScore());
        assertEquals(2, result.getCourseLinks().size());
        assertTrue(result.getCourseLinks().contains("https://new-course1.com"));
        verify(skillScoreRepo, times(1)).save(updatedScore);
    }

    @Test
    void deleteSkillScoreById_ShouldDeleteExistingScore() {
        doNothing().when(skillScoreRepo).deleteById(1);

        skillScoreService.deleteSkillScoreById(1);

        verify(skillScoreRepo, times(1)).deleteById(1);
    }

    @Test
    void deleteAllSkillScores_ShouldClearRepository() {
        doNothing().when(skillScoreRepo).deleteAll();

        skillScoreService.deleteAllSkillScores();

        verify(skillScoreRepo, times(1)).deleteAll();
    }

    @Test
    void saveSkillScore_ShouldHandleEmptyCourseLinks() {
        SkillScore scoreWithEmptyLinks = new SkillScore();
        scoreWithEmptyLinks.setPredictedScore(80);
        scoreWithEmptyLinks.setCourseLinks(List.of());

        when(skillScoreRepo.save(any(SkillScore.class))).thenReturn(scoreWithEmptyLinks);

        SkillScore result = skillScoreService.saveSkillScore(scoreWithEmptyLinks);

        assertTrue(result.getCourseLinks().isEmpty());
        verify(skillScoreRepo, times(1)).save(scoreWithEmptyLinks);
    }

    @Test
    void updateSkillScore_ShouldHandleNullLearningPath() {
        SkillScore scoreWithNullPath = new SkillScore();
        scoreWithNullPath.setSkillScoreId(1);
        scoreWithNullPath.setLearningPath(null);

        when(skillScoreRepo.save(any(SkillScore.class))).thenReturn(scoreWithNullPath);

        SkillScore result = skillScoreService.updateSkillScore(scoreWithNullPath);

        assertNull(result.getLearningPath());
        verify(skillScoreRepo, times(1)).save(scoreWithNullPath);
    }
}