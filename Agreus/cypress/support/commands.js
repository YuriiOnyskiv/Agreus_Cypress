// ***********************************************
/// <reference types="cypress" />
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


export function login() {

    const userCredentials = {

        "client": null,
        "email": "yurii.onyskiv@inventia.pl",
        "password": "Tester123!",
        "rememberMe": false

    }

    cy.request("POST", Cypress.env("apiUrl") + "/auth/login", userCredentials)

    cy.request("GET", Cypress.env("apiUrl") + "/token").then(response => {
        cy.wrap(response).its('body').then(body => {
            const token = body.token
            cy.wrap(token).as("token")
            cy.visit("/", {
                onBeforeLoad(win) {
                    win.localStorage.setItem("Csrf-Token", token)
                }
           })
        })
    })
}
