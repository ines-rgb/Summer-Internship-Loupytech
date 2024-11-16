package com.loupytech.loupytech.Controllers;

import com.loupytech.loupytech.Dto.AccountLoginDto;
import com.loupytech.loupytech.Dto.AuthRequest;
import com.loupytech.loupytech.Entites.Account;
import com.loupytech.loupytech.Services.AccountSecurityService;
import com.loupytech.loupytech.Services.IServiceAccount;
import com.loupytech.loupytech.Services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
public class AccountController {


    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    @Autowired
    private IServiceAccount accountIService;

    @Autowired
    AccountSecurityService accountSecurityService;


    @PostMapping("/login")
    public AccountLoginDto login(@RequestBody AuthRequest authRequest) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authenticate.isAuthenticated()) {
            return accountSecurityService.loginSucces(authRequest.getUsername());

        } else {
            throw new UsernameNotFoundException("Invalid user request");
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/addClient/{idEmploye}")
    public Account signup(@PathVariable Long idEmploye,@RequestBody Account admin) {
        return accountIService.addClient(idEmploye,admin);
    }


    @PostMapping("/addEmploye")
    public Account addEmplye(@RequestBody Account employe) {
        return accountIService.addEmploye(employe);
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/getClients")
    public List<Account> getClients() {
        return accountIService.getClients();
    }
    @PreAuthorize("hasAuthority('ADMIN')")

    @GetMapping("/getAccounts")
    public List<Account> getAccounts() {
        return accountIService.getAccounts();
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/getEmployes")
    public List<Account> getEmployes() {
        return accountIService.getEmployes();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('CLIENT')")
    @PostMapping("/changePassword/{idAccount}/{newPassword}")
    public Account changePassword(@PathVariable("idAccount") Long idAccount, @PathVariable("newPassword") String newPassword) {
        return accountIService.updatePassword(idAccount, newPassword);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('CLIENT')")
    @PostMapping("/updateProfile/{idAccount}")
    public Account updateProfile(@PathVariable("idAccount") Long idAccount, @RequestBody Account profile) {
        return accountIService.updateAccount(profile,idAccount);
    }

}