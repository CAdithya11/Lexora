package com.NoIdea.Lexora.service.SkillGapService;

import com.NoIdea.Lexora.model.SkillGapModel.SkillList;

import java.util.List;

public interface SkillListService {
    public List<SkillList> getSkillList();
    public List<SkillList> saveSkillList(List<SkillList> skillList);
    public List<SkillList> updateSkillList(List<SkillList> skillList);
    public void deleteSkill(int id);
    public void deleteSkillList();
}
