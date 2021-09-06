import '@testing-library/jest-dom'

import { checkDates } from '.'

import {
	getByLabelText,
  } from '@testing-library/dom'

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

test('check for UI handling', () => {

})
