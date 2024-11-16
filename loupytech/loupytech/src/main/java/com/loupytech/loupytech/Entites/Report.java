package com.loupytech.loupytech.Entites;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "report")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Report implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idReport;
    String title;
    String description;
    Date dateCreated;
    @Lob
    byte[] pdf;

    @ManyToOne
    Account client ;


}
