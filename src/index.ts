/*
 ** Very simple mock implmentation of an even input dialog.
 */

export interface DB<T> {
  put(item: T): void
  length: number
}

export interface Event {
  start: Date
  end: Date
  title: string
  description: string
}

export class DumbDB implements DB<Event> {
  private events: Event[] = []

  put(event: Event) {
    this.events.push(event)
  }

  get length() {
    return this.events.length
  }
}

export function applyUI(elID: string, html: string) {
  //
  // Utility function that repalces HTML within an element
  //
  const el = document.getElementById(elID)
  if (el) {
    el.innerHTML = html
  }
}

export function attachClickHandler(
  elID: string,
  handler: (e: MouseEvent) => void
) {
  //
  // Utility function that attaches an event handler to an element
  //
  const el = document.getElementById(elID)
  if (el) {
    el.addEventListener("click", handler)
  }
}

export function checkDates(start: Date, end: Date): boolean {
  //
  // Utility function that checks if a start date is before an end date
  //
  return start.getTime() <= end.getTime()
}

export function handleDialogClick(e: MouseEvent, db: DB<Event>) {
  //
  // Event handler for the button
  //
  e.preventDefault()
  console.log("submit -> " + new Date().toISOString())

  let datesOK = false
  let start: Date | null = null
  let end: Date | null = null
  let title = ""
  let description = ""

  const startDateInput = document.getElementById("start") as HTMLInputElement
  const endDateInput = document.getElementById("end") as HTMLInputElement
  const descriptionInput = document.getElementById(
    "description"
  ) as HTMLInputElement
  const titleInput = document.getElementById("title") as HTMLInputElement

  if (startDateInput && endDateInput) {
    start = new Date(startDateInput.value)
    end = new Date(endDateInput.value)
    datesOK = checkDates(start, end)
    console.log("Found two dates:" + datesOK)
  } else {
    throw new Error("No dates inputs found")
  }

  if (descriptionInput && titleInput && datesOK) {
    description = descriptionInput.value
    title = titleInput.value
  }

  if (start && end && datesOK) {
    db.put({
      start,
      end,
      title,
      description,
    })
  }
}

const today = new Date()

export function renderEventDialog(
  begin: Date = today,
  end: Date = today,
  title: string = "A new event",
  description: string = ""
) {
  //
  // Renders the UI
  //
  const html = `
    <form action="#" id="event-form">
    <h1> Create Event Dialog</h1>
    <h2>Title: <input type="text" id="title" name="event-title" value="${title}"/></h2>
    <label for="start">Start Date:</label>
    <input type="date" id="start" name="event-start" value="${begin
      .toISOString()
      .slice(0, 10)}"/>
    <br/>
    <br/>
    <label for="end">End Date: </label>
    <input type="date" id="end" name="event-end" value="${end
      .toISOString()
      .slice(0, 10)}"/>
    <br/>
    <br/>
    <label for="description">Description:</label>
    <input type="text" id="description" name="event-description"  value="${description}"/>
    <br/>
    <br/>
    <input type="submit" value="Create Event" id="add-event"/>
    </form>
    `
  return html
}

export function buildUI() {
  let aDb = new DumbDB()
  applyUI("app", renderEventDialog())
  attachClickHandler("add-event", (e) => handleDialogClick(e, aDb))
}

buildUI()
