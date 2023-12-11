import { navigate } from "../../Page Object/naviagation"
import { reports } from "../../Page Object/reportsPage"
import { login } from "../../support/commands"
import 'cypress-v10-preserve-cookie'

describe("Tests for reports page" , () => {
 
    before("Login to aplication", () =>{
       login()
    })

    beforeEach("Stay authorized", ()=>{
        cy.preserveCookieOnce('connect.sid')
        cy.visit("/")
    })

    var templateName = "Szablon(Cypress)"
    var templateName_edit = "Szablon(Cypress)_edit"

    it("Generowanie raportu zmian temperatury za ostatnie 24 godziny", () =>{
        navigate.toReports()
        reports.generateReport_TemperatureChange24H()
    })

    it("Generowanie raportu zmian wilgotności za ostatnie 24 godziny", ()=>{
        navigate.toReports()
        reports.generateReport_HumidityChange24H()
    })

    it("Generowanie raportu EC za ostatnie 24 godziny", ()=>{
        navigate.toReports()
        reports.generateReport_EC24H()
    })

    it("Generowanie raportu MCI za ostatnie 24 godziny", ()=>{
        navigate.toReports()
        reports.generateReport_MCI24H()
    })

    it("Generowanie raportu punktu rosy za ostatnie 24 godziny", ()=>{
        navigate.toReports()
        reports.generateReport_DewPoint24H()
    })

    it("Generowanie raportu temperatury termometru mokrego za ostatnie 24 godziny", ()=>{
        navigate.toReports()
        reports.generateReport_WetThermometer24H()
    })

    it("Generowanie raportu niedosytu wilgotności za ostatnie 24 godziny", ()=>{
        navigate.toReports()
        reports.generateReport_HumidityInsufficiency24H()
    })

    it("Generowanie raportu zwilżenia liścia za ostatnie 24 godziny", ()=>{
        navigate.toReports()
        reports.generateReport_LeafWetness24H()
    })

    it("Generowanie raportu PWI za ostatnie 24 godziny", ()=>{
        navigate.toReports()
        reports.generateReport_PWI24H()
    })
    
    it("Generowanie raportu złożonego za ostatnie 24 godziny", ()=>{
        navigate.toReports()
        reports.generateReport_Complex24H()
    })

    it("Stworzenie nowego szablonu", ()=>{
        navigate.toReports()
        reports.createTemplate(templateName)
    })

    it("Edycja stworzonego szablonu", () =>{
        navigate.toReports()
        reports.editTemplate(templateName, templateName_edit)
    })

    it("Usunięcie stworzonego szablonu", ()=>{
        navigate.toReports()
        reports.deleteTemplate(templateName_edit)
    })
})