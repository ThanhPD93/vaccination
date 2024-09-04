package mockProject.team3.Vaccination_20.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mockProject.team3.Vaccination_20.utils.Gender;

import java.time.LocalDate;
import java.util.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Employee {
    @Id
    @Column(length = 36)
    private String employeeId;

    private String address;

    private LocalDate dateOfBirth;

    @Column(length = 100)
    private String email;

    @Column(length = 100)
    private String employeeName;

    private Gender gender;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] image;

    private String password;

    @Column(length = 20)
    private String phone;

    @Column(length = 100)
    private String position;

    private String username;

    private String workingPlace;
}
