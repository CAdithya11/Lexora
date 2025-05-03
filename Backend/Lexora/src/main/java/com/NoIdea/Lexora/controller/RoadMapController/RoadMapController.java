package com.NoIdea.Lexora.controller.RoadMapController;

import com.NoIdea.Lexora.model.RoadMapModel.Roadmap;
import com.NoIdea.Lexora.service.RoadMapService.RoadMapService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/roadmaps")
public class RoadMapController {

    private final RoadMapService roadmapService;

    @Autowired
    public RoadMapController(RoadMapService roadmapService) {
        this.roadmapService = roadmapService;
    }

    //Create a new roadmap
    @PostMapping
    public ResponseEntity<Roadmap> createRoadmap(@RequestBody Roadmap roadmap) {
        try {
            Roadmap createdRoadmap = roadmapService.saveRoadmap(roadmap);
            return new ResponseEntity<>(createdRoadmap, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    //Get all roadmaps
    @GetMapping
    public ResponseEntity<List<Roadmap>> getAllRoadmaps() {
        List<Roadmap> roadmaps = roadmapService.getAllRoadmaps();
        return new ResponseEntity<>(roadmaps, HttpStatus.OK);
    }

    //Get roadmap by MongoDB id*/
//    @GetMapping("/{id}")
//    public ResponseEntity<Roadmap> getRoadmapById(@PathVariable String id) {
//        Optional<Roadmap> roadmap = roadmapService.getRoadmapById(id);
//        return roadmap.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
//                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
//    }

    //Get roadmap by rId
    @GetMapping("/rid/{rId}")
    public ResponseEntity<Roadmap> getRoadmapByrId(@PathVariable Integer rId) {
        Optional<Roadmap> roadmap = roadmapService.getRoadmapByrId(rId);
        return roadmap.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

//    /**
//     * Update a roadmap
//     */
//    @PutMapping("/{id}")
//    public ResponseEntity<Roadmap> updateRoadmap(@PathVariable String id,
//                                                      @RequestBody Roadmap roadmap) {
//        try {
//            Roadmap updatedRoadmap = roadmapService.updateRoadmap(id, roadmap);
//            return new ResponseEntity<>(updatedRoadmap, HttpStatus.OK);
//        } catch (RuntimeException e) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }

    //Delete a roadmap
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoadmap(@PathVariable String id) {
        try {
            roadmapService.deleteRoadmap(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //Search roadmaps by job name
    @GetMapping("/search")
    public ResponseEntity<List<Roadmap>> searchRoadmaps(@RequestParam String jobName) {
        List<Roadmap> roadmaps = roadmapService.findRoadmapsByJobName(jobName);
        return new ResponseEntity<>(roadmaps, HttpStatus.OK);
    }


}