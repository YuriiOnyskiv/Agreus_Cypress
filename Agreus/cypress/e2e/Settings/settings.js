import { navigate } from "../../Page Object/naviagation"
import { settings } from "../../Page Object/settingsPage"
import { login } from "../../support/commands"
import 'cypress-v10-preserve-cookie'

describe("Tests for section page" , () => {
 
    before("Login to aplication", () =>{
       login()
    })

    beforeEach("Stay authorized", ()=>{
        cy.preserveCookieOnce('connect.sid')
        cy.visit("/")
    })

    var accountName = "agreus_biuro"
    var name = "Jan"
    var surname = "Kowalski"
    var tel = "+48123456789"
    var email = "test@inventia.pl"
    var consumerName = "Inventia Sp. z o.o."
    var emailForSent = "book@inventia.pl"
    var adress = "Policzki"
    var zipCode = "01-301"
    var city = "Warszawa"
    var nip = "9512017534"

    var userEmail = "yurii.onyskiv@inventia.pl"
    var userName = "Yurii"
    var userSurname = "Onyskiv"
    var userTel = "+48574770333"

    var newUserEmail = "cypress@gmail.com"
    var userType ={
        administator : 0,
        user : 1
    }
    var newUserName = "Cypress"
    var newUserSurname = "Nowacki"
    var newUserTel = "+48763987002"

    var newUserEmail_edit = "cypress2@gmail.com"
    var newUserName_edit = "Cypress_edit"
    var newUserSurname_edit = "Nowacki_edit"
    var newUserTel_edit = "+48987665455"


    it("Edycja danych konta", ()=>{
        navigate.toSettings()
        settings.editAccountData(accountName, name, surname, tel, email, consumerName, emailForSent, adress, zipCode, city, nip)
    })

    it("Edycja danych użytkownika", ()=>{
        navigate.toSettings()
        settings.editUserData(userEmail, userName, userSurname, userTel)
    })

    it("Dodanie nowego użytkownika", ()=>{
        navigate.toSettings()
        settings.addUser(newUserEmail, userType.administator, newUserName, newUserSurname, newUserTel)
    })

    it("Edycja nowego użytkownika", ()=>{
        navigate.toSettings()
        settings.editUser(newUserName, newUserEmail_edit, userType.user, newUserName_edit, newUserSurname_edit, newUserTel_edit)
    })

    it("Usunięcie nowego użytkownika", ()=>{
        navigate.toSettings()
        settings.deleteUser(newUserName_edit)
    })

})