//package com.NoIdea.Lexora.service.IndustryInsightsService;
//
//import com.NoIdea.Lexora.model.IndustryInsightsModel.SkillTrends;
//import com.NoIdea.Lexora.repository.IndustryInsightsRepo.SkillTrendsRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class SkillTrendsService {
//
//    @Autowired
//    private SkillTrendsRepository skillTrendsRepository;
//
//    public List<SkillTrends> getAllSkills() {
//        return skillTrendsRepository.findAll();
//    }
//
//    public List<SkillTrends> getSkillsByCountry(String country) {
//        return skillTrendsRepository.findByCountry(country);
//    }
//
//    public List<SkillTrends> getSkillsByJobRole(String jobRole) {
//        return skillTrendsRepository.findByJobRole(jobRole);
//    }
//
//    public List<SkillTrends> getSkillsByYear(String year) {
//        return skillTrendsRepository.findByYear(year);
//    }
//
//    public List<SkillTrends> getSkillsWithFilters(
//            String country,
//            String jobRole,
//            String year) {
//        return skillTrendsRepository.findSkillsWithFilters(country, jobRole, year);
//    }
//
//    public SkillTrends saveSkill(SkillTrends skillTrend) {
//        return skillTrendsRepository.save(skillTrend);
//    }
//
//    public List<SkillTrends> saveAllSkills(List<SkillTrends> skillTrends) {
//        return skillTrendsRepository.saveAll(skillTrends);
//    }
//}
