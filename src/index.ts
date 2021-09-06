
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

const today =  new Date()

export function renderEventDialog( begin: Date = today, end: Date = today, title: string = "A new event", description: string = "") {
    //
    // Renders the UI
    //
    const html = `
    <form action="#" id="event-form">
    <h1> Create Event Dialog</h1>
    <h2>Title: <input type="text" id="title" name="event-title" value="${title}"/></h2>
    Start Date: <input type="date" id="start" name="event-start"
    value="${begin.toISOString().slice(0, 10)}"/>
    <br/>
    <br/>
    End Date: <input type="date" id="end" name="event-end"
    value="${end.toISOString().slice(0, 10)}"/>
    <br/>
    <br/>
    Description: <input type="text" id="description" name="event-description"
    value="${description}"/>
    <br/>
    <br/>
    <input type="submit" value="Create Event" id="add-event"/>
    </form>
    `
    return html
}

applyUI("app", renderEventDialog())

attachClickHandler("add-event",(e: MouseEvent) => {
    e.preventDefault()
    console.log("clicked" + new Date())
})
