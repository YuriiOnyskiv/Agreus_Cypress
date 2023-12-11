import { maps } from "../../Page Object/mapPage"
import { navigate } from "../../Page Object/naviagation"
import { login } from "../../support/commands"
import 'cypress-v10-preserve-cookie'

describe("Tests for map page" , () => {
 
    before("Login to aplication", () =>{
       login()
    })

    beforeEach("Stay authorized", ()=>{
        cy.preserveCookieOnce('connect.sid')
    })

    var regionName = "Obszar(Cypress)"
    var regionName_edit = "Obszar(Cypress)_edit"
    var objectName = "Obiekt(Cypress)"
    var objectName_edit = "Obiekt(Cypress)_edit"

    it("Tworzenie nowego obszaru", () =>{
        cy.visit("/")
        navigate.toMaps()
        cy.wait(500)
        maps.createRegion(regionName)
    })

    it("Edycja stworzonego obszaru", () =>{
        cy.visit("/")
        navigate.toMaps()
        cy.wait(500)
        maps.editRegion(regionName_edit)
    })

    it("Usunięcie stworzonego obszaru", () =>{
        cy.visit("/")
        navigate.toMaps()
        cy.wait(500)
        maps.deleteRegion(regionName_edit)
    })

    it("Tworzenie nowego obiektu, jego edycja oraz usunięcie", ()=>{
        cy.visit("/")
        navigate.toMaps()
        cy.wait(500)
        cy.wrap(maps.createObject(objectName)).then(()=>{
            maps.editObject(objectName_edit)
            maps.deleteObject(objectName_edit)
        })
        
    })

})