package com.NoIdea.Lexora.dto.NotificationDTO;

import com.NoIdea.Lexora.enums.NotificationStatus;
import com.NoIdea.Lexora.model.Notification;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NotificationDTO {
    private Long id;
    private String title;
    private NotificationStatus status;
    private Long recieverId;
    private String message;
    public NotificationDTO(Notification notification) {
        this.id = notification.getId();
        this.title = notification.getNotification();
        this.status = notification.getStatus();
        this.recieverId = notification.getReciever().getUser_id();
        this.message = notification.getMessage();
    }
}