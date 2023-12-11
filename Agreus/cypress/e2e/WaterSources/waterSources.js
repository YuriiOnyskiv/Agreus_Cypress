import { navigate } from "../../Page Object/naviagation"
import { waterSource } from "../../Page Object/waterSourcesPage"
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

    var waterSourceName = "Źródło wody(Cypress)"
    var waterSourceName_edit = "Źródło wody(Cypress)_edit"

    it("Stworzenie źródła wody", ()=>{
        navigate.toWaterSource()
        waterSource.createWaterSource(waterSourceName)
    })

    it("Edycja źródła wody i dodanie nawadniania oraz fertygacji", ()=>{
        navigate.toWaterSource()
        waterSource.editWaterSource(waterSourceName, waterSourceName_edit)
    })

    it("Usunięcie źródła wody", ()=>{
        navigate.toWaterSource()
        waterSource.deleteWaterSource(waterSourceName_edit)
    })
})