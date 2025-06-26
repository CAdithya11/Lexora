package com.NoIdea.Lexora.service.MentorMenteeService;

import com.NoIdea.Lexora.dto.MentorMentee.MeetingDTO;
import com.NoIdea.Lexora.model.MentorMenteeModel.Meeting;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MeetingService {
    public List<MeetingDTO> findAllMeetingsByUser_id(Long user_id);

    public MeetingDTO createMeeting(Long user_id, Long mentee_id, Meeting meeting);

    public String updateExistingMeetingWithMeetingId(Long id);

    public String deleteExistingMeetingWithMeetingId(Long id);
    public MeetingDTO findMeetingByMeetingId(Long meetingId);
    public List<MeetingDTO> findMeetingByMenteeId(Long mentee_Id);
    public String completeMeetingWithMeetingId(Long meetingId);
}
