package com.loupytech.loupytech.Dto;

import com.loupytech.loupytech.Entites.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter @Setter
public class AccountLoginDto {


    Long idAccount;
    String firstname;
    String lastname;
    String token;
    String email;
    String password;

    @Enumerated(EnumType.STRING)
    Role role;

    Date datecreation;


}
