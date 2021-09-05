const app = document.getElementById("app")

if (app){
    app.innerHTML = `
    <div class="wrapper">
        <div class="one">One</div>
        <div class="two">Two</div>
        <div class="three">Three</div>
        <div class="four">Four</div>
        <div class="five">Five</div>
        <div class="six">Six</div>
    </div>
    <input type="date" id="start" name="trip-start"
    value="2018-07-22"
    min="2018-01-01" max="2018-12-31">
    `
}
