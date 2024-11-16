package com.loupytech.loupytech.Services;

import com.loupytech.loupytech.Entites.Account;

import java.util.List;

public interface IServiceAccount {

    Account signup(Account account);
    Account addEmploye(Account account);
    Account updatePassword(Long idAccount, String newPassword) ;
    List<Account> getClients();
    List<Account> getEmployes();
    Account updateAccount(Account account,Long idAccount);

    Account addClient(Long idEmploye, Account admin);

    List<Account> getAccounts();
}
