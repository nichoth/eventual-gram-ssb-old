// var ssbKeys = require('ssb-keys')
// var ssbFeed = require('ssb-feed')
// var S = require('pull-stream')
// var start = require('../../src/start')
// var ts = require('../../src/types')
// var evs = require('../../src/EVENTS')
// var subscribe = require('../../src/subscribe')

// from application code
// these are weird though
// var _sbot
// var emit
// var state

describe('The app', () => {
    it('loads the home page', () => {
        cy.visit('/')
    })

    it('starts', () => {
        cy.window().then(win => {
            // from the application code
            console.log('win app', win.theApp)
            // emit = win.theApp.emit
            // _sbot = win.theApp.sbot
            // state = win.theApp.state
        })
    })
})

// i think the _sbot on window might be weird, like it's running
// in a different process from the main tests

// could make a function that runs in the server file if the 
// process === 'test', and adds a message to sbot

describe('a new post', () => {
    it('makes a new post', () => {
        cy.visit('/new').then(() => {

            cy.fixture('iguana.jpg').as('iguana')
            cy.get('#file-input').then(function (el) {
                fileUpload.call(this, 'iguana', 'iguana.jpg', el[0])

                cy.get('#text').type('foo blob').then(() => {
                    cy.get('button[type=submit]')
                        .click()

                    cy.visit('/').then(() => {
                        cy.get('.post .post-text')
                            .should('contain', 'foo blob')
                    })
                })
            })
        })
    })
})

function fileUpload (name, fileName, el) {
    cy.fixture(fileName).as(name)
    const blob = Cypress.Blob.base64StringToBlob(this[name], 'image/jpg')
    const file = new File([blob], 'images/'+ fileName, { type: 'image/jpg' })

    const list = new DataTransfer()
    list.items.add(file)

    el.files = list.files
    el.dispatchEvent(new Event('change', { bubbles: true }))
}

describe('set your avatar', () => {
    it('clicks', () => {
        cy.visit('/').then(() => {
            // click the avatar space
            cy.get('#avatar-label').click()
        })
    })
})


//     // after(() => {
//     //     // runs once after all tests in the block
//     // })
// })