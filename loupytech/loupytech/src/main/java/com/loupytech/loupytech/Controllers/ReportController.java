package com.loupytech.loupytech.Controllers;

import com.loupytech.loupytech.Entites.Report;
import com.loupytech.loupytech.Services.IServiceReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/report")
public class ReportController {
    @Autowired
    IServiceReport serviceReport;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/uploadReport/{idClient}")
    public boolean uploadReport(
            @PathVariable Long idClient
            , @RequestParam("pdf") MultipartFile pdf
            , @RequestParam("title") String title
            , @RequestParam("description") String description ) throws IOException {

    return serviceReport.uploadReport(idClient,pdf,title,description);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('CLIENT')")
    @GetMapping("/getReports")
    public List<Report> getReports()  {
        return serviceReport.getReports();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('CLIENT')")
    @GetMapping("/getReportByClientId/{idClient}")
    public List<Report> getReportByClientId(@PathVariable Long idClient) {
        return serviceReport.getReportByClientId(idClient);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('CLIENT')")
    @GetMapping("/downloadReport/{idReport}")
    public Report getOnePortal(@PathVariable Long idReport) {
        return serviceReport.getOnePortal(idReport);
    }


    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('CLIENT')")
    @GetMapping("/filterReports/{startDate}/{endDate}")
    public List<Report> filterReports(
            @PathVariable @DateTimeFormat(pattern = "dd-MM-yyyy") Date startDate,
            @PathVariable @DateTimeFormat(pattern = "dd-MM-yyyy") Date endDate) {
        return serviceReport.filterReports(startDate,endDate);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('CLIENT')")
    @GetMapping("/sortReportByDateCreated")
    public List<Report> sortReportByDateCreated(){
        return serviceReport.sortReportByDateCreated();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/deleteReport/{idReport}")
    public boolean deleteReport(@PathVariable Long idReport) {
        return serviceReport.deleteReport(idReport);
    }

}
