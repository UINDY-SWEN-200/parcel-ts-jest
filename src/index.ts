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

export function getDialogInfo(doc: Document): Event {
  //
  let start: Date | null = null
  let end: Date | null = null
  let title = ""
  let description = ""

  const startDateInput = doc.getElementById("start") as HTMLInputElement
  const endDateInput = doc.getElementById("end") as HTMLInputElement
  const descriptionInput = doc.getElementById("description") as HTMLInputElement
  const titleInput = doc.getElementById("title") as HTMLInputElement

  if (startDateInput && endDateInput) {
    start = new Date(startDateInput.value)
    end = new Date(endDateInput.value)
  } else {
    throw new Error("No dates inputs found")
  }

  if (descriptionInput && titleInput) {
    description = descriptionInput.value
    title = titleInput.value
  } else {
    throw new Error("No description or title inputs found")
  }

  return { start, end, title, description }
}

export function storeDialogData(db: DB<Event>) {
  //
  // Validate and store dialog data
  //
  const event = getDialogInfo(document)
  const datesOK = checkDates(event.start, event.end)

  if (datesOK) {
    db.put(event)
  } else {
    throw new Error("Dates are out of order")
  }
}

const today = new Date()

export function renderEventDialog(
  start: Date = today,
  end: Date = today,
  title: string = "A new event",
  description: string = "",
  errors: { [key: string]: string } = {}
) {
  //
  // Renders the UI
  //

  const startError = errors.start || ""
  const endError = errors.end || ""

  const html = `
    <form action="#" id="event-form">
    <h1>Create Event (Dialog)</h1>
    <h2>Title: <input type="text" id="title" name="event-title" value="${title}"/></h2>
    <label for="start">Start Date:</label>
    <input type="date" id="start" class="${startError}" name="event-start" value="${start
    .toISOString()
    .slice(0, 10)}"/>
    <br/>
    <br/>
    <label for="end">End Date: </label>
    <input type="date" id="end" name="event-end" class="${endError}" value="${end
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

export function defaultErrorHandler(e: Error, aDb: DB<Event>) {
  // A bit of a hack, but we'll fix it with a "real" framwork later
  if (e.message.includes("order")) {
    let event = getDialogInfo(document)
    applyUI(
      "app",
      renderEventDialog(
        event.start,
        event.end,
        event.title,
        event.description,
        { start: "errorHint", end: "errorHint" }
      )
    )
    attachClickHandler("add-event", (e) => {
      e.preventDefault()
      try {
        storeDialogData(aDb)
        alert("Data store successfully!")
      } catch (e) {
        defaultErrorHandler(e as Error, aDb)
      }
    })
  } else {
    alert(e.message)
  }
}

export function buildUI(
  aDb: DB<Event> = new DumbDB(),
  errorHandler:
    | ((e: Error, aDb: DB<Event>) => void)
    | null = defaultErrorHandler
) {
  applyUI("app", renderEventDialog())
  attachClickHandler("add-event", (e) => {
    e.preventDefault()
    try {
      storeDialogData(aDb)
      alert("Data stored!")
    } catch (e) {
      if (errorHandler) errorHandler(e as Error, aDb)
    }
  })
}

buildUI()
