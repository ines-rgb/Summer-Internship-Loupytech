package com.loupytech.loupytech.Entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Data
@Entity
@Table(name = "account")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Account implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idAccount;
    String firstname;
    String lastname;
    String email;
    String password;
    String address;
    String city;
    String country;
    String postalCode;

    @Enumerated(EnumType.STRING)
    Role role;
    Date datecreation;


    @JsonIgnore
    @ManyToOne
    Account accountCreator;

    @JsonIgnore
    @OneToMany(mappedBy = "client")
    List<Report> reports = new ArrayList<>();


}
