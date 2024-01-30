class CustomCalendar extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({mode: "open"})
        this.date = new Date();
        this.selectedDate = new Date()
    }

    connectedCallback()
    {
        const dateAttr = this.getAttribute("date")
        if(dateAttr){
            this.date = new Date(dateAttr)
            this.selectedDate = new Date(dateAttr)
        }else{
            this.date = new Date();
            this.selectedDate = new Date()
        }
        this.render();
        this.renderCalendar();
        this.addEventListeners();
    }

    changeMonth(direction){
        if(direction === 'prev'){
            this.date.setMonth(this.date.getMonth() -1);
        }else if(direction === 'next'){
            this.date.setMonth(this.date.getMonth() + 1);
        }
        this.renderCalendar();
    }

    addEventListeners(){
        this.shadowRoot
        .querySelector("#prev-month")
        .addEventListener("click", () => this.changeMonth("prev"));
        this.shadowRoot
        .querySelector('#next-month')
        .addEventListener('click', () => this.changeMonth('next'));
    }

    render(){
        this.shadowRoot.innerHTML = `

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="../Assets/CSS/font-awesome-4.7.0/css/font-awesome.css">

        
        <style>
            :host {
                display : block;
            }
            .calendar-container {
                width: 300px;
                max-width: 800px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .calendar-header {
                background: #2c3e50;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
            }
            .calendar-header h2 {
                color: #ffffff;
                font-size: 24px;
                margin: 0;
            }
            .calendar-header button {
                background-color: transparent;
                border: none;
                color: #ffffff;
                font-size: 18px;
                cursor: pointer;
            }
            .calendar-grid {
                padding: 10px;
            }
            .day-names,
            .days {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 5px;
            }
            .days-names div,
            .days div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 16px;
                width: 20px;
                height: 20px;
                margin: 5px auto;
                transition: .5s;
                border-radius: 50%;
            }
            .days-names div {
                color: #333;
                padding-bottom: 8px;
                font-weight: bold;
                font-size: 1.07rem;
                border-radius: 50%;
                transition: .5s;
            }
            .days div:hover {
                cursor: pointer;
                background-color: #999;
                display: flex;
                justify-content: center;
                color: #ffffff;
                transition: .5s;
            }
            .days .today {
                background-color: #2c3e50;
                color: #ffffff;
                border-radius: 50%;
                display: flex;
                justify-content:center;
            }
            .days .prev-date,
            .days .next-date {
                color: #d3d3d3;
            }
            .calendar-container * {
                box-sizing: border-box;
            }
        </style>

        <div class="calendar-container">
            <div class="calendar-header">
                <button id="prev-month"><i class="fa fa-chevron-left"></i></button>
                <h2 id="month-year"></h2>
                <button id="next-month"><i class="fa fa-chevron-right"></i></button>
            </div>
            <div class="calendar-grid">
                <div class="day-names">
                    <div>Dim</div>
                    <div>Lun</div>
                    <div>Mar</div>
                    <div>Mer</div>
                    <div>Jeu</div>
                    <div>Ven</div>
                    <div>Sam</div>    
                </div>
                <div id="days" class="days">

                </div>
            </div>
        </div>

        `
    }


    handleDayClick(event){
        const clickedElement = event.target;
        const day = parseInt(clickedElement.textContent, 10);

    if (
        !isNaN(day) &&
        clickedElement.parentElement &&
        clickedElement.parentElement.id === "days" &&
        !clickedElement.classList.contains("prev-date") &&
        !clickedElement.classList.contains("next-date")
    ){
        this.selectedDate = new Date(this.date)
        this.selectedDate.setDate(day)
        this.setAttribute("date", this.selectedDate.toISOString().split("T")[0]);
        this.dispatchEvent(new CustomEvent("date-changed", {detail: this.selectedDate}));
        this.renderCalendar();
    }

}

    renderCalendar(){
        const monthDays = this.shadowRoot.querySelector("#days")
        const lastDay = new Date(
            this.date.getFullYear(),
            this.date.getMonth() + 1,
            0
        ).getDate();

        const prevLastDay = new Date(
            this.date.getFullYear(),
            this.date.getMonth(),
            0
        ).getDate();

        const firstDayIndex = new Date(
            this.date.getFullYear(),
            this.date.getMonth(),
            1
        ).getDay();

        const lastDayIndex = new Date(
            this.date.getFullYear(),
            this.date.getMonth() + 1,
            0
        ).getDay();


        const newDays = 7 - lastDayIndex - 1;

        const months = [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre"
        ]

        this.shadowRoot.querySelector("#month-year").innerHTML = months[this.date.getMonth()] + ' ' + this.date.getFullYear();

        let days = "";

        for(let x = firstDayIndex; x > 0; x--){
            days += `<div class = "prev-date">${prevLastDay - x + 1}</div>`;
        }

        for(let i = 1; i <= lastDay; i++){
            if(
                i === this.selectedDate.getDate() &&
                this.date.getMonth() === this.selectedDate.getMonth() &&
                this.date.getFullYear() === this.selectedDate.getFullYear()
            ){
                days += `<div class = "today">${i}</div>`;
            }else{
                days += `<div>${i}</div>`;
            }
        }

        for(let j = 1; j <= newDays; j++){
            days += `<div class = "next-date">${j}</div>`;
        }

        monthDays.innerHTML = days;
        monthDays.addEventListener('click', (event) => this.handleDayClick(event));
    
    }



}

customElements.define('custom-calendar', CustomCalendar);


// Collapse navigation

let navigation = document.querySelector('.navigation');
let toggle = document.querySelector('.toggle');
toggle.onclick = function(){
    navigation.classList.toggle('active');
    const sideBar = document.querySelector(".container_global .conteneur .sidebar");
    sideBar.classList.toggle('active');
};


// Date
var now = new Date();
const champ = document.querySelector('.content .text_box h2');
champ.innerHTML = now;


// Drop Down
const optionMenu = document.querySelector('.select-menu');
const selectBtn = optionMenu.querySelector('.select-btn');
const options = optionMenu.querySelectorAll('.option');
const sBtn_text = optionMenu.querySelector('.sBtn-text');

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach(option => {
    option.addEventListener('click', () => {
        let selectedOption = option.querySelector('.option-text').innerText;
        sBtn_text.innerText = selectedOption;
        // console.log(selectedOption)

        optionMenu.classList.remove('active');
    })
})
