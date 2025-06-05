package com.hms.hospital_management_service.DTOs;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class AppointmentDTO {
    private LocalDateTime appointmentDate;
    private Long userId;
    private String doctorId;
}
