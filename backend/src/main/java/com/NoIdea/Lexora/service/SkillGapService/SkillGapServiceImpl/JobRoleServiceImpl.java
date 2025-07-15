package com.NoIdea.Lexora.service.SkillGapService.SkillGapServiceImpl;

import com.NoIdea.Lexora.model.SkillGapModel.JobRoleEntity;
import com.NoIdea.Lexora.model.SkillGapModel.SkillAnswer;
import com.NoIdea.Lexora.model.SkillGapModel.SkillList;
import com.NoIdea.Lexora.model.SkillGapModel.SkillQuestion;
import com.NoIdea.Lexora.repository.SkillGapRepo.JobRoleRepo;

import com.NoIdea.Lexora.repository.SkillGapRepo.SkillScoreRepo;
import com.NoIdea.Lexora.service.SkillGapService.JobRoleService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class JobRoleServiceImpl implements JobRoleService {

    @Autowired
    private JobRoleRepo jobRoleRepo;

    @Autowired
    private SkillScoreRepo skillScoreRepo;

    @Override
    public Optional<JobRoleEntity> getByJobRoleId(int id) {
        return jobRoleRepo.findById(id);
    }

    @Override
    public List<JobRoleEntity> getJobRole(){
        return jobRoleRepo.findAll();
    }

    @Override
    public List<JobRoleEntity> saveJobRole(List<JobRoleEntity> jobRoles){
        for (JobRoleEntity role : jobRoles) {
            if (role.getSkillLists() != null) {
                for (SkillList skill : role.getSkillLists()) {
                    if(skill.getSkillQuestions()!=null){
                        for(SkillQuestion skilquiz: skill.getSkillQuestions()){
                            if(skilquiz.getSkillAnswers()!=null){
                                for(SkillAnswer skilans: skilquiz.getSkillAnswers()){
                                    skilans.setSkillQuestion(skilquiz);
                                }
                            }skilquiz.setSkillList(skill);
                        }
                    }skill.setJobRoleEntity(role);
                }
            }
        }
        return jobRoleRepo.saveAll(jobRoles);
    }
    @Override
    public List<JobRoleEntity> updateJobRole(List<JobRoleEntity> jobRoles) {

        if (jobRoles == null || jobRoles.isEmpty()) {
            throw new IllegalArgumentException("Job role list is empty.");
        }

        int id = jobRoles.get(0).getJobRoleId();
        Optional<JobRoleEntity> existingRoleOpt = jobRoleRepo.findById(id);
        if (!existingRoleOpt.isPresent()) {
            throw new RuntimeException("JobRole with ID " + id + " not found.");
        }

        String oldJobRoleName = existingRoleOpt.get().getJobRoleName();
        List<SkillList> oldSkillList = existingRoleOpt.get().getSkillLists();
        List<SkillList> newSkillList = jobRoles.get(0).getSkillLists();

        boolean skillSizeSame = newSkillList.size() == oldSkillList.size();

        for (JobRoleEntity role : jobRoles) {
            // ✅ Update job role name in SkillScore table if changed
            if (!role.getJobRoleName().equals(oldJobRoleName)) {
                skillScoreRepo.updatename(role.getJobRoleName(), oldJobRoleName);
            }

            if (role.getSkillLists() != null) {
                for (int i = 0; i < role.getSkillLists().size(); i++) {
                    SkillList newSkill = role.getSkillLists().get(i);
                    newSkill.setJobRoleEntity(role);

                    // ✅ Compare and update skill name if skill count is same
                    if (skillSizeSame && i < oldSkillList.size()) {
                        String oldSkillName = oldSkillList.get(i).getSkillName();
                        if (!newSkill.getSkillName().equals(oldSkillName)) {
                            skillScoreRepo.updateskillname(newSkill.getSkillName(), oldSkillName);
                            System.out.println("New Skill Name: " + newSkill.getSkillName() + ", Old Skill Name: " + oldSkillName);
                        }
                    }

                    if (newSkill.getSkillQuestions() != null) {
                        for (SkillQuestion question : newSkill.getSkillQuestions()) {
                            question.setSkillList(newSkill);
                            if (question.getSkillAnswers() != null) {
                                for (SkillAnswer answer : question.getSkillAnswers()) {
                                    answer.setSkillQuestion(question);
                                }
                            }
                        }
                    }
                }
            }
        }

        return jobRoleRepo.saveAll(jobRoles);
    }

    @Override
    public void deleteJobRole(  int id){
        jobRoleRepo.deleteById(id);
    }
    @Override
    public void deleteAllJobRole(){
        jobRoleRepo.deleteAll();
    }

    @Override
    public boolean deleteSkill(int id){
        List<JobRoleEntity> jobRoleEntities=jobRoleRepo.findAll();
        for(JobRoleEntity jobRoleEntity :jobRoleEntities){
            boolean remove=jobRoleEntity.getSkillLists().removeIf(skillList -> skillList.getSkillId()==id);
            if(remove){
                return true;
            }
        }
        return false;
    }
    @Override
    public boolean deleteQuestion(int id) {
        List<JobRoleEntity> jobRoleEntities = jobRoleRepo.findAll();
        for (JobRoleEntity jobRole : jobRoleEntities) {
            for (SkillList skillList : jobRole.getSkillLists()) {
                boolean remove = skillList.getSkillQuestions().removeIf(skillQuestion -> skillQuestion.getQuestionId() == id);
                {
                    if (remove) {
                        return true;
                    }
                }
            }

        }
        return false;
    }
    @Override
    public boolean deleteAnswer(int id){
        List<JobRoleEntity> jobRoleEntities=jobRoleRepo.findAll();
        for(JobRoleEntity jobRoleEntity:jobRoleEntities){
            for(SkillList skillList:jobRoleEntity.getSkillLists()){
                for(SkillQuestion skillQuestion: skillList.getSkillQuestions()){
                    boolean remove=skillQuestion.getSkillAnswers().removeIf(skillAnswer -> skillAnswer.getSkillAnswerId()==id);
                    if(remove){
                        return true;
                    }
                }
            }
        }
        return false;
    }
}



