import { navigate } from "../../Page Object/naviagation"
import { sections } from "../../Page Object/sectionPage"
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

    var sectionName = "Sekcja(Cypress)"
    var sectionName_edit = "Sekcja(Cypress)_edit"
    var sectionGroupName = "Grupa Sekcji(Cypress)"
    var sectionGroupName_edit = "Grupa Sekcji(Cypress)_edit"

    it("Tworzenie nowej sekcji", ()=>{
        navigate.toSection()
        sections.addSection(sectionName)
    })

    it("Edycja stworzonej sekcji", () =>{
        navigate.toSection()
        sections.editSection(sectionName, sectionName_edit)
    })

    it("Stworzenie nowej grupy sekcji", ()=>{
        navigate.toSection()
        sections.createSectionGroup(sectionGroupName)
    })

    it("Edycja stworzonej grupy i dodanie stworzonej sekcji do niej", ()=>{
        navigate.toSection()
        sections.editSectionGroup(sectionGroupName, sectionGroupName_edit, sectionName_edit)
    })

    it("Usunięcie stworzonej grupy sekcji", ()=>{
        navigate.toSection()
        sections.deleteGroupSection(sectionGroupName_edit)
    })
    
    it("Usunięcie stworzonej sekcji", () =>{
        navigate.toSection()
        sections.deleteSection(sectionName_edit)
    })
})