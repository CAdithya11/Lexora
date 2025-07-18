package com.NoIdea.Lexora.controller.SkillGapController;

import com.NoIdea.Lexora.model.SkillGapModel.JobRoleEntity;
import com.NoIdea.Lexora.service.SkillGapService.JobRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/jobRole")
@CrossOrigin
public class JobRoleController {
    @Autowired
    private JobRoleService jobRoleService;



    @GetMapping()
    public List<JobRoleEntity> getJobRole() {
        return jobRoleService.getJobRole();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobRoleEntity> getJobRoleById(@PathVariable int id) {
        return jobRoleService.getByJobRoleId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping()
    public List<JobRoleEntity> saveJobRole(@RequestBody List<JobRoleEntity> jobRole){
        return jobRoleService.saveJobRole(jobRole);
    }

    @PutMapping()
    public List<JobRoleEntity> updateJobRole(@RequestBody List<JobRoleEntity> jobRole) {
        return jobRoleService.updateJobRole(jobRole);
    }

    @DeleteMapping
    public void deleteAllJobRole() {
        jobRoleService.deleteAllJobRole();
    }

    @DeleteMapping("/{id}")
    public void deleteJobRole(@PathVariable int id) {
        jobRoleService.deleteJobRole(id);
    }

    @DeleteMapping("/skill/{id}")
    public boolean deleteSkill(@PathVariable int id){
        return jobRoleService.deleteSkill(id);
    }
    @DeleteMapping("/question/{id}")
    public boolean deleteQuestion(@PathVariable int id){
        return jobRoleService.deleteQuestion(id);
    }
    @DeleteMapping("/answer/{id}")
    public boolean deleteAnswer(@PathVariable int id){
        return jobRoleService.deleteAnswer(id);
    }
}
