package com.NoIdea.Lexora.service.SkillGapService.SkillGapServiceImpl;

import com.NoIdea.Lexora.model.SkillGapModel.SkillScore;
import com.NoIdea.Lexora.repository.SkillGapRepo.SkillScoreRepo;
import com.NoIdea.Lexora.service.SkillGapService.SkillScoreService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SkillScoreServiceImpl implements SkillScoreService {
    @Autowired
    private SkillScoreRepo skillScoreRepo;
    @Override
    public List<SkillScore> getAllSkillScores() {
        return skillScoreRepo.findAll();
    }

    @Override
    public Optional<SkillScore> getSkillScoreById(int id) {
        return skillScoreRepo.findById(id);
    }

    @Override
    public SkillScore saveSkillScore(SkillScore skillScore) {
        return skillScoreRepo.save(skillScore);
    }

    @Override
    public SkillScore updateSkillScore(SkillScore skillScore) {
        return skillScoreRepo.save(skillScore);
    }

    @Override
    public void deleteSkillScoreById(int id) {
        skillScoreRepo.deleteById(id);
    }

    @Override
    public void deleteAllSkillScores() {
        skillScoreRepo.deleteAll();
    }
}
