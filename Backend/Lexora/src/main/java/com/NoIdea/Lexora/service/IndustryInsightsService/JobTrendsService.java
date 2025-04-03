package com.NoIdea.Lexora.service.IndustryInsightsService;

import com.NoIdea.Lexora.model.IndustryInsightsModel.JobTrends;
import com.NoIdea.Lexora.repository.IndustryInsightsRepo.JobTrendsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobTrendsService {

    @Autowired
    private JobTrendsRepository jobTrendsRepository;

    public List<JobTrends> getAllJobs() {
        return jobTrendsRepository.findAll();
    }

    public List<JobTrends> getJobsByCountry(String country) {
        return jobTrendsRepository.findByCountry(country);
    }

    public List<JobTrends> getJobsByJobRole(String jobRole) {
        return jobTrendsRepository.findByJobRole(jobRole);
    }

    public List<JobTrends> getJobsByMainCategory(String mainCategory) {
        return jobTrendsRepository.findByMainCategory(mainCategory);
    }

    public List<JobTrends> getJobsBySubCategory(String subCategory) {
        return jobTrendsRepository.findBySubCategory(subCategory);
    }

    public List<JobTrends> getJobsByYear(String year) {
        return jobTrendsRepository.findByYear(year);
    }

    public List<JobTrends> getJobsWithFilters(
            String country,
            String jobRole,
            String mainCategory,
            String subCategory,
            String year) {
        return jobTrendsRepository.findJobsWithFilters(
                country, jobRole, mainCategory, subCategory, year);
    }

    public JobTrends saveJob(JobTrends jobTrend) {
        return jobTrendsRepository.save(jobTrend);
    }

    public List<JobTrends> saveAllJobs(List<JobTrends> jobTrends) {
        return jobTrendsRepository.saveAll(jobTrends);
    }


}