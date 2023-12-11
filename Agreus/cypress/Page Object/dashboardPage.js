export class Dashboards{
    
   
    
    createDashboard(dashboardName){
        
        cy.get(".q-mt-sm").find(".q-expansion-item").eq(0).then( dashboards2_0 =>{
            cy.wrap(dashboards2_0).click({force: true})
            cy.wrap(dashboards2_0).find("a").eq(0).click({force: true})
          })
          cy.get(".q-fab__icon-holder").click()
          cy.get(".q-fab__div").contains("Nowy pulpit").click({force:true})
          cy.get(".q-field__inner").find("input").type(dashboardName)
          cy.get(".q-gutter-md").find("button").eq(1).click()
          cy.wait(500)
          cy.get(".q-py-md").contains("Anuluj").click()
          cy.get(".q-mt-sm").find(".q-expansion-item").should("contain", dashboardName)
    }

    editDashboard(dashboardName){
        cy.get(".q-mt-sm").find(".q-expansion-item").eq(0).then( dashboards2_0 =>{
            cy.wrap(dashboards2_0).click({force: true})
            cy.wrap(dashboards2_0).contains(dashboardName).click({force: true})
          })
          cy.get(".q-py-md").contains("Anuluj").click()
          cy.get(".q-fab__icon-holder").click()
          cy.get(".q-fab__div").contains("Zmień nazwę").click({force:true})
          cy.get(".q-field__inner").find("input").clear().type(dashboardName + "(edit)")
          cy.get(".q-py-md").contains("Zapisz").click()
          cy.wait(500)
          cy.get(".q-mt-sm").find(".q-expansion-item").should("contain", dashboardName + "(edit)")
    }

    deleteDashboard(dashboardName){
        cy.get(".q-mt-sm").find(".q-expansion-item").eq(0).then( dashboards2_0 =>{
            cy.wrap(dashboards2_0).click({force: true})
            cy.wrap(dashboards2_0).contains(dashboardName).click({force: true})
          })
          cy.get(".q-py-md").contains("Anuluj").click()
          cy.get(".q-fab__icon-holder").click()
          cy.get(".q-fab__div").contains("Usuń pulpit").should("exist").click({force:true})
          cy.get(".q-ma-sm").contains("OK").click({force:true})
          cy.wait(1000)
          cy.get(".q-mt-sm").find(".q-expansion-item").should("not.contain", dashboardName + "(edit)").and("not.contain", dashboardName)
    }

    createDashboardWithWidget_Standard(dashboardName, widgetName){
        cy.get(".q-mt-sm").find(".q-expansion-item").eq(0).then( dashboards2_0 =>{
            cy.wrap(dashboards2_0).click({force: true})
            cy.wrap(dashboards2_0).find("a").eq(0).click({force: true})
          })
          cy.get(".q-fab__icon-holder").click()
          cy.get(".q-fab__div").contains("Nowy pulpit").click({force:true})
          cy.get(".q-field__inner").should("exist").find("input").type(dashboardName)
          cy.get(".q-gutter-md").find("button").eq(1).click()
          cy.get("div[class='full-height full-width overflow-auto q-pa-lg']").find(".q-pa-sm").eq(0).click()
          cy.get(".q-field__control-container").find("input").type(widgetName)
          cy.get(".q-mx-xs ").find(".q-col-gutter-md").then( recources =>{
            //Dodanie modułu pomiarowego
            cy.wrap(recources).find(".col-3").eq(0).find("button").click()
            cy.get("[class='row q-px-md q-mx-xs q-my-sm']").find("div").first().click()
            cy.get(".q-gutter-x-md").find("button").last().click({force:true})
            //Dodanie sekcji
            cy.wrap(recources).find(".col-3").eq(1).find("button").click()
            cy.get("[class='col row q-px-md q-mx-xs q-my-sm']").find("div").first().click()
            cy.get(".q-gutter-x-md").find("button").last().click({force:true})
            //Dodanie osprzetu
            cy.wrap(recources).find(".col-3").eq(2).find("button").click()
            cy.get("[class='col row q-px-md q-mx-xs q-my-sm']").find("div").first().click()
            cy.get(".q-gutter-x-md").find("button").last().click({force:true})
            //Dodanie statusu systemu
            cy.wrap(recources).find(".col-3").eq(3).find("button").click({force:true})
            cy.get("[class='col row q-px-md q-mx-xs q-my-sm']").find("div").first().click()
            cy.get(".q-gutter-x-md").find("button").last().click({force:true})
          })
          cy.get("[class='column full-width']").find("button").last().click({force:true})

          //Sprawdzenie czy widżet istnieje na pulpicie
          cy.get("[class='q-page column widgets']").should("contain", widgetName)
          //Sprawdzenie czy widżet zawiera w sobie 4 dodane elementy
          cy.get("[class='row q-col-gutter-md']").children().should("have.length", 4)
          
    }
    deleteDashboardWithWidzets(dashboardName){
      cy.get(".q-mt-sm").find(".q-expansion-item").eq(0).then( dashboards2_0 =>{
          cy.wrap(dashboards2_0).click({force: true})
          cy.wrap(dashboards2_0).contains(dashboardName).click({force: true})
        })
        cy.get(".q-fab__icon-holder").click({force:true})
        cy.get(".q-fab__div").contains("Usuń pulpit").should("exist").click({force:true})
        cy.get(".q-ma-sm").contains("OK").click({force:true})
        cy.wait(1000)
        cy.get(".q-mt-sm").find(".q-expansion-item").should("not.contain", dashboardName + "(edit)").and("not.contain", dashboardName)
  }
}

export const dashboards = new Dashboards()