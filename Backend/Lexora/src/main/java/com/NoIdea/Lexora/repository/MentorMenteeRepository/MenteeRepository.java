package com.NoIdea.Lexora.repository.MentorMenteeRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NoIdea.Lexora.model.MentorMenteeModel.Mentee;

@Repository
public interface MenteeRepository extends JpaRepository<Mentee,Long>{
    
}
