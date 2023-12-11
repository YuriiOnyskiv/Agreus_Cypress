import { alerts, checkFirstTwoUnconfirmedRows, checkAndSelectFirstTenActiveRows, checkAndSelectFirstTwoInactiveRows, deleteSelectedRows, confirmSelectedRows, assertConfirmedRows, assertDeletedRows, assertValidationPopUp, deleteSelectedActiveRows} from "../../Page Object/alertPage"
import { navigate } from "../../Page Object/naviagation"
import { login } from "../../support/commands"
import 'cypress-v10-preserve-cookie'


describe("Tests for alert page" , () => {

    before("Login to aplication", () =>{
        login()
    })

    beforeEach("stay authorized", ()=>{
        cy.preserveCookieOnce('connect.sid')
    })
    it("Zaznaczenie pierwszych 10 alertów, które są aktywne i próba ich usunięcia. W końcu idzie asercja która sprawdza czy pojawia się pop-up informacyjny", () =>{
        cy.visit("/")
        navigate.toAlarms()
        cy.wait(1000)
        checkAndSelectFirstTenActiveRows()
        deleteSelectedActiveRows()
        assertValidationPopUp()

    })
    
    it("Zaznaczenie pierwszych 2 niepotwierdzonych alertów i potwierdzenie ich. W końcu idzie asercja która sprawdza przez ID czy zmienił się status", () =>{
        cy.visit("/")
        navigate.toAlarms()
        cy.wait(1000)
        checkFirstTwoUnconfirmedRows()
        confirmSelectedRows()
        assertConfirmedRows()
    })

    it("Zaznaczenie pierwszych 2 nieaktywnych alertów i usunięcie ich. W końcu idzie asercja która sprawdza czy nie istnieje czasem ID usuniętego wiersza na stronie", () =>{
        cy.visit("/")
        navigate.toAlarms()
        cy.wait(1000)
        checkAndSelectFirstTwoInactiveRows()
        deleteSelectedRows()
        assertDeletedRows()
    })
    
})