
export function applyUI(elID: string, html: string) {
    //
    // Utility function that repalces HTML within an element
    //
    const el = document.getElementById(elID)
    if (el) {
        el.innerHTML = html
    }
}

export function attachClickHandler(elID: string, handler: (e: MouseEvent) => void) {
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

export function handleDialogClick(e: MouseEvent) {
    //
    // Event handler for the button
    //
    e.preventDefault()
    console.log("submit -> " + new Date().toISOString())

    const startDateInput = document.getElementById("start") as HTMLInputElement
    const endDateInput = document.getElementById("end") as HTMLInputElement

    if (startDateInput && endDateInput) {
        const start = new Date(startDateInput.value)
        const end = new Date(endDateInput.value)
        const datesOK = checkDates(start, end)
        console.log("Found two dates:" + datesOK)
    } else {
        console.log("No dates inputs found")
        throw new Error("No dates inputs found")
    }

    
}

const today =  new Date()

export function renderEventDialog( begin: Date = today, end: Date = today, title: string = "A new event", description: string = "") {
    //
    // Renders the UI
    //
    const html = `
    <form action="#" id="event-form">
    <h1> Create Event Dialog</h1>
    <h2>Title: <input type="text" id="title" name="event-title" value="${title}"/></h2>
    <label for="start">Start Date:</label>
    <input type="date" id="start" name="event-start" value="${begin.toISOString().slice(0, 10)}"/>
    <br/>
    <br/>
    <label for="end">End Date: </label>
    <input type="date" id="end" name="event-end" value="${end.toISOString().slice(0, 10)}"/>
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
    applyUI("app", renderEventDialog())
    attachClickHandler("add-event",handleDialogClick)
}

buildUI()
