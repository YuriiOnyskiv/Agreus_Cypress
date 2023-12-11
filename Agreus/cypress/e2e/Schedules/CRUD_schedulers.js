import { navigate } from "../../Page Object/naviagation"
import { schedules } from "../../Page Object/schedulesPage"
import { login } from "../../support/commands"
import 'cypress-v10-preserve-cookie'

describe("Tests for schedules page" , () => {

    before("Login to aplication", () =>{
        login()
    })

    beforeEach("Stay authorized", ()=>{
        cy.preserveCookieOnce('connect.sid')
    })
    var scheduleName = "Harmo(Cypress)"
    var scheduleName_Edit = "Harmo(Cypress)_EDIT"
    var lenghtOfImigation = 30
    var lenghtOfImigation_Edit = 40
    var startTime = "19:00"
    var startTime_Edit ="20:00"
    var numberOfcycles = 10
    var intervalBetweenCycles = 60

    it("Tworzenie sekwencyjnego harmonogramu", ()=>{
        cy.visit("/")
        navigate.toSchedules()
        schedules.createSchedulesSequentially(scheduleName, lenghtOfImigation, startTime)
    })

    it("Edycja wybranego harmonogramu", () =>{
        cy.visit("/")
        navigate.toSchedules()
        schedules.editSchedules(scheduleName, scheduleName_Edit, lenghtOfImigation_Edit, startTime_Edit)
    })

    it("Usunięcie wybranego harmonogramu", () =>{
        cy.visit("/")
        navigate.toSchedules()
        schedules.deleteSchedules(scheduleName)
    })
    
    it("Tworzenie sekwencyjnego harmonogramu z cyklami z interwałem i jego usunięcie", () =>{
        cy.visit("/")
        navigate.toSchedules()
        schedules.createSchedulesSequentiallyWithCyclesInterval(scheduleName, lenghtOfImigation, startTime, numberOfcycles, intervalBetweenCycles)
        schedules.deleteSchedules(scheduleName)
    })

})