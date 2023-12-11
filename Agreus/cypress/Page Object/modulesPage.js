

export class Modules {

    cleanUpAllModules() {

        const csrfToken = localStorage.getItem('Csrf-Token')
        cy.request({
            method: "POST",
            url: Cypress.env("apiUrl") + "/api/objects/test/cleanup",
            headers: {
                "csrf-token": csrfToken, // Dodanie tokena CSRF do nagłówka csrf-token
                "content-type": "application/json"
            },
            body: {},
        }).then(cleanUpRequest => {
            expect(cleanUpRequest.status).to.eq(200)
        })
    }


    addModule(serialNumber, pin, moduleName) {
        cy.get(".q-page-sticky").find("button").first().then(addbtn => {
            cy.wrap(addbtn).click({ force: true })
            cy.get(".q-pt-lg").find("input").then(inputs => {
                cy.wrap(inputs).first().type(serialNumber)
                cy.wrap(inputs).last().type(pin)
            })
        })
        cy.get(".q-gutter-md").find("button").contains("Dalej").click({ force: true })
        cy.get("div[class='q-px-lg q-list']").find("input").clear().type(moduleName)
        cy.get(".q-gutter-md").find("button").contains("Zapisz").click({ force: true }).then(() => {
            cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("contain", moduleName)
        })
    }


    chechAlarmsThresholds() {
        cy.get("div[class='col row items-center q-col-gutter-lg']").find("div[role='checkbox']").then(checkbox => {
            cy.wrap(checkbox).first().click({ force: true })
            cy.wrap(checkbox).last().click({ force: true })
        })
    }


    editModule(moduleName, moduleName_edit) {
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").contains(moduleName).click({ force: true })
        cy.get(".q-gutter-md").find("button").contains("Edytuj").click().then(() => {
            this.chechAlarmsThresholds()
            cy.get("div[class='q-px-lg q-list']").find("input").clear().type(moduleName_edit)
            cy.get(".q-gutter-md").find("button").contains("Zapisz").click({ force: true }).then(() => {
                cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("contain", moduleName_edit)
            })
        })
    }


    setAndAssertAlarms(moduleName_edit) {
        const setAlerts = []
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").contains(moduleName_edit).click({ force: true })
        cy.get(".q-gutter-md").find("button").contains("Alerty").click().then(() => {
            cy.get(".q-gutter-md").find("button").contains("Edytuj").click()
            cy.get("div[class='row items-center']").find("div[tabindex='0']").then(checkbox => {
                cy.wrap(checkbox).parent().siblings("div[class='col-12 col-md-8 custom-font custom-size']").find("span").then(span => {
                    cy.wrap(span).each(span => {
                        const text = Cypress.$(span).text()
                        setAlerts.push(text)
                    })
                })
                cy.log(setAlerts)
                cy.wrap(checkbox).click({ multiple: true })
            })
            cy.get('.q-gutter-md').find("button").contains("Zapisz").click().then(() => {
                cy.get("div[class='q-mt-lg q-gutter-y-sm']").find("i.fa-check").then(setRows => {
                    cy.wrap(setRows).each(setRows => {
                        cy.wrap(setRows).parent().siblings("div[class='col-12 col-md-8 custom-font custom-size']").find("span").then(span => {
                            const spanText = Cypress.$(span).text();
                            expect(setAlerts).to.include(spanText)
                        })
                    })
                })
            })
        })
    }


    addResources(moduleName_edit) {
        const addedResources = []
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").contains(moduleName_edit).click({ force: true })
        cy.get(".q-gutter-md").find("button").contains("Edytuj").click().then(() => {
            cy.get("div.column.q-mb-md").find("div[class='col q-list']").eq(1).then(resources => {
                cy.wrap(resources).find(".q-item").first().find("label").first().click().then(() => {
                    cy.get("div[class='q-virtual-scroll__content']").find(".q-item").last().click()
                })
                cy.wrap(resources).find(".q-item").first().find("label").last().click().then(() => {
                    cy.get("div[class='q-virtual-scroll__content']").find(".q-item").last().click()
                })
                cy.wrap(resources).find(".q-item").first().find("span").first().then(span => {
                    const spanText = Cypress.$(span).text()
                    addedResources.push(spanText)
                })
                cy.wrap(resources).find(".q-item").first().find("span").last().then(span => {
                    const spanText = Cypress.$(span).text()
                    addedResources.push(spanText)
                })
            })
            cy.get('.q-gutter-md').find("button").contains("Zapisz").click().then(() => {
                cy.get("div.column.q-mb-md").find("div[class='col q-list']").eq(1).then(resources => {//assercja, czy naprawdę zasoby zostały dodane
                    cy.wrap(resources).find(".q-item").first().find("span").each(span => {
                        const spanText = Cypress.$(span).text()
                        expect(addedResources).to.include(spanText)
                    })

                })
            })
        })

    }


    deleteModule(moduleName_edit) {
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").contains(moduleName_edit).click({ force: true })
        cy.get(".q-gutter-md").find("button").contains("Edytuj").click().then(() => {
            cy.get(".q-gutter-md").find("button").contains("Usuń").click({ force: true })
            cy.get(".q-gutter-md").find("button").contains("OK").click({ force: true }).then(() => {
                cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("not.contain", moduleName_edit)
            })
        })
    }


    createModuleGroup(moduleGroupName, groupType) {
        cy.get(".q-page-sticky").find("button").contains("Grupy").click().then(() => {
            cy.get(".q-page-sticky").find("button").first().click({ force: true })
            cy.get("div[class='q-px-lg q-list']").find("input").type(moduleGroupName)
            cy.get("div[class='col full-height full-width overflow-auto q-px-lg']").find("label").last().click().then(() => {
                cy.get(".q-virtual-scroll__content").find(".q-focus-helper").eq(groupType).click({ force: true })
            })
            cy.get(".q-gutter-md").find("button").contains("Zapisz").click()
        })
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("contain", moduleGroupName)
    }


    editModuleGroup(moduleGroupName, moduleGroupName_edit) {
        cy.get(".q-page-sticky").find("button").contains("Grupy").click()
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").contains(moduleGroupName).click()
        cy.get(".q-gutter-md").find("button").contains("Edytuj").click()
        cy.get("div[class='q-px-lg q-list']").find("input").clear().type(moduleGroupName_edit)
        this.addModuleToGroup()
        cy.contains("Zapisz").click()
        cy.contains("Zamknij").click()
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("contain", moduleGroupName_edit)

    }


    addModuleToGroup() {
        cy.get("div[class='col q-mt-lg']").find("button").click()
        cy.get("div[class='col row q-px-md q-mx-xs q-my-sm']").children().first().click()
        cy.contains("Zatwierdź").click()
        cy.get("div[class='row q-my-sm']").last().children().should("exist").and("be.visible")

    }


    deleteModuleGroup(moduleGroupName_edit) {
        cy.get(".q-page-sticky").find("button").contains("Grupy").click()
        cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").contains(moduleGroupName_edit).click()
        cy.contains("Edytuj").click()
        cy.contains("Usuń").click()
        cy.contains("OK").click().then(() => {
            cy.get("div[class='row q-py-lg q-px-xl q-col-gutter-lg']").should("not.contain", moduleGroupName_edit)
        })
    }

}

export const modules = new Modules()