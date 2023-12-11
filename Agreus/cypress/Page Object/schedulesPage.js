export class Schedules{
   
    createSchedulesSequentially(scheduleName,lenghtOfImigation,startTime){
        
        cy.get(".plus-button").find("button").click({force:true})
        cy.get(".agreus-750-dialog").find(".q-mb-md").find("div").last().type(scheduleName)
        cy.get(".q-col-gutter-y-lg").find(".col").eq(0).then( section_OR_grupSection =>{   //formularz jest podzielony na kilka kolumn(a tak naprawdzę wierszów) w danej klasie
            cy.wrap(section_OR_grupSection).find(".row, .items-end").find("button").click({force:true})
            cy.get(".q-py-md").find("label").first().click({force:true})//wybranie pierwszej sekcji na liście
            cy.get("[class='row justify-center q-gutter-md q-py-md']").find("button").click({force:true})
            cy.get(".column, .q-gutter-y-sm, .q-list").find(".column, .q-gutter-y-sm").find(".q-mb-xs, .text-dark").find("button").should("exist")
            cy.wrap(section_OR_grupSection).find(".q-mb-xs, .text-dark").find("input").type(lenghtOfImigation)
        })           
        cy.get(".q-col-gutter-y-lg").children(".col").eq(3).then( startTimeSection =>{
            cy.wrap(startTimeSection).find(".q-list").find(".q-item").find("input").type(startTime)//ustawienie czasu startu nawadniania
        })
        cy.get("[class='row justify-center q-py-md  q-gutter-md']").find("button").contains("Zapisz").click({force:true})
        cy.get(".scheduler2").should('contain', scheduleName)//sprawdzenie czy stworzony harmonogram wyświetla się na liście harmonogramów
    }

    
    createSchedulesSequentiallyWithCyclesInterval(scheduleName,lenghtOfImigation,startTime, numberOfcycles, intervalBetweenCycles){
        cy.get(".plus-button").find("button").click({force:true})
        cy.get(".agreus-750-dialog").find(".q-mb-md").find("div").last().type(scheduleName)
        cy.get(".q-col-gutter-y-lg").find(".col").eq(0).then( section_OR_grupSection =>{   //formularz jest podzielony na kilka kolumn(a tak naprawdzę wierszów) w danej klasie
            cy.wrap(section_OR_grupSection).find(".row, .items-end").find("button").click({force:true})
            cy.get(".q-py-md").find("label").first().click({force:true})//wybranie pierwszej sekcji na liście
            cy.get("[class='row justify-center q-gutter-md q-py-md']").find("button").click({force:true})
            cy.get(".column, .q-gutter-y-sm, .q-list").find(".column, .q-gutter-y-sm").find(".q-mb-xs, .text-dark").find("button").should("exist")
            cy.wrap(section_OR_grupSection).find(".q-mb-xs, .text-dark").find("input").type(lenghtOfImigation)
        })
        cy.get(".q-col-gutter-y-lg").children(".col").eq(2).then( cycles =>{//ustawienie ilości cykli
            cy.wrap(cycles).find(".q-list").find("input").clear().type(numberOfcycles)
            cy.wrap(cycles).find(".q-list").children().eq(2).find("input").clear().type(intervalBetweenCycles)
        })
        cy.get(".q-col-gutter-y-lg").children(".col").eq(3).then( startTimeSection =>{
            cy.wrap(startTimeSection).find(".q-list").find(".q-item").find("input").type(startTime)//ustawienie czasu startu nawadniania
        })
        cy.get("[class='row justify-center q-py-md  q-gutter-md']").find("button").contains("Zapisz").click({force:true}).then(()=>{
            cy.get(".scheduler2").should('contain', scheduleName)//sprawdzenie czy stworzony harmonogram wyświetla się na liście harmonogramów 
        })
                 

    }


    editSchedules(scheduleName, scheduleName_Edit, lenghtOfImigation_Edit, startTime_Edit){
        cy.contains(scheduleName).parents("div[class='col row']").invoke("attr", "id").then( id =>{
            cy.get("#" + id).find("[class='column q-gutter-y-sm relative-position cursor-pointer schMainRow']").click()
        })
        cy.contains("Edytuj").click()
        cy.get(".agreus-750-dialog").find(".q-mb-md").find("div").last().clear().type(scheduleName_Edit)
        cy.get(".q-col-gutter-y-lg").find(".col").eq(0).then( section_OR_grupSection =>{
            cy.wrap(section_OR_grupSection).find(".q-mb-xs, .text-dark").find("input").clear().type(lenghtOfImigation_Edit)
        })
        cy.get(".q-col-gutter-y-lg").children(".col").eq(3).then( startTimeSection =>{
            cy.wrap(startTimeSection).find(".q-list").find(".q-item").find("input").clear().type(startTime_Edit)
        })
        cy.contains("Zapisz").click({force:true})
        cy.get(".scheduler2").should('contain', scheduleName_Edit)//sprawdzenie czy zmieniony harmonogram wyświetla się na liście harmonogramów
    }
    

    deleteSchedules(scheduleName){

        cy.contains(scheduleName).parents("div[class='col row']").invoke("attr", "id").then( id =>{
            cy.get("#" + id).find("[class='column q-gutter-y-sm relative-position cursor-pointer schMainRow']").click()
        })
        cy.contains("Edytuj").click()
        cy.contains("Usuń").click()
        cy.contains("OK").click()
        cy.get(".scheduler2").should("not.contain.text", scheduleName)//sprawdzenie czy usunięty harmonogram nie wyświetla się na liście
    }
}

export const schedules = new Schedules()