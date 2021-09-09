import "@testing-library/jest-dom"

import {
  applyUI,
  attachClickHandler,
  checkDates,
  storeDialogData,
  renderEventDialog,
  DumbDB,
} from "."

import { getByDisplayValue } from "@testing-library/dom"

describe("check utility check dates functions", () => {
  it("should work when start <= end", () => {
    const start = new Date()
    const end = new Date(start.getTime() + 1)
    expect(checkDates(start, end)).toBe(true)
  })

  it("should return false when end<start", () => {
    const start = new Date()
    const end = new Date(start.getTime() - 1)
    expect(checkDates(start, end)).toBe(false)
  })
})

test("check for UI handling", () => {
  const div = document.createElement("body")
  div.innerHTML = `<div id="app"></div>`
  document.body.appendChild(div) // add the div to the DOM
  let aDb = new DumbDB()
  const html = renderEventDialog()
  applyUI("app", html)
  attachClickHandler("add-event", (e) => {
    e.preventDefault()
    storeDialogData(aDb)
  })
  let button = document.getElementById("add-event")
  if (button) {
    button.click()
  }

  expect(aDb.length).toBe(1)
})
