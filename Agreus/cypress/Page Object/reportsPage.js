
export class Reports{

    set24H_generate_assert(){
        cy.get("div[class='row items-center q-col-gutter-y-sm q-col-gutter-x-md']").children().last().contains("button", "24H").click({force:true})
        cy.get("div[class='q-card__section q-card__section--vert']").find(".q-list").children("label").first().click({force:true})
        cy.get("div[class='col row justify-center q-gutter-md']").contains("Generuj").click({force:true})
        cy.get(".q-tab-panel", {timeout: 30000}).should("exist").and("be.visible").then(tabpanel =>{
            cy.wrap(tabpanel).find("canvas").should("exist").and("be.visible")
        })
    }
    generateReport_TemperatureChange24H(){
        cy.get("div[class='q-py-sm q-list']").first().children().eq(0).click({force:true})
        this.set24H_generate_assert()
    }

    generateReport_HumidityChange24H(){
        cy.get("div[class='q-py-sm q-list']").first().children().eq(1).click({force:true})
        this.set24H_generate_assert()
    }

    generateReport_EC24H(){
        cy.get("div[class='q-py-sm q-list']").first().children().eq(2).click({force:true})
        this.set24H_generate_assert()
    }

    generateReport_MCI24H(){
        cy.get("div[class='q-py-sm q-list']").first().children().eq(3).click({force:true})
        this.set24H_generate_assert()
    }

    generateReport_DewPoint24H(){
        cy.get("div[class='q-py-sm q-list']").first().children().eq(4).click({force:true})
        this.set24H_generate_assert()
    }

    generateReport_WetThermometer24H(){
        cy.get("div[class='q-py-sm q-list']").first().children().eq(5).click({force:true})
        this.set24H_generate_assert()
    }

    generateReport_HumidityInsufficiency24H(){
        cy.get("div[class='q-py-sm q-list']").first().children().eq(6).click({force:true})
        this.set24H_generate_assert()
    }

    generateReport_LeafWetness24H(){
        cy.get("div[class='q-py-sm q-list']").first().children().eq(7).click({force:true})
        this.set24H_generate_assert()
    }

    generateReport_PWI24H(){
        cy.get("div[class='q-py-sm q-list']").first().children().eq(8).click({force:true})
        cy.get(".q-mt-md").find("div[class='q-card__section q-card__section--vert']").last().find("input").click({force:true})
        cy.get("#qvs_1").find(".q-item__label").first().click({force:true})
        cy.get("div[class='col row justify-center q-gutter-md']").contains("Generuj").click({force:true})
        cy.get(".q-tab-panel", {timeout: 30000}).should("exist").and("be.visible").then(tabpanel =>{
            cy.wrap(tabpanel).find("canvas").should("exist").and("be.visible")
        })
    }

    generateReport_Complex24H(){
        cy.get("div[class='q-py-sm q-list']").first().children().eq(9).click({force:true})
        cy.get(".q-mt-md").find("div[class='q-card__section q-card__section--vert']").last().find("input").click({force:true})
        cy.get("#qvs_1").find(".q-item__label").first().click({force:true})
        cy.get("div[class='q-pt-sm q-card__section q-card__section--vert']").find(".q-list").children("label").first().click({force:true})
        cy.get("div[class='col row justify-center q-gutter-md']").contains("Generuj").click({force:true})
        cy.get(".q-tab-panel", {timeout: 30000}).should("exist").and("be.visible").then(tabpanel =>{
            cy.wrap(tabpanel).find("canvas").should("exist").and("be.visible")
        })
    }

    createTemplate(templateName){
        cy.get("div[class='q-py-sm q-list']").first().children().eq(0).click({force:true})
        cy.get("div[class='row items-center q-col-gutter-y-sm q-col-gutter-x-md']").children().last().contains("button", "24H").click({force:true})
        cy.get("div[class='q-card__section q-card__section--vert']").find(".q-list").children("label").first().click({force:true})
        cy.get("div[class='col row justify-center q-gutter-md']").contains("Zapisz szablon").click({force:true})
        cy.get("div[class='q-py-md full-width']").find("input").type(templateName)
        cy.get(".q-gutter-md").find("button").contains("OK").click({force:true}).then(()=>{
            cy.get("div[class='row q-col-gutter-xl settings']").find("div[class='col-xs-12 col-lg-5']").last().should("contain", templateName).and("be.visible")
        })
    }

    editTemplate(templateName, templateName_edit){
        cy.get("div[class='row q-col-gutter-xl settings']").find("div[class='col-xs-12 col-lg-5']").last().contains(templateName).click({force:true})
        cy.get("div[class='col row justify-center q-gutter-md']").contains("Edytuj").click({force:true})
        cy.get("div[class='row items-center q-col-gutter-y-sm q-col-gutter-x-md']").children().last().contains("button", "48H").click({force:true})
        cy.get("div[class='q-item__section column q-item__section--main justify-center']").find("input").clear().type(templateName_edit)
        cy.get("div[class='q-card__section q-card__section--vert']").find(".q-list").children("label").last().click({force:true})
        cy.get("div[class='col row justify-center q-gutter-md']").contains("Zapisz zmiany").click({force:true})
        cy.get(".q-gutter-md").find("button").contains("OK").click({force:true})
        cy.get("div[role='toolbar']").find("button").click({force:true}).then(()=>{
            cy.get("div[class='row q-col-gutter-xl settings']").find("div[class='col-xs-12 col-lg-5']").last().should("contain", templateName_edit).and("be.visible")
        })
    }

    deleteTemplate(templateName_edit){
        cy.get("div[class='row q-col-gutter-xl settings']").find("div[class='col-xs-12 col-lg-5']").last().contains(templateName_edit).click({force:true})
        cy.get("div[class='col row justify-center q-gutter-md']").contains("Edytuj").click({force:true})
        cy.get("div[class='col row justify-center q-gutter-md']").contains("Usuń").click({force:true})
        cy.get(".q-gutter-md").find("button").contains("OK").click({force:true}).then(()=>{
            cy.wait(500)
            cy.get("div[class='row q-col-gutter-xl settings']").find("div[class='col-xs-12 col-lg-5']").last().should("not.contain", templateName_edit)
        })
    }
}

export const reports = new Reports()