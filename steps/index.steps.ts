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

function setupUpUI(aDb: DumbDB, errors: string[] = []) {
  const div = document.createElement("div")
  div.innerHTML = `<div id="app"></div>`
  document.body.appendChild(div) // add the div to the DOM
  const html = renderEventDialog()
  applyUI("app", html)
  attachClickHandler("add-event", (e) => {
    e.preventDefault()
    try {
      storeDialogData(aDb)
    } catch (e) {
      errors.push((e as Error).message)
    }
  })
}

defineFeature(feature, (test) => {
  test("Submitting a good Event", ({ given, when, then }) => {
    const aDb = new DumbDB()

    given("I desire to create an event", () => {
      // mock loading web page
      setupUpUI(aDb)
    })

    when("I enter valid data", () => {
      // data is valid by default
      let button = document.getElementById("add-event")
      if (button) {
        button.click()
      }
    })

    then("The event should be created and added to the db", () => {
      expect(aDb.length).toBe(1)
    })
  })

  test("Submitting a bad Event", ({ given, when, then }) => {
    const aDb = new DumbDB()
    const errors: string[] = []

    given("I desire to create an event", () => {
      // mock loading web page
      setupUpUI(aDb, errors)
    })

    when("I enter invalid data", () => {
      let startTimeInput = document.getElementById("start") as HTMLInputElement
      let endTimeInput = document.getElementById("end") as HTMLInputElement
      startTimeInput.value = "2021-01-01"
      endTimeInput.value = "2020-01-01" // bad data
      let button = document.getElementById("add-event")
      if (button) {
        button.click()
      }
    })

    then("The event should fail to be be created", () => {
      expect(aDb.length).toBe(0)
      expect(errors.length).toBe(1)
    })
  })
})
