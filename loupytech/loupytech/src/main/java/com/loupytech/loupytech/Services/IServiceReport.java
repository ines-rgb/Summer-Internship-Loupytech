package com.loupytech.loupytech.Services;

import com.loupytech.loupytech.Entites.Report;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

public interface IServiceReport {

    boolean uploadReport(Long idClient, MultipartFile pdf, String title, String description) throws IOException;
    List<Report> getReports();
    List<Report> filterReports(Date start, Date end);
    Report getOnePortal(Long idPortal);
    List<Report> getReportByClientId(Long idClient);
    List<Report> sortReportByDateCreated();

    boolean deleteReport(Long idPortal);
}
