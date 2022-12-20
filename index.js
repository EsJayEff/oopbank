#! /usr/bin/env node

import inquirer from "inquirer";
class BankAccount {
    AccountBalance;
    statement;
    constructor(AccountBalance, statement) {
        this.AccountBalance = AccountBalance;
        this.statement = statement;
    }
    BankAccount(n) {
        this.AccountBalance = n;
    }
    Debit(amount) {
        this.statement = "Sorry, you have insufficient balance!";
        if (amount > 0) {
            this.statement = "The amount you have entered is incorrect";
            if (this.AccountBalance > amount) {
                this.AccountBalance = this.AccountBalance - amount;
                this.statement = "Tranaction successful Your New Account Balance is: " + this.AccountBalance;
            }
            else {
                this.statement = "You don't have enough money to do this tranaction: " + this.AccountBalance;
            }
        }
        return this.statement;
    }
    Credit(amount) {
        this.statement = "Transaction Failed!";
        if (amount > 0) {
            this.AccountBalance = this.AccountBalance + amount;
            if (amount > 100) {
                this.AccountBalance = this.AccountBalance - 1;
            }
            this.statement = "Your account has been credited successfully! Your New Account Balance is: " + this.AccountBalance;
        }
        return this.statement;
    }
}
class Customer extends BankAccount {
    FirstName;
    LastName;
    Gender;
    Age;
    MobileNumber;
    constructor(FirstName, LastName, Gender, Age, MobileNumber) {
        super(0, "");
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Gender = Gender;
        this.Age = Age;
        this.MobileNumber = MobileNumber;
    }
    CustomerInfo() {
        return `${this.FirstName}, ${this.LastName}, ${this.Gender}, ${this.Age},${this.MobileNumber}`;
    }
}
const newUser = new Customer("Es", "Jay", "Male", 42, "03343285085");
newUser.statement = `Welcome ${newUser.FirstName} ${newUser.LastName}`;
newUser.BankAccount(100);
async function askQuestion() {
    const answers = await inquirer
        .prompt([
        /* Pass your questions in here */
        {
            type: "list",
            name: "operator",
            message: "\nWhich operation you want to perform\n",
            choices: ["Debit", "Credit"],
        },
        {
            type: "number",
            name: "num1",
            message: "Please Enter The Amount: ",
        },
    ]);
    if (answers.operator == "Debit") {
        newUser.Debit(answers.num1);
        console.log(newUser.statement);
    }
    ;
    if (answers.operator == "Credit") {
        newUser.Credit(answers.num1);
        console.log(newUser.statement);
    }
    ;
}
;
async function startAgain() {
    do {
        await askQuestion();
        var again = await inquirer.prompt({
            type: "input",
            name: "restart",
            message: "Do you want to do more transactions Y/N: ",
        });
    } while (again.restart == "y" || again.restart == "Y");
    console.log("Thank you for using the Esjay Bank! see you soon.");
}
startAgain();
