import { navigate } from "../../Page Object/naviagation"
import { equipment } from "../../Page Object/equipmentPage"
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

    var equipmentNameExecutive = "Osprzęt wykonawczy(Cypress)"
    var equipmentNameExecutive_edit = "Osprzęt wykonawczy(Cypress)_edit"
    var equipmentNameMeasuring = "Osprzęt pomiarowy(Cypress)" 
    var equipmentNameMeasuring_edit = "Osprzęt pomiarowy(Cypress)_edit"
    var equipmentGroupName = "Grupa osprzętu(Cypress)"
    var equipmentGroupName_edit = "Grupa osprzętu(Cypress)_edit"
    var executiveKind = 0
    var measuringKind = 1
    var devisesExecutive = {
        mixer : "Mikser",
        pump : "Pompa",
        light : "Oświetlenie",
        valve : "Zawór",
        roller_blinds : "Rolety",
        heating : "Ogrzewanie",
        cooling : "Chłodzenie",
        ventilation : "Wentylacja",
        other_executive_device : "Inne urządzenie wykonawcze"
    }
    var devisesMeasuring = {
        manometr : "Manometr",
        udometr : "Deszczomierz",
        wind_direction : "Kierunek wiatru",
        wind_speed : "Prędkość wiatru",
        other_measuring_device : "Inne urządzenie pomiarowe"
    }


    it("Stworzenie osprzętu wykonawczego", ()=>{
        navigate.toEquipment()
        equipment.createEquipment(equipmentNameExecutive,executiveKind, devisesExecutive.mixer)
    })

    it("Edycja stworzonego osprzętu wykonawczego", ()=>{
        navigate.toEquipment()
        equipment.editEquipment(equipmentNameExecutive, equipmentNameExecutive_edit)
    })

    it("Stworzenie grupy osprzętu wykonawczego", ()=>{
        navigate.toEquipment()
        equipment.createEquipmentGroup(equipmentGroupName)
    })

    it("Edycja grupy i dodanie do niej stworzonego osprzętu wykonawczego", ()=>{
        navigate.toEquipment()
        equipment.editEquipmentGroup(equipmentGroupName,equipmentGroupName_edit,equipmentNameExecutive_edit)
    })

    it("Usunięcie grupy osprzętu wykonawczego", ()=>{
        navigate.toEquipment()
        equipment.deleteEquipmentGroup(equipmentGroupName_edit)
    })

    it("Usunięcie stworzonego osprzętu wykonawczego", ()=>{
        navigate.toEquipment()
        equipment.deleteEquipment(equipmentNameExecutive_edit)
    })

    it("Stworzenie osprzętu pomiarowego", ()=>{
        navigate.toEquipment()
        equipment.createEquipment(equipmentNameMeasuring,measuringKind, devisesMeasuring.udometr)
    })

    it("Edycja stworzonego osprzętu pomiarowego", ()=>{
        navigate.toEquipment()
        equipment.editEquipment(equipmentNameMeasuring, equipmentNameMeasuring_edit)
    })

    it("Usunięcie stworzonego osprzętu pomiarowego", ()=>{
        navigate.toEquipment()
        equipment.deleteEquipment(equipmentNameMeasuring_edit)
    })

})