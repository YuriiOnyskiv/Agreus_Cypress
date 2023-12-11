export class Alerts {

}

const idsInactive = []
const idsUnconfirmed = []

export function checkAndSelectFirstTenActiveRows() {
    cy.get("table.q-table").as("table")
    let selectedActiveRows = 0; // Licznik zaznaczonych aktywnych wierszy.

    function selectActiveRows() {
        // Sprawdź, czy istnieją aktywne wiersze na aktualnej stronie.
        cy.get('@table').find('tbody tr').each(($row) => {
            const hasActiveIcon = $row.find('td i').length > 0;
            if (hasActiveIcon && selectedActiveRows < 10) {
                // Jeśli wiersz jest aktywny i jeszcze nie zaznaczono dziesięć wierszy, zaznacz go.
                cy.wrap($row).find('td div[role="checkbox"]').click({ force: true });
                selectedActiveRows++;
                cy.log(selectedActiveRows)
            }
        }).then(() => {
            // Jeśli na aktualnej stronie nie ma 10 aktywnych wierszy, to przejdź do następnej, inaczej przerwij działanie testu
            if (selectedActiveRows < 10) {
                cy.get("div[class='q-table__bottom row items-center justify-end']").find('.q-table__control').children("button").eq(2).then(($nextPageButton) => {
                    if ($nextPageButton.length > 0) {
                        // Jeśli istnieje przycisk do następnej strony, kliknij go.
                        cy.wrap($nextPageButton).click()
                        // Rekurencyjnie sprawdź i zaznacz pierwsze dziesięć aktywnych wierszy na następnej stronie.
                        selectActiveRows();
                    }
                });
            }
        })
    }
    selectActiveRows()
}



export function checkAndSelectFirstTwoInactiveRows() {

    cy.get("table.q-table").as("table")
    let selectedInactiveRows = 0; // Licznik zaznaczonych nieaktywnych wierszy.

    function selectInactiveRows() {
        // Sprawdź, czy istnieją nieaktywne wiersze na aktualnej stronie.
        cy.get('@table').find('tbody tr').each(($row) => {
            const hasActiveIcon = $row.find('td i').length > 0;
            if (hasActiveIcon) {//jeśli wiersz jest aktywny, to przejdź dalej, nie zaznaczaj 
                return
            }
            if (selectedInactiveRows < 2) {
                // Jeśli wiersz jest aktywny i jeszcze nie zaznaczono dwóch, zaznacz go.
                cy.wrap($row).find('td div[role="checkbox"]').click({ force: true }).then(selectedRow => {
                    cy.wrap(selectedRow).parents(".q-tr").invoke("prop", "id").then(id => {
                        idsInactive.push(id)
                    })//wyciągam id zaznaczonego wierszu
                })
                selectedInactiveRows++;
            }
        }).then(() => {
            // Jeśli na aktualnej stronie nie ma więcej nieaktywnych wierszy lub zaznaczono już dwóch, przerwij działanie testu.
            if (selectedInactiveRows < 2) {
                cy.get("div[class='q-table__bottom row items-center justify-end']").find('.q-table__control').children("button").eq(2).then(($nextPageButton) => {
                    if ($nextPageButton.length > 0) {
                        // Jeśli istnieje przycisk do następnej strony, kliknij go.
                        cy.wrap($nextPageButton).click()
                        // Rekurencyjnie sprawdź i zaznacz pierwsze dwa nieaktywne wiersze na następnej stronie.
                        selectInactiveRows();
                    }
                });

            }
        })
    }
    selectInactiveRows()
}



export function deleteSelectedRows() {


    cy.get("div[class='row q-gutter-md q-ml-md']").find("button").eq(1).should("have.attr", "tabindex", "0").then(deletebtn => {
        cy.wrap(deletebtn).click({ force: true })
        cy.get(".q-dialog__inner").find(".q-card").find(".q-card__actions--horiz").children(".q-gutter-md").find("button").eq(1).click({ force: true })
    })

}



export function deleteSelectedActiveRows(){
    cy.get("div[class='row q-gutter-md q-ml-md']").find("button").eq(1).should("have.attr", "tabindex", "0").then(deletebtn => {
        cy.wrap(deletebtn).click({ force: true })
    })
}



export function assertDeletedRows() {
    cy.wait(2000)//musimy zaczekać, żeby usunięte obiekty zniknęli z DOM
    cy.wrap(idsInactive).each(idsInactive => { //asercja która sprawdza czy nie istnieje czasem ID usuniętych wierszy na aktualnej stronie
        cy.get("table.q-table").find("tbody tr").each(($row) => {
            cy.wrap($row).invoke("attr", "id").then((actualID) => {
                expect(actualID).to.not.equal(idsInactive);
            })
        })
    })
}



export function checkFirstTwoUnconfirmedRows() {
    cy.get("table.q-table").as("table")
    let unconfirmedRowsCounter = 0; // Licznik zaznaczonych niepotwierdzonych wierszy.

    function selectUnconfirmedRows() {
        // Sprawdź, czy istnieją niepotwierdzone wiersze na aktualnej stronie.
        cy.get('@table').find('tbody tr').each(($row) => {
            const status = $row.find('td:nth-child(5)').text()//wyciągam wartość 5 kolumny i zapisuję do zmiennej status
            if (status == "Potwierdź" && unconfirmedRowsCounter < 2) {
                // Jeśli wiersz jest niepotwierdzony i jeszcze nie zaznaczono dwóch, zaznacz go.
                cy.wrap($row).find('td div[role="checkbox"]').click({ force: true }).then(selectedRow => {
                    cy.wrap(selectedRow).parents(".q-tr").invoke("prop", "id").then(id => {
                        idsUnconfirmed.push(id)
                    })//wyciągam id zaznaczonego wierszu
                })
                unconfirmedRowsCounter++;
            }
        }).then(() => {
            // Jeśli na aktualnej stronie nie ma więcej nieaktywnych wierszy lub zaznaczono już dwóch, przerwij działanie testu.
            if (unconfirmedRowsCounter < 2) {
                cy.get("div[class='q-table__bottom row items-center justify-end']").find('.q-table__control').children("button").eq(2).then(($nextPageButton) => {
                    if ($nextPageButton.length > 0) {
                        // Jeśli istnieje przycisk do następnej strony, kliknij go.
                        cy.wrap($nextPageButton).click()
                        // Rekurencyjnie sprawdź i zaznacz pierwsze dwa nieaktywne wiersze na następnej stronie.
                        selectUnconfirmedRows();
                    }
                });
            }
        })

    }
    selectUnconfirmedRows()
}



export function confirmSelectedRows() {

    cy.get("div[class='row q-gutter-md q-ml-md']").find("button").eq(0).should("have.attr", "tabindex", "0").then(deletebtn => {
        cy.wrap(deletebtn).click({ force: true })
    })
}


export function assertConfirmedRows() {
    cy.wait(2000)
    cy.wrap(idsUnconfirmed).each(id => {
        cy.get(`table.q-table tbody tr#${id}`).each(($row) => {//asercja na sprawdzenie każdego zaznaczanego wiersza przez id, czy zmienił się status
            const status = $row.find('td:nth-child(5)').text()
            expect(status).to.include("Potwierdzony")
        })
    })
}


export function assertValidationPopUp(){
    cy.get(".q-card").contains("Aktywne alarmy nie mogą zostać usunięte. Będzie można je usunąć dopiero wtedy, kiedy ustanie przyczyna alarmu.").should("exist").and("be.visible")
}

export const alerts = new Alerts()