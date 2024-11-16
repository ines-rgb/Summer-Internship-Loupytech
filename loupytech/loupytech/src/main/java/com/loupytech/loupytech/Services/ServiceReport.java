package com.loupytech.loupytech.Services;

import com.loupytech.loupytech.Entites.Account;
import com.loupytech.loupytech.Entites.Report;
import com.loupytech.loupytech.Repository.AccountRepository;
import com.loupytech.loupytech.Repository.ReportRepository;
import com.loupytech.loupytech.Utils.PDFUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ServiceReport implements IServiceReport {

    @Autowired
    ReportRepository reportRepository;
    @Autowired
    AccountRepository accountRepository;

    @Override
    public boolean uploadReport(Long idClient, MultipartFile pdf, String title, String description) throws IOException {

        Account account = accountRepository.findById(idClient).orElse(null);
        if (account != null) {
            Report report = new Report();
            report.setTitle(title);
            report.setDateCreated(new Date());
            report.setDescription(description);
            report.setPdf(PDFUtils.compressPFD(pdf.getBytes()));
            report.setClient(account);
            reportRepository.save(report);
            return true;
        }

        return false;
    }

    @Override
    public List<Report> getReports() {
        List<Report> reports = new ArrayList<>();
        for (Report report : reportRepository.findAll()) {
        byte[] PDFS= PDFUtils.decompressPDF(report.getPdf());
        Report newReport = new Report();
        newReport.setIdReport(report.getIdReport());
        newReport.setTitle(report.getTitle());
        newReport.setDateCreated(new Date());
        newReport.setClient(report.getClient());
        newReport.setDescription(report.getDescription());
        newReport.setPdf(PDFS);
        reports.add(newReport);
        }

        return reports;
    }
    @Override
    public List<Report> getReportByClientId(Long idClient)
    {
        List<Report> reports = new ArrayList<>();
        for (Report report : reportRepository.findByClientIdAccount(idClient)) {
            byte[] PDFS= PDFUtils.decompressPDF(report.getPdf());
            Report newReport = new Report();
            newReport.setIdReport(report.getIdReport());
            newReport.setTitle(report.getTitle());
            newReport.setDateCreated(new Date());
            newReport.setClient(report.getClient());
            newReport.setDescription(report.getDescription());
            newReport.setPdf(PDFS);
            reports.add(newReport);
        }

        return reports;
    }
    @Override
    public List<Report> filterReports(Date from , Date to) {
        return reportRepository.findByDateCreatedBetween(from,to);
    }

    @Override
    public Report getOnePortal(Long idReport) {
        Report report = reportRepository.findById(idReport).orElse(null);
        if (report != null) {
            Report newReport = new Report();
            byte[] PDFS= PDFUtils.decompressPDF(report.getPdf());
            newReport.setIdReport(idReport);
            newReport.setTitle(report.getTitle());
            newReport.setDateCreated(new Date());
            newReport.setClient(report.getClient());
            newReport.setDescription(report.getDescription());
            newReport.setPdf(PDFS);
            return newReport;
        }
        return null;
    }



    @Override
    public List<Report> sortReportByDateCreated(){
        return reportRepository.findAllByOrderByDateCreatedAsc();
    }

    @Override
    public boolean deleteReport(Long idPortal) {
         reportRepository.deleteById(idPortal);
         return true;
    }

}
