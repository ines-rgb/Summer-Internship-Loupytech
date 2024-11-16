package com.loupytech.loupytech.Services;

import com.loupytech.loupytech.Entites.Account;
import com.loupytech.loupytech.Entites.Role;
import com.loupytech.loupytech.Repository.AccountRepository;
import com.loupytech.loupytech.Repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ServiceAccount implements IServiceAccount {

    @Autowired
    AccountRepository accountRepository;
    @Autowired
    ReportRepository reportRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Account signup(Account account) {
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        account.setRole(Role.CLIENT);
        account.setDatecreation(new Date());
        return accountRepository.save(account);
    }
    @Override
    public Account addEmploye(Account account) {
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        account.setRole(Role.ADMIN);
        account.setDatecreation(new Date());
        return accountRepository.save(account);
    }

    @Override
    public Account updatePassword(Long idAccount, String newPassword) {
        Account account = accountRepository.findById(idAccount).orElse(null);
        if(account != null) {
            account.setPassword(passwordEncoder.encode(newPassword));
            return accountRepository.save(account);
        }
        return null;
    }

    @Override
    public List<Account> getClients() {
        return accountRepository.findAll().stream().filter(account -> account.getRole().name().equals(Role.CLIENT.name())).toList();
    }

    @Override
    public List<Account> getEmployes() {
        return accountRepository.findAll().stream().filter(account -> account.getRole().name().equals(Role.ADMIN.name())).toList();
    }

    @Override
    public Account updateAccount(Account account , Long idAccount ) {
        Account account1 = accountRepository.findById(idAccount).orElse(null);
        if(account1 != null) {
            account1.setAddress(account.getAddress());
            account1.setCity(account.getCity());
            account1.setCountry(account.getCountry());
            account1.setPostalCode(account.getPostalCode());

            return accountRepository.save(account1);

        }
        return null;
    }

    @Override
    public Account addClient(Long idEmploye, Account client) {
        Account employe = accountRepository.findById(idEmploye).orElse(null);

        if(employe!=null){
            client.setRole(Role.CLIENT);
            client.setPassword(passwordEncoder.encode(client.getPassword()));

            client.setDatecreation(new Date());
            client.setAccountCreator(employe);
            return accountRepository.save(client);
        }

        return null;

    }

    @Override
    public List<Account> getAccounts() {
        return accountRepository.findAll();
    }


}
