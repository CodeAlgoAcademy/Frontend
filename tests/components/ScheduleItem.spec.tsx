import React from "react"
import { ScheduleItem } from "../../components"
import { describe, expect } from "@jest/globals"
import { render, cleanup } from "@testing-library/react"

describe("The schedule box component", () => {
	const scheduleItemInfo = {
		id: 2,
		time: "11:15 am",
		item: "reminder about presentation"
	}
	it("renders schedule items correctly", () => {
		const { getByTestId } = render(<ScheduleItem time={scheduleItemInfo.time} item={scheduleItemInfo.item} id={scheduleItemInfo.id} />)
		const scheduleItem = getByTestId("schedule-2")
		expect(scheduleItem.textContent).toContain(scheduleItemInfo.item)
	})
})
