
let savedTransformValues = {}

export class Maps {


    createRegion(regionName) {

        cy.get(".q-fab__icon-holder").click({ force: true })
        cy.get(".q-fab__div").contains("Utwórz obszar").click({ force: true })
        cy.get("main[class='q-page flex column']").find("div[class='col row']").children(0).should("exist").as("map")
        cy.wait(1000)//musimy zaczekać żeby mapa się załadowała
        cy.get("@map").click(580, 400).wait(500)
            .click(580, 700).wait(500)
            .click(1200, 700).wait(500)
            .click(1200, 400).wait(500)
            .click(580, 400).wait(500)
        cy.get("div[class='q-gutter-sm leaflet-control']").find("button").first().invoke('attr', "tabindex").then(tabindex => {
            if (tabindex == -1) {//dodatkowe zabezpieczenie w przypadku gdy nie mapa nie zdąży się załadować a już kliknięmy pierwszy punkt
                cy.get("@map").click(580, 400)
                    .click(580, 250)
            }
        })
        cy.get("div[class='q-gutter-sm leaflet-control']").find("button").first().should("have.attr", "tabindex", "0").then(savebtn => {
            cy.wrap(savebtn).click({ force: true })
            cy.get("div[class='relative-position bg-white col agreus-750-dialog']").find("div[class='q-gutter-xs q-list']").find("label").type(regionName)
            cy.get("div[class='row q-py-md full-width justify-center relative-position']").find("button").contains("Zapisz").click({ force: true })
        }).then(() => {
            cy.wait(500)
            cy.get("@map").click(900, 500).then(region => {
                cy.wrap(region).get(".leaflet-popup-content-wrapper").find(".q-mt-lg").should("contain", regionName)
            })
        })
    }

    editRegion(regionName_edit) {
        cy.get("main[class='q-page flex column']").find("div[class='col row']").children(0).should("exist").as("map")
        cy.wait(1000)
        cy.get("@map").click(900, 500).then(region => {
            cy.wrap(region).get(".leaflet-popup-content-wrapper").find("i").last().click({ force: true }).then(editWindow => {
                cy.wrap(editWindow).get("div[class='relative-position bg-white col agreus-750-dialog']").find("div[class='q-gutter-xs q-list']").find("label").clear()
                    .type(regionName_edit)
                //cy.get("div[class='leaflet-pane leaflet-map-pane']").last().find("div[class='leaflet-pane leaflet-marker-pane']").last().children().first().as("point") to należy dorobić, nie działa drag and drop.
                // cy.get("@point").trigger("mousedown", {button: 0, force: true}).trigger('mousemove', {X: 50, Y: 60, force: true}).trigger("mouseup", {force: true})
                cy.get("div[class='row q-py-md full-width justify-center relative-position']").find("button").contains("Zapisz").click({ force: true })
            })
        }).then(() => {
            cy.get("@map").click(900, 500).then(region => {
                cy.wrap(region).get(".leaflet-popup-content-wrapper").find(".q-mt-lg").should("contain", regionName_edit)
            })
        })
    }

    deleteRegion(regionName_edit) {
        cy.get("main[class='q-page flex column']").find("div[class='col row']").children(0).should("exist").as("map")
        cy.wait(1000)
        cy.get("@map").click(900, 500).then(region => {
            cy.wrap(region).get(".leaflet-popup-content-wrapper").find(".q-mt-lg").should("contain", regionName_edit)
            cy.wrap(region).get(".leaflet-popup-content-wrapper").find("i").first().click({ force: true }).then(deleteWindow => {
                cy.wrap(deleteWindow).get("div[class='q-card']").find(".q-card__actions--horiz").children(".q-gutter-md").find("button").eq(1).click({ force: true })
            })
        })
    }

    createObject(objectName) {
        cy.get(".q-fab__icon-holder").click({ force: true })
        cy.get(".q-fab__div").contains("Wstaw obiekt").click({ force: true })
        cy.get("main[class='q-page flex column']").find("div[class='col row']").children(0).should("exist").as("map")
        cy.wait(500)
        cy.get("@map").click(280, 300).wait(500)
        cy.get("div[class='leaflet-pane leaflet-map-pane']").last().find("div[class='leaflet-pane leaflet-marker-pane']").find("img").invoke("css", "transform").then(transformStyle => {
            if (transformStyle) {
                const regex = /matrix\((-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)\)/;
                const matchResult = transformStyle.match(regex);

                if (matchResult && matchResult.length === 7) {
                    const [, a, b, c, d, tx, ty] = matchResult.map(Number);
                    // Wykonaj odpowiednie obliczenia na a, b, c, d, tx, ty, aby uzyskać odpowiednie wartości x, y, z
                    const translateX = tx;
                    const translateY = ty;
                    const translateZ = 0; // Wartość Z dla macierzy transformacji będzie zawsze 0 w przypadku 2D

                    cy.wrap({ translateX, translateY, translateZ }).as('transformValues');
                } else {
                    cy.log('Nieprawidłowy format transformStyle:', transformStyle);
                }
            } else {
                cy.log('Brak wartości transformStyle');
            }
        });
        cy.get("div[class='q-gutter-sm leaflet-control']").last().find("button").first().should("have.attr", "tabindex", "0").then(savebtn => {
            cy.wrap(savebtn).click({ force: true })
            cy.get("div[class='relative-position bg-white col agreus-750-dialog']").find("div[class='q-gutter-xs q-list']").find("label").type(objectName)
            cy.get("div[class='row q-py-md full-width justify-center relative-position']").find("button").contains("Zapisz").click({ force: true })
        }).then(() => {
            cy.wait(500)
            cy.get('@transformValues').then(transformValues => {
                const { translateX, translateY, translateZ } = transformValues;
                savedTransformValues = { translateX, translateY, translateZ };
                cy.get("div[class='leaflet-pane leaflet-map-pane']").last().find("div[class='leaflet-pane leaflet-marker-pane']").find("img[style*='transform: translate3d(" + translateX + "px, " + translateY + "px, " + translateZ + "px)']").click().then(object => {
                    cy.wrap(object).get(".leaflet-popup-content-wrapper").find(".q-mt-lg").should("contain", objectName)
                })
            })
        })
    }


    editObject(objectName_edit) {

        cy.get(".leaflet-popup-content-wrapper").find("i").last().click({ force: true }).then(editWindow => {
            cy.wrap(editWindow).get("div[class='relative-position bg-white col agreus-750-dialog']").find("div[class='q-gutter-xs q-list']").find("label").clear()
                .type(objectName_edit)
            cy.get("div[class='row q-py-md full-width justify-center relative-position']").find("button").contains("Zapisz").click({ force: true })
        })
        cy.get("main[class='q-page flex column']").find("div[class='col row']").children(0).should("exist")
        cy.wait(1000)
        const { translateX, translateY, translateZ } = savedTransformValues;
        cy.get("div[class='leaflet-pane leaflet-map-pane']").last().find("div[class='leaflet-pane leaflet-marker-pane']").find("img[style*='transform: translate3d(" + translateX + "px, " + translateY + "px, " + translateZ + "px)']").click().then(object => {
            cy.wrap(object).get(".leaflet-popup-content-wrapper").find(".q-mt-lg").should("contain", objectName_edit)
        })
    }

    deleteObject(objectName_edit) {
        cy.get(".leaflet-popup-content-wrapper").find(".q-mt-lg").should("contain", objectName_edit)
        cy.get(".leaflet-popup-content-wrapper").find("i").first().click({ force: true }).then(deleteWindow => {
            cy.wrap(deleteWindow).get("div[class='q-card']").find(".q-card__actions--horiz").children(".q-gutter-md").find("button").eq(1).click({ force: true })
        })
    }
}

export const maps = new Maps()