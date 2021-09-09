import { defineFeature, loadFeature } from "jest-cucumber"

import {
  applyUI,
  attachClickHandler,
  checkDates,
  storeDialogData,
  renderEventDialog,
  DumbDB,
} from "../src"

const feature = loadFeature("features/index.feature")

defineFeature(feature, (test) => {
  test("Submitting a good Event", ({ given, when, then }) => {
    const aDb = new DumbDB()

    given("I desire to create an event", () => {
      // mock loading web page
      const div = document.createElement("div")
      div.innerHTML = `<div id="app"></div>`
      document.body.appendChild(div) // add the div to the DOM
      const html = renderEventDialog()
      applyUI("app", html)
      attachClickHandler("add-event", (e) => {
        e.preventDefault()
        storeDialogData(aDb)
      })
    })

    when("I enter valid data", () => {
      // possibly modify form elements to match valid data
      let button = document.getElementById("add-event")
      if (button) {
        button.click()
      }
    })

    then("The event should be created and added to the db", () => {
      expect(aDb.length).toBe(1)
    })
  })
})

test("check for UI handling", () => {})
