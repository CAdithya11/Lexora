package com.NoIdea.Lexora.service.SkillGapService;

import com.NoIdea.Lexora.model.SkillGapModel.SkillQuestion;

import java.util.List;

public interface SkillQuestionService {
    public List<SkillQuestion> getSkillQuestion();
    public List<SkillQuestion> saveSkillQuestion(List<SkillQuestion> skillQuestions);
    public List<SkillQuestion> updateSkillQuestion(List<SkillQuestion> skillQuestions);
    public void deleteAllSkillQuestion();
    public void deleteSkillQuestion(int id);
}
