// package com.NoIdea.Lexora.controller.IndustryInsightsController;

// import com.NoIdea.Lexora.model.IndustryInsightsModel.SkillTrends;
// import com.NoIdea.Lexora.service.IndustryInsightsService.SkillTrendsService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/skills")
// @CrossOrigin(origins = "*")
// public class SkillTrendsController {

//     @Autowired
//     private SkillTrendsService skillTrendsService;

//     @GetMapping
//     public ResponseEntity<List<SkillTrends>> getAllSkills() {
//         return ResponseEntity.ok(skillTrendsService.getAllSkills());
//     }

//     @GetMapping("/filter")
//     public ResponseEntity<List<SkillTrends>> getSkillsWithFilters(
//             @RequestParam(required = false) String country,
//             @RequestParam(required = false) String jobRole,
//             @RequestParam(required = false) String year) {

//         return ResponseEntity.ok(skillTrendsService.getSkillsWithFilters(
//                 country, jobRole, year));
//     }

//     @GetMapping("/country/{country}")
//     public ResponseEntity<List<SkillTrends>> getSkillsByCountry(@PathVariable String country) {
//         return ResponseEntity.ok(skillTrendsService.getSkillsByCountry(country));
//     }

//     @GetMapping("/role/{jobRole}")
//     public ResponseEntity<List<SkillTrends>> getSkillsByRole(@PathVariable String jobRole) {
//         return ResponseEntity.ok(skillTrendsService.getSkillsByJobRole(jobRole));
//     }

//     @GetMapping("/year/{year}")
//     public ResponseEntity<List<SkillTrends>> getSkillsByYear(@PathVariable String year) {
//         return ResponseEntity.ok(skillTrendsService.getSkillsByYear(year));
//     }

//     @PostMapping
//     public ResponseEntity<SkillTrends> addSkill(@RequestBody SkillTrends skillTrend) {
//         SkillTrends savedSkill = skillTrendsService.saveSkill(skillTrend);
//         return new ResponseEntity<>(savedSkill, HttpStatus.CREATED);
//     }

//     @PostMapping("/batch")
//     public ResponseEntity<List<SkillTrends>> addMultipleSkills(@RequestBody List<SkillTrends> skillTrends) {
//         List<SkillTrends> savedSkills = skillTrendsService.saveAllSkills(skillTrends);
//         return new ResponseEntity<>(savedSkills, HttpStatus.CREATED);
//     }


// }