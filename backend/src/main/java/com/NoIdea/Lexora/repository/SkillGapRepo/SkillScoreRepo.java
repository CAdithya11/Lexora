package com.NoIdea.Lexora.repository.SkillGapRepo;

import com.NoIdea.Lexora.model.SkillGapModel.SkillScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface SkillScoreRepo extends JpaRepository<SkillScore, Integer> {

    @Modifying
    @Transactional
    @Query("Update SkillScore s SET s.jobRoleName = :newjobename WHERE s.jobRoleName = :oldjobename ")
    void updatename(String newjobename ,String oldjobename);

    @Modifying
    @Transactional
    @Query("Update SkillScore s SET s.skillName = :newskillName WHERE s.skillName = :oldskillName")
    void updateskillname( String newskillName, String oldskillName);

}
