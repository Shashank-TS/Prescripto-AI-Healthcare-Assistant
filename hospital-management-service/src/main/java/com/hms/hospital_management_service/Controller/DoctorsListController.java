package com.hms.hospital_management_service.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hms.hospital_management_service.Model.Doctor;
import com.hms.hospital_management_service.Service.DoctorService;

@RestController
@RequestMapping("/doctors")
public class DoctorsListController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/getalldoctors")
    public ResponseEntity<List<Doctor>> getAllDoctors(){
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }
    
}
