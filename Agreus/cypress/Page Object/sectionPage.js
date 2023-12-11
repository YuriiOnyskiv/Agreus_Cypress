
export class Sections {

    addSection(sectionName) {
        cy.get(".q-page-sticky").find("button").first().click({ force: true }).then(() => {
            cy.get("div[class='q-px-lg q-list']").find("input").type(sectionName)
            cy.get("div[class='q-item q-item-type row no-wrap q-pa-none q-pb-sm q-mb-xs custom-size']").then(rows => {
                cy.wrap(rows).eq(2).find("label").click()
                cy.get("div[class='q-virtual-scroll__content']").find(".q-item").last().click()
                cy.wrap(rows).eq(3).find("label").first().click()
                cy.get("div[class='q-virtual-scroll__content']").find(".q-item").last().click()
                cy.wrap(rows).eq(3).find("label").last().click()
                cy.get("div[class='q-virtual-scroll__content']").find(".q-item").last().click()
            })
        })
        cy.get(".q-gutter-md").find("button").contains("Zapisz").click().then(() => {
            cy.intercept("Post", Cypress.env("apiUrl") + "/api/components/irr").as("postRequest")
            cy.wait("@postRequest")
            cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("contain", sectionName)
        })
    }


    editSection(sectionName, sectionName_edit) {
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").contains(sectionName).click({ force: true })
        cy.get(".q-gutter-md").find("button").contains("Edytuj").click()
        cy.intercept("POST", Cypress.env("apiUrl") + "/api/components/free").as("postRequest")
        cy.wait("@postRequest")
        cy.get("div[class='q-item q-item-type row no-wrap q-pa-none q-pb-sm q-mb-xs custom-size']").then(rows => {
            cy.wrap(rows).eq(2).find("label").click()
            cy.get("div[class='q-virtual-scroll__content']").find(".q-item").last().prev().invoke("text").then(text =>{
                if(text !== 'Brak'){
                    cy.get("div[class='q-virtual-scroll__content']").find(".q-item").last().prev().click()
                }else{
                    cy.get("div[class='q-virtual-scroll__content']").find(".q-item").last().click()
                }
            })
            cy.wrap(rows).eq(3).find("label").first().click()
            cy.get("div[class='q-virtual-scroll__content']").find(".q-item").last().prev().invoke("text").then(text =>{
                if(text !== 'Brak'){
                    cy.get("div[class='q-virtual-scroll__content']").find(".q-item").last().prev().click()
                }else{
                    cy.get("div[class='q-virtual-scroll__content']").find(".q-item").last().click()
                }
            })
            cy.wrap(rows).eq(3).find("label").last().click()
            cy.get("div[class='q-virtual-scroll__content']").find(".q-item").last().click()
        })
        cy.get("div[class='q-px-lg q-list']").find("input").clear().type(sectionName_edit)
        cy.get(".q-gutter-md").find("button").contains("Zapisz").click().then(() => {
            cy.intercept("GET", Cypress.env("apiUrl") + "/api/components/irr").as("getRequest")
            cy.wait("@getRequest")
            cy.get(".q-gutter-md").find("button").contains("Zamknij").click({ force: true })
            cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("exist").and("contain", sectionName_edit)
        })
    }


    deleteSection(sectionName_edit) {
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").contains(sectionName_edit).click({ force: true })
        cy.get(".q-gutter-md").find("button").contains("Edytuj").click().then(() => {
            cy.intercept("GET", Cypress.env("apiUrl") + "/token").as("getToken")
            cy.wait("@getToken")
            cy.contains("Usuń").click()
            cy.contains("OK").click().then(() => {
                cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("not.contain", sectionName_edit)
            })
        })
    }


    createSectionGroup(sectionGroupName) {
        cy.get(".q-page-sticky").find("button").contains("Grupy").click().then(() => {
            cy.get(".q-page-sticky").find("button").first().click({ force: true })
            cy.get("div[class='q-px-lg q-list']").find("input").type(sectionGroupName)
            cy.get(".q-gutter-md").find("button").contains("Zapisz").click()
        })
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("contain", sectionGroupName)
    }


    editSectionGroup(sectionGroupName, sectionGroupName_edit, sectionName_edit) {
        cy.get(".q-page-sticky").find("button").contains("Grupy").click()
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").contains(sectionGroupName).click()
        cy.get(".q-gutter-md").find("button").contains("Edytuj").click()
        cy.get("div[class='q-px-lg q-list']").find("input").clear().type(sectionGroupName_edit)
        this.addSectionToGroup(sectionName_edit)
        cy.get(".q-gutter-md").find("button").contains("Zapisz").click().then(() => {
            cy.intercept("GET", Cypress.env("apiUrl") + "/api/groups").as("getRequest")
            cy.wait("@getRequest")
            cy.get(".q-gutter-md").find("button").contains("Zamknij").click()
            cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("contain", sectionGroupName_edit)
        })
    }



    addSectionToGroup(sectionName_edit) {
        cy.get("div[class='col q-mt-lg']").find("button").click()
        cy.get("div[class='col row q-px-md q-mx-xs q-mt-sm q-mb-sm']").contains(sectionName_edit).parent().click()
        cy.contains("Zatwierdź").click()
        cy.get("div[class='row q-my-sm']").should("contain", sectionName_edit)

    }

    deleteGroupSection(sectionGroupName_edit){
        cy.get(".q-page-sticky").find("button").contains("Grupy").click()
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").contains(sectionGroupName_edit).click()
        cy.contains("Edytuj").click()
        cy.contains("Usuń").click()
        cy.contains("OK").click().then(() => {
            cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("not.contain", sectionGroupName_edit)
        })
    }
}

export const sections = new Sections()