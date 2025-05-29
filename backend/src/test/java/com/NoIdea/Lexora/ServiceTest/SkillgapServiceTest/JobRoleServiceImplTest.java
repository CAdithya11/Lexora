package com.NoIdea.Lexora.ServiceTest.SkillgapServiceTest;

import com.NoIdea.Lexora.model.SkillGapModel.*;
import com.NoIdea.Lexora.repository.SkillGapRepo.JobRoleRepo;
import com.NoIdea.Lexora.service.SkillGapService.SkillGapServiceImpl.JobRoleServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JobRoleServiceImplTest {

    @Mock
    private JobRoleRepo jobRoleRepo;

    @InjectMocks
    private JobRoleServiceImpl jobRoleService;

    private JobRoleEntity jobRole1;
    private JobRoleEntity jobRole2;
    private SkillList skillList;
    private SkillQuestion skillQuestion;
    private SkillAnswer skillAnswer;

    @BeforeEach
    void setUp() {
        // Initialize test data
        jobRole1 = new JobRoleEntity();
        jobRole1.setJobRoleId(1);
        jobRole1.setJobRoleName("Software Developer");
        
        jobRole2 = new JobRoleEntity();
        jobRole2.setJobRoleId(2);
        jobRole2.setJobRoleName("Data Scientist");

        skillAnswer = new SkillAnswer();
        skillAnswer.setSkillAnswerId(1);
        skillAnswer.setAnswer("Sample Answer");

        skillQuestion = new SkillQuestion();
        skillQuestion.setQuestionId(1);
        skillQuestion.setQuestion("Sample Question");
        skillQuestion.setSkillAnswers(Collections.singletonList(skillAnswer));

        skillList = new SkillList();
        skillList.setSkillId(1);
        skillList.setSkillName("Programming");
        skillList.setSkillQuestions(Collections.singletonList(skillQuestion));

        jobRole1.setSkillLists(Collections.singletonList(skillList));
    }

    @Test
    void getByJobRoleId_ShouldReturnJobRole_WhenExists() {
        when(jobRoleRepo.findById(1)).thenReturn(Optional.of(jobRole1));

        Optional<JobRoleEntity> result = jobRoleService.getByJobRoleId(1);

        assertTrue(result.isPresent());
        assertEquals("Software Developer", result.get().getJobRoleName());
        verify(jobRoleRepo, times(1)).findById(1);
    }

    @Test
    void getByJobRoleId_ShouldReturnEmpty_WhenNotExists() {
        when(jobRoleRepo.findById(99)).thenReturn(Optional.empty());

        Optional<JobRoleEntity> result = jobRoleService.getByJobRoleId(99);

        assertFalse(result.isPresent());
        verify(jobRoleRepo, times(1)).findById(99);
    }

    @Test
    void getJobRole_ShouldReturnAllJobRoles() {
        when(jobRoleRepo.findAll()).thenReturn(Arrays.asList(jobRole1, jobRole2));

        List<JobRoleEntity> result = jobRoleService.getJobRole();

        assertEquals(2, result.size());
        verify(jobRoleRepo, times(1)).findAll();
    }

    @Test
    void saveJobRole_ShouldSaveWithProperRelationships() {
        when(jobRoleRepo.saveAll(anyList())).thenReturn(Arrays.asList(jobRole1));

        List<JobRoleEntity> result = jobRoleService.saveJobRole(Arrays.asList(jobRole1));

        // Verify relationships were set
        assertEquals(jobRole1, skillList.getJobRoleEntity());
        assertEquals(skillList, skillQuestion.getSkillList());
        assertEquals(skillQuestion, skillAnswer.getSkillQuestion());
        
        assertEquals(1, result.size());
        verify(jobRoleRepo, times(1)).saveAll(anyList());
    }

    @Test
    void updateJobRole_ShouldUpdateWithProperRelationships() {
        when(jobRoleRepo.saveAll(anyList())).thenReturn(Arrays.asList(jobRole1));

        List<JobRoleEntity> result = jobRoleService.updateJobRole(Arrays.asList(jobRole1));

        // Verify relationships were set
        assertEquals(jobRole1, skillList.getJobRoleEntity());
        assertEquals(1, result.size());
        verify(jobRoleRepo, times(1)).saveAll(anyList());
    }

    @Test
    void deleteJobRole_ShouldDeleteById() {
        doNothing().when(jobRoleRepo).deleteById(anyInt());

        jobRoleService.deleteJobRole(1);

        verify(jobRoleRepo, times(1)).deleteById(1);
    }

    @Test
    void deleteAllJobRole_ShouldDeleteAll() {
        doNothing().when(jobRoleRepo).deleteAll();

        jobRoleService.deleteAllJobRole();

        verify(jobRoleRepo, times(1)).deleteAll();
    }

    @Test
    void saveJobRole_ShouldHandleNullSkillLists() {
        jobRole1.setSkillLists(null);
        when(jobRoleRepo.saveAll(anyList())).thenReturn(Arrays.asList(jobRole1));

        List<JobRoleEntity> result = jobRoleService.saveJobRole(Arrays.asList(jobRole1));

        assertEquals(1, result.size());
        verify(jobRoleRepo, times(1)).saveAll(anyList());
    }

    @Test
    void saveJobRole_ShouldHandleEmptySkillLists() {
        jobRole1.setSkillLists(Collections.emptyList());
        when(jobRoleRepo.saveAll(anyList())).thenReturn(Arrays.asList(jobRole1));

        List<JobRoleEntity> result = jobRoleService.saveJobRole(Arrays.asList(jobRole1));

        assertEquals(1, result.size());
        verify(jobRoleRepo, times(1)).saveAll(anyList());
    }
}