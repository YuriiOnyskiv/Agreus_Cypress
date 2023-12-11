
export class Settings {

    editAccountData(accountName, name, surname, tel, email, consumerName, emailForSent, adress, zipCode, city, nip) {
        cy.contains("Dane konta").click()
        cy.contains("Edytuj").click()
        cy.get("div[class='q-mt-sm q-gutter-y-sm']").find(".q-list").first().find("input").clear().type(accountName)
        cy.get("div[class='q-mt-sm q-gutter-y-sm']").find(".q-list").last().children().then(contactInfo => {
            cy.wrap(contactInfo).eq(0).find("input").clear().type(name)
            cy.wrap(contactInfo).eq(1).find("input").clear().type(surname)
            cy.wrap(contactInfo).eq(2).find("input").clear().type(tel)
            cy.wrap(contactInfo).eq(3).find("input").clear().type(email)
        })
        cy.get(".q-tabs__content").children().last().click().then(() => {
            cy.wait(500)
            cy.get("div[class='q-mt-sm q-gutter-y-sm']").find(".q-list").children().then(invoiceInfo => {
                cy.wrap(invoiceInfo).eq(0).find("input").clear().type(consumerName)
                cy.wrap(invoiceInfo).eq(1).find("input").clear().type(emailForSent)
                cy.wrap(invoiceInfo).eq(2).find("input").clear().type(adress)
                cy.wrap(invoiceInfo).eq(3).find("input").clear().type(zipCode)
                cy.wrap(invoiceInfo).eq(4).find("input").clear().type(city)
                cy.wrap(invoiceInfo).eq(5).find("input").clear().type(nip)
                cy.wrap(invoiceInfo).eq(6).find("label").click()
            })
        })
        cy.contains("Zapisz").click().then(() => {
            cy.intercept("GET", Cypress.env("apiUrl") + "/api/me/full").as("getRequest")
            cy.wait("@getRequest")
        })
        cy.get(".q-tabs__content").children().last().click().then(() => {
            cy.wait(500)
            cy.get("div[class='q-px-lg q-mt-lg']").find("table").then(table => {
                cy.wrap(table).find("tr").eq(0).should("contain", consumerName)
                cy.wrap(table).find("tr").eq(1).should("contain", emailForSent)
                cy.wrap(table).find("tr").eq(2).should("contain", adress)
                cy.wrap(table).find("tr").eq(3).should("contain", zipCode)
                cy.wrap(table).find("tr").eq(4).should("contain", city)
                cy.wrap(table).find("tr").eq(6).should("contain", nip)
            })
        })
        cy.get(".q-tabs__content").children().first().click().then(() => {
            cy.wait(500)
            cy.get("div[class='q-px-lg q-mt-lg']").find("table").first().find("tr").should("contain", accountName)
            cy.get("div[class='q-px-lg q-mt-lg']").find("table").last().then(table => {
                cy.wrap(table).find("tr").eq(0).should("contain", name)
                cy.wrap(table).find("tr").eq(1).should("contain", surname)
                cy.wrap(table).find("tr").eq(2).should("contain", tel)
                cy.wrap(table).find("tr").eq(3).should("contain", email)
            })
        })
        cy.contains("Zamknij").click()
    }


    editUserData(userEmail, userName, userSurname, userTel) {
        cy.contains("Dane użytkownika").click()
        cy.contains("Edytuj").click()
        cy.get("div[class='q-gutter-xs q-list']").children().then(rows => {
            cy.wrap(rows).eq(0).find("label").clear().type(userEmail)
            cy.wrap(rows).eq(1).find("label").clear().type(userName)
            cy.wrap(rows).eq(2).find("label").clear().type(userSurname)
            cy.wrap(rows).eq(3).find("label").clear().type(userTel)
        })
        cy.contains("Zapisz").click()
        cy.get("div[class='text-weight-bold text-h6']").should("contain", userName + " " + userSurname)
        cy.get("div[class='col-auto q-pa-none q-mt-md q-card__section q-card__section--vert']").find("table").then(table => {
            cy.wrap(table).find("tr").eq(0).should("contain", userEmail)
            cy.wrap(table).find("tr").eq(1).should("contain", userTel)
        })
    }


    addUser(newUserEmail, userType, newUserName, newUserSurname, newUserTel) {
        cy.contains("Zarządzanie użytkownikami").click()
        cy.get("div[class='bg-white button q-pt-sm']").contains("Dodaj").click()
        cy.get("div[class='q-pt-lg q-gutter-xs q-list']").children().then(row => {
            cy.wrap(row).eq(0).find("label").type(newUserEmail)
            cy.wrap(row).eq(1).find("label").click()
            cy.get("div[class='q-virtual-scroll__content']").find(".q-item").eq(userType).click()
            cy.wrap(row).eq(2).find("label").type(newUserName)
            cy.wrap(row).eq(3).find("label").type(newUserSurname)
            cy.wrap(row).eq(4).find("label").type(newUserTel)
        })
        cy.contains("Zapisz").click()
        cy.get("table tbody tr").should("contain", newUserEmail, newUserName, newUserSurname)
    }


    editUser(newUserName, newUserEmail_edit, userType, newUserName_edit, newUserSurname_edit, newUserTel_edit) {
        cy.contains("Zarządzanie użytkownikami").click()
        cy.get("table tbody tr").contains(newUserName).click()
        cy.contains("Edytuj").click()
        cy.get("div[class='q-pt-lg q-gutter-xs q-list']").children().then(row => {
            cy.wrap(row).eq(0).find("label").clear().type(newUserEmail_edit)
            cy.wrap(row).eq(1).find("label").click()
            cy.get("div[class='q-virtual-scroll__content']").find(".q-item").eq(userType).click()
            cy.wrap(row).eq(2).find("label").clear().type(newUserName_edit)
            cy.wrap(row).eq(3).find("label").clear().type(newUserSurname_edit)
            cy.wrap(row).eq(4).find("label").clear().type(newUserTel_edit)
        })
        cy.contains("Zapisz").click().then(() => {
            cy.intercept("GET", Cypress.env("apiUrl") + "/api/users").as("getUsers")
            cy.wait("@getUsers")
        })
        cy.contains("Zamknij").click()
        cy.get("table tbody tr").should("contain", newUserEmail_edit, newUserName_edit, newUserSurname_edit)
    }

    
    deleteUser(newUserName_edit){
        cy.contains("Zarządzanie użytkownikami").click()
        cy.get("table tbody tr").contains(newUserName_edit).click()
        cy.contains("Edytuj").click()
        cy.contains("Usuń").click()
        cy.contains("OK").click().then(() => {
            cy.intercept("GET", Cypress.env("apiUrl") + "/api/users").as("deleteUsers")
            cy.wait("@deleteUsers", {timeout:8000})
        })
        cy.get("table tbody tr").should("not.contain", newUserName_edit)
    }
}

export const settings = new Settings()