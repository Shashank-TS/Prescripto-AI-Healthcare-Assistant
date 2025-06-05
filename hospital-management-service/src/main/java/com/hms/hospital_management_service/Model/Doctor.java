package com.hms.hospital_management_service.Model;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Doctor {  

    @Id
    private String _id;
    private String name;
    private String speciality;
    private String degree;
    private String experience;
    private String about;
    private double fees;
    private String city;
    private String address;
    private Long phone;
    private String imageurl;

    @JsonIgnore
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<Appointment> appointments;

    
}
