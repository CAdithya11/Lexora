package com.NoIdea.Lexora.service.SkillGapService;

import com.NoIdea.Lexora.model.SkillGapModel.SkillAnswer;

import java.util.List;

public interface SkillAnswerService {

    public List<SkillAnswer> getAnswer();
    public List<SkillAnswer> saveAnswer(List<SkillAnswer> skillAnswers);
    public List<SkillAnswer> updateAnswer(List<SkillAnswer> skillAnswers);
    public void deleteAnswers();
    public void deleteAnswer(int id);
}
