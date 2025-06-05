package com.hms.hospital_management_service.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import com.hms.hospital_management_service.Model.Doctor;
import com.hms.hospital_management_service.Service.DoctorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("api/doctor")
public class DoctorController {
    
    @Autowired
    private DoctorService doctorService;

    @GetMapping("/getdoctorbyid/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable String id) throws Exception{
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }
    
    @PutMapping("/updatedoctor/{id}")
    public ResponseEntity<Doctor> updateDoctor(@RequestBody Doctor doctor, @PathVariable String id) throws Exception{
        return ResponseEntity.ok(doctorService.updateDoctor(doctor, id));
    }
    
}
