package com.NoIdea.Lexora.service.MentorMenteeService;

import com.NoIdea.Lexora.dto.NotificationDTO.NotificationDTO;
import com.NoIdea.Lexora.model.Notification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface NotificationService {
    // find all notifications by user_id
    List<NotificationDTO> findAllNotificationsByRecieverId(Long reciever_id);
    // create notification
    String createNotification(Notification notification);
    // delete notifications
    String deleteNotification(Long id);
    // change notification status to read
    String updateNotification(Long id);

}
