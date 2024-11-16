package com.loupytech.loupytech.Repository;

import com.loupytech.loupytech.Entites.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ReportRepository extends JpaRepository<Report,Long> {

    List<Report> findByClientIdAccount(Long idClient);

    List<Report> findByDateCreatedBetween(Date from, Date to);
    List<Report> findAllByOrderByDateCreatedAsc();
}
