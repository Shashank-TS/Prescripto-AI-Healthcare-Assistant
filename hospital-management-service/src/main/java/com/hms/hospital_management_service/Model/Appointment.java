package com.hms.hospital_management_service.Model;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime appointmentDate;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="userdetails_id")
    private UserDetails userDetails;
    
    @ManyToOne
    @JoinColumn(name="doctor_id")
    private Doctor doctor;

    private String roomId;
    private boolean status;
    private boolean PaymentStatus;
    
}
