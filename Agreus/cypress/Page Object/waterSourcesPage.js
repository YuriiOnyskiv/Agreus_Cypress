
export class WaterSources{

    createWaterSource(waterSourceName){
        cy.get(".q-page-sticky").find("button").first().click()
        cy.get("div[class='q-px-lg q-list']").find("input").type(waterSourceName)
        cy.contains("Zapisz").click()
        cy.get("div[class='row q-pb-lg q-px-xl q-col-gutter-lg']").should("contain", waterSourceName)
    }


    editWaterSource(waterSourceName, waterSourceName_edit){
        cy.get("div[class='row q-pb-lg q-px-xl q-col-gutter-lg']").contains(waterSourceName).click()
        cy.contains("Edytuj").click()
        cy.get("div[class='q-px-lg q-list']").find("input").clear().type(waterSourceName_edit)
        cy.get("div[class='row items-end']").contains("Nawadnianie").parent().find("button").click()
        cy.get("div[class='col row q-px-md q-mx-xs q-my-sm']").children().first().click()
        cy.contains("Zatwierdź").click()
        cy.get("div[class='row items-end']").contains("Fertygacja").parent().find("button").click()
        cy.get("div[class='col row q-px-md q-mx-xs q-my-sm']").children().last().click()
        cy.contains("Zatwierdź").click()
        cy.contains("Zapisz").click().then(() => {
            cy.intercept("GET", Cypress.env("apiUrl") + "/api/water_sources").as("getRequest")
            cy.wait("@getRequest")
        })
        cy.contains("Zamknij").click()
        cy.get("div[class='row q-pb-lg q-px-xl q-col-gutter-lg']").should("contain", waterSourceName_edit)
    }


    deleteWaterSource(waterSourceName_edit){
        cy.get("div[class='row q-pb-lg q-px-xl q-col-gutter-lg']").contains(waterSourceName_edit).click()
        cy.contains("Edytuj").click()
        cy.contains("Usuń").click()
        cy.contains("OK").click()
        cy.get("div[class='row q-pb-lg q-px-xl q-col-gutter-lg']").should("not.contain", waterSourceName_edit)
    }

}

export const waterSource = new WaterSources()