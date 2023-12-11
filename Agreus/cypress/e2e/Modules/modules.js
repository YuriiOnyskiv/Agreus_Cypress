import { modules } from "../../Page Object/modulesPage"
import { navigate } from "../../Page Object/naviagation"
import { login } from "../../support/commands"
import 'cypress-v10-preserve-cookie'

let csrfToken
describe("Tests for modules page", () => {

    before("Login to aplication", () => {
        cy.wrap(login()).then(() => {
            modules.cleanUpAllModules()
            csrfToken = localStorage.getItem('Csrf-Token')
        })
    })

    beforeEach("Stay authorized", () => {
        cy.preserveCookieOnce('connect.sid')
        cy.visit("/")
        localStorage.setItem('Csrf-Token', csrfToken)
    })

    after("Clean up all modules after tests(AGB-2000, that can't be deleted from front)", () => {
        modules.cleanUpAllModules()
    })
    
    var moduleGroupName_soilSensors = "Grupa modułów sond(Cypress)"
    var moduleGroupName_soilSensors_edit = "Grupa modułów sond(Cypress)_edit"
    var moduleGroupName_temperatureSensors = "Grupa modułów czujników (Cypress)"
    var moduleGroupName_temperatureSensors_edit = "Grupa modułów czujników (Cypress)_edit"
    var soilSensors = 0
    var temperatureSensors = 1


    it("Stworzenie grupy modułów sond glebowych", ()=>{
        navigate.toModules()
        modules.createModuleGroup(moduleGroupName_soilSensors, soilSensors)
    })

    it("Edycja grupy modułów sond glebowych i dodanie modułu do grupy", ()=>{
        navigate.toModules()
        modules.editModuleGroup(moduleGroupName_soilSensors,moduleGroupName_soilSensors_edit)
    })

    it("Usunięcie stworzonej grupy modułów sond glebowych", ()=>{
        navigate.toModules()
        modules.deleteModuleGroup(moduleGroupName_soilSensors_edit)
    })

    it("Stworzenie grupy modułów czujników temperatury i wilgotności", ()=>{
        navigate.toModules()
        modules.createModuleGroup(moduleGroupName_temperatureSensors, temperatureSensors)
    })

    it("Edycja grupy modułów czujników temperatury i dodanie modułu do grupy", ()=>{
        navigate.toModules()
        modules.editModuleGroup(moduleGroupName_temperatureSensors, moduleGroupName_temperatureSensors_edit)
    })

    it("Usunięcie stworzonej grupy modułów czujników temperatury", ()=>{
        navigate.toModules()
        modules.deleteModuleGroup(moduleGroupName_temperatureSensors_edit)
    })

    it("Dodanie modułu AGB-2000", () => {
        navigate.toModules()
        modules.addModule("120-000-000-099", "AAAA", "AGB-2000(Cypress)")
    })

    it("Edycja modułu AGB-2000", () => {
        navigate.toModules()
        modules.editModule("AGB-2000(Cypress)", "AGB-2000(Cypress)_edit")
    })

    it("Ustawienie 2 alarmów dla modułu AGB-2000", () => {
        navigate.toModules()
        modules.setAndAssertAlarms("AGB-2000(Cypress)_edit")
    })

    it("Dodanie modułu AM-100-101", () => {
        navigate.toModules()
        modules.addModule("123-000-000-099", "AAAA", "AM-100-101(Cypress)")
    })

    it("Edycja modułu AM-100-101", () => {
        navigate.toModules()
        modules.editModule("AM-100-101(Cypress)", "AM-100-101(Cypress)_edit")
    })

    it("Ustawienie 2 alarmów dla modułu AM-100-101", () => {
        navigate.toModules()
        modules.setAndAssertAlarms("AM-100-101(Cypress)_edit")
    })

    it("Usunięcie modułu AM-100-101", () => {
        navigate.toModules()
        modules.deleteModule("AM-100-101(Cypress)_edit")
    })

    it("Dodanie modułu AM-100-051", () => {
        navigate.toModules()
        modules.addModule("124-000-000-099", "AAAA", "AM-100-051(Cypress)")
    })

    it("Edycja modułu AM-100-051", () => {
        navigate.toModules()
        modules.editModule("AM-100-051(Cypress)", "AM-100-051(Cypress)_edit")
    })

    it("Ustawienie 2 alarmów dla modułu AM-100-051", () => {
        navigate.toModules()
        modules.setAndAssertAlarms("AM-100-051(Cypress)_edit")
    })

    it("Usunięcie modułu AM-100-051", () => {
        navigate.toModules()
        modules.deleteModule("AM-100-051(Cypress)_edit")
    })

    it("Dodanie modułu AM-100-103", () => {
        navigate.toModules()
        modules.addModule("128-000-000-099", "AAAA", "AM-100-103(Cypress)")
    })

    it("Edycja modułu AM-100-103", () => {
        navigate.toModules()
        modules.editModule("AM-100-103(Cypress)", "AM-100-103(Cypress)_edit")
    })

    it("Ustawienie 2 alarmów dla modułu AM-100-103", () => {
        navigate.toModules()
        modules.setAndAssertAlarms("AM-100-103(Cypress)_edit")
    })

    it("Usunięcie modułu AM-100-103", () => {
        navigate.toModules()
        modules.deleteModule("AM-100-103(Cypress)_edit")
    })

    it("Dodanie modułu AM-100-21", () => {
        navigate.toModules()
        modules.addModule("130-000-000-099", "AAAA", "AM-100-21(Cypress)")
    })

    it("Edycja modułu AM-100-21", () => {
        navigate.toModules()
        modules.editModule("AM-100-21(Cypress)", "AM-100-21(Cypress)_edit")
    })

    it("Ustawienie 2 alarmów dla modułu AM-100-21", () => {
        navigate.toModules()
        modules.setAndAssertAlarms("AM-100-21(Cypress)_edit")
    })

    it("Usunięcie modułu AM-100-21", () => {
        navigate.toModules()
        modules.deleteModule("AM-100-21(Cypress)_edit")
    })

    it("Dodanie modułu AM-100-22", () => {
        navigate.toModules()
        modules.addModule("131-000-000-099", "AAAA", "AM-100-22(Cypress)")
    })

    it("Edycja modułu AM-100-22", () => {
        navigate.toModules()
        modules.editModule("AM-100-22(Cypress)", "AM-100-22(Cypress)_edit")
    })

    it("Ustawienie 2 alarmów dla modułu AM-100-22", () => {
        navigate.toModules()
        modules.setAndAssertAlarms("AM-100-22(Cypress)_edit")
    })

    it("Usunięcie modułu AM-100-22", () => {
        navigate.toModules()
        modules.deleteModule("AM-100-22(Cypress)_edit")
    })

    it("Dodanie modułu AM-200", () => {
        navigate.toModules()
        modules.addModule("126-000-000-099", "AAAA", "AM-200(Cypress)")
    })

    it("Edycja modułu AM-200", () => {
        navigate.toModules()
        modules.editModule("AM-200(Cypress)", "AM-200(Cypress)_edit")
    })

    it("Ustawienie 2 alarmów dla modułu AM-200", () => {
        navigate.toModules()
        modules.setAndAssertAlarms("AM-200(Cypress)_edit")
    })

    it("Usunięcie modułu AM-200", () => {
        navigate.toModules()
        modules.deleteModule("AM-200(Cypress)_edit")
    })

    it("Dodanie modułu AM-401", () => {
        navigate.toModules()
        modules.addModule("121-000-000-099", "AAAA", "AM-401(Cypress)")
    })

    it("Edycja modułu AM-401 oraz dodanie zasobów", () => {
        navigate.toModules()
        modules.editModule("AM-401(Cypress)", "AM-401(Cypress)_edit")
        modules.addResources("AM-401(Cypress)_edit")
    })

    it("Ustawienie 2 alarmów dla modułu AM-401", () => {
        navigate.toModules()
        modules.setAndAssertAlarms("AM-401(Cypress)_edit")
    })

    it("Usunięcie modułu AM-401", () => {
        navigate.toModules()
        modules.deleteModule("AM-401(Cypress)_edit")
    })

    it("Dodanie modułu AM-411", () => {
        navigate.toModules()
        modules.addModule("122-000-000-099", "AAAA", "AM-411(Cypress)")
    })

    it("Edycja modułu AM-411 oraz dodanie zasobów", () => {
        navigate.toModules()
        modules.editModule("AM-411(Cypress)", "AM-411(Cypress)_edit")
        modules.addResources("AM-411(Cypress)_edit")
    })

    it("Ustawienie 2 alarmów dla modułu AM-411", () => {
        navigate.toModules()
        modules.setAndAssertAlarms("AM-411(Cypress)_edit")
    })

    it("Usunięcie modułu AM-411", () => {
        navigate.toModules()
        modules.deleteModule("AM-411(Cypress)_edit")
    })

    it("Dodanie modułu AM-421", () => {
        navigate.toModules()
        modules.addModule("127-000-000-099", "AAAA", "AM-421(Cypress)")
    })

    it("Edycja modułu AM-421 oraz dodanie zasobów", () => {
        navigate.toModules()
        modules.editModule("AM-421(Cypress)", "AM-421(Cypress)_edit")
        modules.addResources("AM-421(Cypress)_edit")
    })

    it("Ustawienie 2 alarmów dla modułu AM-421", () => {
        navigate.toModules()
        modules.setAndAssertAlarms("AM-421(Cypress)_edit")
    })

    it("Usunięcie modułu AM-421", () => {
        navigate.toModules()
        modules.deleteModule("AM-421(Cypress)_edit")
    })

    it("Dodanie modułu AM-600", () => {
        navigate.toModules()
        modules.addModule("134-000-000-099", "AAAA", "AM-600(Cypress)")
    })

    it("Edycja modułu AM-600 oraz dodanie zasobów", () => {
        navigate.toModules()
        modules.editModule("AM-600(Cypress)", "AM-600(Cypress)_edit")
        modules.addResources("AM-600(Cypress)_edit")
    })

    it("Ustawienie 2 alarmów dla modułu AM-600", () => {
        navigate.toModules()
        modules.setAndAssertAlarms("AM-600(Cypress)_edit")
    })

    it("Usunięcie modułu AM-600", () => {
        navigate.toModules()
        modules.deleteModule("AM-600(Cypress)_edit")
    })

})