import { dashboards } from "../../Page Object/dashboardPage"
import { navigate } from "../../Page Object/naviagation"
import { login } from "../../support/commands"
import 'cypress-v10-preserve-cookie'

describe("Tests for dashboard page" , () => {

    before("Login to aplication", () =>{
        login()
    })
    
    beforeEach("Stay authorized", ()=>{
      cy.preserveCookieOnce('connect.sid')
    })

    var dashboardName = "Cypress3"
    var widgetName = "Cypress_widget"


    it("Stworzenie nowego pustego pulpitu", () =>{ 
      cy.visit("/")
      dashboards.createDashboard(dashboardName)
    })

    it("Edycja wcześniej stworzonego pustego pulpitu", () =>{
      cy.visit("/")
      dashboards.editDashboard(dashboardName)
    })

    it("Usuniecie wcześniej stworzonego pustego pulpitu", () =>{
      cy.visit("/")
      dashboards.deleteDashboard(dashboardName)
    })

    it("Strorzenie nowego pulpitu z widżetami", () =>{
      cy.visit("/")
      dashboards.createDashboardWithWidget_Standard(dashboardName, widgetName)
    })

    it("Usunięcie pulpitu z widżetami", () =>{
      cy.visit("/")
      dashboards.deleteDashboardWithWidzets(dashboardName)
    })
})
