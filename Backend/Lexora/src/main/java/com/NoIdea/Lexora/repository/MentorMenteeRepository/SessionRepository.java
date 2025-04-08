package com.NoIdea.Lexora.repository.MentorMenteeRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NoIdea.Lexora.model.MentorMenteeModel.Session;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long>{
}
