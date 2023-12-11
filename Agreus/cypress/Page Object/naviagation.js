export class Navigation{



    toDashoard(){
        cy.get(".q-mt-sm").find(".q-expansion-item").eq(0).then( dashboards2_0 =>{
            cy.wrap(dashboards2_0).click({force: true})
            cy.wrap(dashboards2_0).find("a").last().click({force: true})
          })
    }

    toSchedules(){
        cy.get(".q-mt-sm").contains("Programy nawadniania").click()
    }

    toAlarms(){
        cy.get(".q-mt-sm").contains("Alarmy").click()
    }

    toMaps(){
        cy.get(".q-mt-sm").contains("Mapa").click()
    }

    toReports(){
        cy.get(".q-mt-sm").contains("Raporty").click()
    }

    toModules(){
        cy.get(".q-mt-sm").contains("Zasoby").click()
        cy.get(".q-mt-sm").contains("Moduły").click()
    }

    toSection(){
        cy.get(".q-mt-sm").contains("Zasoby").click()
        cy.get(".q-mt-sm").contains("Sekcje").click()
    }

    toEquipment(){
        cy.get(".q-mt-sm").contains("Zasoby").click()
        cy.get(".q-mt-sm").contains("Osprzęt").click()
    }

    toWaterSource(){
        cy.get(".q-mt-sm").contains("Zasoby").click()
        cy.get(".q-mt-sm").contains("Źródła wody").click()
    }

    toMessages(){
        cy.get(".q-mt-sm").contains("Wiadomości").click()
    }

    toSettings(){
        cy.get(".q-mt-sm").contains("Ustawienia").click()
    }

}

export const navigate = new Navigation()