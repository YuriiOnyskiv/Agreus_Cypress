
export class Equipment{

    createEquipment(equipmentName, equipmentKind, equipmentType){
        cy.get(".q-page-sticky").find("button").first().click()
        cy.get("div[class='q-px-lg q-list']").find("input").type(equipmentName)
        cy.get(".q-px-lg").last().then( rows =>{
            cy.wrap(rows).find("div[class='q-item q-item-type row no-wrap q-pa-none q-pb-sm q-mb-xs custom-size q-item--dense']").eq(0).then( deviceKind=>{
                cy.wrap(deviceKind).find("label").click()
                cy.get(".q-virtual-scroll__content").find(".q-focus-helper").eq(equipmentKind).click({force: true})
            })
            cy.wrap(rows).find("div[class='q-item q-item-type row no-wrap q-pa-none q-pb-sm q-mb-xs custom-size q-item--dense']").eq(1).then( deviceType=>{
                cy.wrap(deviceType).find("label").click()
                cy.get(".q-virtual-scroll__content").find(".q-item__label").contains(equipmentType).click({force:true})
            }).then(()=>{
                cy.wrap(rows).find("div[class='q-item q-item-type row no-wrap q-pa-none q-pb-sm q-mb-xs custom-size']").last().then( controlModule =>{
                    cy.wrap(controlModule).find("label").first().click().then( module=>{
                        cy.wrap(module).get(".q-virtual-scroll__content").children().last().click()
                    })
                    cy.wrap(controlModule).find("label").last().click().then( output=>{
                        cy.wrap(output).get(".q-virtual-scroll__content").children().last().click()
                    })
                })
            })
        })
        cy.contains("Zapisz").click()
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("contain", equipmentName)
    }


    editEquipment(equipmentName, equipmentName_edit){
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").contains(equipmentName).click()
        cy.contains("Edytuj").click()
        cy.get("div[class='q-px-lg q-list']").find("input").clear().type(equipmentName_edit)
        cy.get(".q-px-lg").last().then( rows =>{
            cy.wrap(rows).find("div[class='q-item q-item-type row no-wrap q-pa-none q-pb-sm q-mb-xs custom-size']").last().then( controlModule =>{
                cy.wrap(controlModule).find("label").first().click().then( module=>{
                    cy.wrap(module).get(".q-virtual-scroll__content").children().last().prev().invoke("text").then(text=>{
                        if(text !== 'Brak'){
                            cy.wrap(module).get(".q-virtual-scroll__content").children().last().prev().click()
                        }
                        else{
                            cy.wrap(module).get(".q-virtual-scroll__content").children().last().click()
                        }
                    })
                })
                cy.wrap(controlModule).find("label").last().click().then( output=>{
                    cy.wrap(output).get(".q-virtual-scroll__content").children().last().click()
                })
            })
        })
        cy.contains("Zapisz").click()
        cy.contains("Zamknij").click()
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("contain", equipmentName_edit)
    }


    deleteEquipment(equipmentName_edit){
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").contains(equipmentName_edit).click()
        cy.contains("Edytuj").click()
        cy.contains("Usuń").click()
        cy.contains("OK").click()
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("not.contain", equipmentName_edit)

    }


    createEquipmentGroup(equipmentGroupName) {
        cy.get(".q-page-sticky").find("button").contains("Grupy").click().then(() => {
            cy.get(".q-page-sticky").find("button").first().click({ force: true })
            cy.get("div[class='q-px-lg q-list']").find("input").type(equipmentGroupName)
            cy.get(".q-gutter-md").find("button").contains("Zapisz").click()
        })
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("contain", equipmentGroupName)
    }


    editEquipmentGroup(equipmentGroupName, equipmentGroupName_edit, equipmentName_edit) {
        cy.get(".q-page-sticky").find("button").contains("Grupy").click()
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").contains(equipmentGroupName).click()
        cy.get(".q-gutter-md").find("button").contains("Edytuj").click()
        cy.get("div[class='q-px-lg q-list']").find("input").clear().type(equipmentGroupName_edit)
        this.addEquipmentToGroup(equipmentName_edit)
        cy.contains("Zapisz").click().then(() => {
            cy.intercept("GET", Cypress.env("apiUrl") + "/api/groups").as("getRequest")
            cy.wait("@getRequest")
        })
        cy.contains("Zamknij").click()
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("contain", equipmentGroupName_edit)
        
    }



    addEquipmentToGroup(equipmentName_edit) {
        cy.get("div[class='col q-mt-lg']").find("button").click()
        cy.get("div[class='col row q-px-md q-mx-xs q-my-sm']").contains(equipmentName_edit).parent().click()
        cy.contains("Zatwierdź").click()
        cy.get("div[class='row q-my-sm']").should("contain", equipmentName_edit)

    }


    deleteEquipmentGroup(equipmentGroupName_edit){
        cy.get(".q-page-sticky").find("button").contains("Grupy").click()
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").contains(equipmentGroupName_edit).click()
        cy.contains("Edytuj").click()
        cy.contains("Usuń").click()
        cy.contains("OK").click().then(() => {
            cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("not.contain", equipmentGroupName_edit)
        })
    }












}

export const equipment = new Equipment()