package com.NoIdea.Lexora.controller.IndustryInsightsController;

import com.NoIdea.Lexora.model.IndustryInsightsModel.JobTrends;
import com.NoIdea.Lexora.service.IndustryInsightsService.JobTrendsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobTrendsController {

    @Autowired
    private JobTrendsService jobTrendsService;

    @GetMapping
    public ResponseEntity<List<JobTrends>> getAllJobs() {
        return ResponseEntity.ok(jobTrendsService.getAllJobs());
    }

    @GetMapping("/filter")
    public ResponseEntity<List<JobTrends>> getJobsWithFilters(
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String jobRole,
            @RequestParam(required = false) String mainCategory,
            @RequestParam(required = false) String subCategory,
            @RequestParam(required = false) String year) {

        return ResponseEntity.ok(jobTrendsService.getJobsWithFilters(
                country, jobRole, mainCategory, subCategory, year));
    }

    @GetMapping("/country/{country}")
    public ResponseEntity<List<JobTrends>> getJobsByCountry(@PathVariable String country) {
        return ResponseEntity.ok(jobTrendsService.getJobsByCountry(country));
    }

    @GetMapping("/role/{jobRole}")
    public ResponseEntity<List<JobTrends>> getJobsByRole(@PathVariable String jobRole) {
        return ResponseEntity.ok(jobTrendsService.getJobsByJobRole(jobRole));
    }

    @GetMapping("/category/{mainCategory}")
    public ResponseEntity<List<JobTrends>> getJobsByMainCategory(@PathVariable String mainCategory) {
        return ResponseEntity.ok(jobTrendsService.getJobsByMainCategory(mainCategory));
    }

    @GetMapping("/subcategory/{subCategory}")
    public ResponseEntity<List<JobTrends>> getJobsBySubCategory(@PathVariable String subCategory) {
        return ResponseEntity.ok(jobTrendsService.getJobsBySubCategory(subCategory));
    }

    @GetMapping("/year/{year}")
    public ResponseEntity<List<JobTrends>> getJobsByYear(@PathVariable String year) {
        return ResponseEntity.ok(jobTrendsService.getJobsByYear(year));
    }

    @PostMapping
    public ResponseEntity<JobTrends> addJob(@RequestBody JobTrends jobTrend) {
        JobTrends savedJob = jobTrendsService.saveJob(jobTrend);
        return new ResponseEntity<>(savedJob, HttpStatus.CREATED);
    }

    @PostMapping("/batch")
    public ResponseEntity<List<JobTrends>> addMultipleJobs(@RequestBody List<JobTrends> jobTrends) {
        List<JobTrends> savedJobs = jobTrendsService.saveAllJobs(jobTrends);
        return new ResponseEntity<>(savedJobs, HttpStatus.CREATED);
    }


}