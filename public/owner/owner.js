const menuBtns = document.querySelectorAll(".menu-btn")
const pages = document.querySelectorAll(".page")
const adminList =
    document.getElementById("adminList");

fetch("/check-owner")
    .then(res => res.json())
    .then(data => {

        if (!data.success) {
            window.location.href = "/";
        }

    });
let settings = {}
const clubLogo =
    document.getElementById("clubLogo")

const menuToggle =
    document.getElementById("menuToggle")

const sidebar =
    document.querySelector(".sidebar")

const overlay =
    document.getElementById("overlay")

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        sidebar.classList.toggle("show")

        overlay.classList.toggle("show")

    })

}

if (overlay) {

    overlay.addEventListener("click", () => {

        sidebar.classList.remove("show")

        overlay.classList.remove("show")

    })

}

menuBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        menuBtns.forEach(item => {
            item.classList.remove("active")
        })

        pages.forEach(page => {
            page.classList.remove("active-page")
        })

        btn.classList.add("active")

        const pageName = btn.dataset.page

        document
            .getElementById(pageName)
            .classList.add("active-page")

        if (window.innerWidth <= 768) {

            sidebar.classList.remove("show")
            overlay.classList.remove("show")

        }

    })

})

function updateClock() {

    const now = new Date()

    document.getElementById("time").textContent =
        now.toLocaleTimeString("uz-UZ")

    document.getElementById("date").textContent =
        now.toLocaleDateString("uz-UZ")

}

updateClock()

setInterval(updateClock, 1000)


const tablesContainer =
    document.getElementById("tablesContainer")

let tableCount = 1

let todayIncome = 0

const todayIncomeEl =
    document.getElementById("todayIncome")

function loadIncome() {

    fetch("/reports")
        .then(res => res.json())
        .then(data => {

            const now = new Date()

            const year =
                String(now.getFullYear())

            const month =
                String(now.getMonth() + 1)
                    .padStart(2, "0")

            const day =
                String(now.getDate())
                    .padStart(2, "0")

            const todayIncome =
                data?.[year]?.[month]?.[day] || 0

            todayIncomeEl.textContent =
                todayIncome.toLocaleString("uz-UZ")
                + " so'm"

        })

}

const busyTablesEl =
    document.getElementById("busyTables")

const freeTablesEl =
    document.getElementById("freeTables")

function updateStats() {

    const tables =
        document.querySelectorAll(".table-card")

    let busy = 0

    tables.forEach(table => {

        const status =
            table.querySelector(".table-state").textContent

        if (
            status.includes("Band") ||
            status.includes("Pauza")
        ) {
            busy++
        }

    })

    busyTablesEl.textContent = busy

    freeTablesEl.textContent =
        tables.length - busy

}


fetch("/tables")
    .then(res => res.json())
    .then(data => {

        data.forEach(table => {
            createTable(table.id)
        })
        tableCount = data.length
        updateStats()

    })

updateStats()

loadIncome()

function createTable(number) {

    const table = document.createElement("div")

    table.className = "table-card"

    table.innerHTML = `

        <div class="table-header">

    <h3>${number}-Stol</h3>

    <button class="delete-table">
        ✕
    </button>

</div>

        <p class="table-state">
            Holati: Bo'sh
        </p>

        <div class="timer">
           00:00:00
        </div>

        <input
            type="hidden"
            class="total-seconds"
            value="0"
        >

            <div class="money">
                0 so'm
            </div>

            <div class="money-row">

    <input
        type="number"
        class="money-input"
        placeholder="Pul"
    >

    <button class="free-mode">
        Cheksiz
    </button>

</div>

<div class="money-time">
    00:00
</div>


                <label>
                    Vaqt bo'yicha
                </label>

                <div class="wheel-picker">

    <div class="wheel-box">
        <div class="selector"></div>

        <div class="hour-wheel">
            <div>00</div>
            <div>01</div>
            <div>02</div>
            <div>03</div>
            <div>04</div>
            <div>05</div>
            <div>06</div>
            <div>07</div>
            <div>08</div>
            <div>09</div>
            <div>10</div>
            <div>11</div>
            <div>12</div>
            <div>13</div>
            <div>14</div>
            <div>15</div>
            <div>16</div>
            <div>17</div>
            <div>18</div>
            <div>19</div>
            <div>20</div>
            <div>21</div>
            <div>22</div>
            <div>23</div>
        </div>
    </div>

    <span class="wheel-colon">:</span>

    <div class="wheel-box">
        <div class="selector"></div>

        <div class="minute-wheel">
            <div>00</div>
            <div>01</div>
            <div>02</div>
            <div>03</div>
            <div>04</div>
            <div>05</div>
            <div>06</div>
            <div>07</div>
            <div>08</div>
            <div>09</div>
            <div>10</div>
            <div>11</div>
            <div>12</div>
            <div>13</div>
            <div>14</div>
            <div>15</div>
            <div>16</div>
            <div>17</div>
            <div>18</div>
            <div>19</div>
            <div>20</div>
            <div>21</div>
            <div>22</div>
            <div>23</div>
            <div>24</div>
            <div>25</div>
            <div>26</div>
            <div>27</div>
            <div>28</div>
            <div>29</div>
            <div>30</div>
            <div>31</div>
            <div>32</div>
            <div>33</div>
            <div>34</div>
            <div>35</div>
            <div>36</div>
            <div>37</div>
            <div>38</div>
            <div>39</div>
            <div>40</div>
            <div>41</div>
            <div>42</div>
            <div>43</div>
            <div>44</div>
            <div>45</div>
            <div>46</div>
            <div>47</div>
            <div>48</div>
            <div>49</div>
            <div>50</div>
            <div>51</div>
            <div>52</div>
            <div>53</div>
            <div>54</div>
            <div>55</div>
            <div>56</div>
            <div>57</div>
            <div>58</div>
            <div>59</div>
        </div>
    </div>

</div>


                <button class="start-btn full-btn">
    Boshlash
</button>

<div class="table-actions">

    <button class="pause-btn">
        Pauza
    </button>

    <button class="finish-btn">
        Yakunlash
    </button>

</div>


    `

    tablesContainer.appendChild(table)

    table.mode = "time"
    table.dataset.id = number;

}

tablesContainer.addEventListener("input", (e) => {

    if (!e.target.classList.contains("money-input")) return

    const card =
        e.target.closest(".table-card")

    const money =
        Number(e.target.value)

    const result =
        card.querySelector(".money-time")

    if (!money) {

        result.textContent = "00:00"
        return

    }

    const totalMinutes =
        Math.floor(
            money /
            settings.hourPrice *
            60
        )

    const hours =
        Math.floor(totalMinutes / 60)

    const minutes =
        totalMinutes % 60

    result.textContent =
        String(hours).padStart(2, "0")
        + ":"
        + String(minutes).padStart(2, "0")

    const hourWheel =
        card.querySelector(".hour-wheel")

    const minuteWheel =
        card.querySelector(".minute-wheel")

    hourWheel.scrollTop =
        hours * 40

    minuteWheel.scrollTop =
        minutes * 40
})

tablesContainer.addEventListener("click", (e) => {

    if (!e.target.classList.contains("finish-btn")) return

    const card =
        e.target.closest(".table-card")

    card.querySelector(".timer").textContent =
        "00:00:00"

    card.querySelector(".table-state").textContent =
        "Holati: Bo'sh"

    fetch("/table-update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: Number(card.dataset.id),
            status: "free",
            remainingSeconds: 0,
            startSeconds: 0,
            money: 0,
            mode: "time"
        })
    })

    fetch("/add-income", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            amount: Number(
                card.querySelector(".money")
                    .textContent
                    .replace(/\D/g, "")
            ) || 0
        })
    })

    updateStats()

    todayIncome += card.usedMoney || 0

    todayIncomeEl.textContent =
        todayIncome.toLocaleString("uz-UZ")
        + " so'm"

    card.querySelector(".money").textContent =
        "0 so'm"

    card.querySelector(".money-input").value = ""

    card.querySelector(".money-time").textContent =
        "00:00"

    card.usedMoney = 0

    card.incomeAdded = false

    card.remainingSeconds = 0

    card.startSeconds = 0

    card.mode = "time"

    card.querySelector(".hour-wheel").scrollTop = 0
    card.querySelector(".minute-wheel").scrollTop = 0

    card.querySelector(".hour-wheel").style.pointerEvents =
        "auto"

    card.querySelector(".minute-wheel").style.pointerEvents =
        "auto"

    card.querySelector(".money-input").disabled =
        false

    card.querySelector(".free-mode").disabled =
        false

    card.querySelector(".start-btn").disabled =
        false

    card.querySelector(".pause-btn").textContent =
        "Pauza"

})

tablesContainer.addEventListener("click", (e) => {

    if (!e.target.classList.contains("pause-btn")) return

    const card =
        e.target.closest(".table-card")

    if (e.target.textContent === "Pauza") {

        fetch("/table-update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: Number(card.dataset.id),
                status: "pause"
            })
        })

        e.target.textContent =
            "Davom ettirish"

    } else {

        fetch("/table-update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: Number(card.dataset.id),
                status: "busy"
            })
        })

        e.target.textContent =
            "Pauza"

    }

})

tablesContainer.addEventListener("click", (e) => {

    if (!e.target.classList.contains("free-mode")) return

    const card =
        e.target.closest(".table-card")

    if (card.mode === "free") {
        return
    }

    const state =
        card.querySelector(".table-state")

    if (
        state.textContent.includes("Band") ||
        state.textContent.includes("Pauza")
    ) {
        return
    }

    card.mode = "free"

    fetch("/table-update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: Number(card.dataset.id),
            mode: "free"
        })
    })

    state.textContent =
        "Holati: Cheksiz"

})

tablesContainer.addEventListener("click", (e) => {

    if (!e.target.classList.contains("start-btn")) return

    const card =
        e.target.closest(".table-card")


    const startBtn =
        card.querySelector(".start-btn")

    const state =
        card.querySelector(".table-state")

    if (
        state.textContent.includes("Band") ||
        state.textContent.includes("Pauza") ||
        state.textContent.includes("Cheksiz")
    ) {
        return
    }

    const hourWheel =
        card.querySelector(".hour-wheel")

    const minuteWheel =
        card.querySelector(".minute-wheel")

    const hour =
        Math.round(hourWheel.scrollTop / 40)

    const minute =
        Math.round(minuteWheel.scrollTop / 40)

    let totalSeconds =
        (hour * 3600) + (minute * 60)

    if (card.mode !== "free" && totalSeconds <= 0) {

        alert("Vaqt tanlang")
        return

    }

    if (card.mode === "free") {

        state.textContent =
            "Holati: Cheksiz"

    } else {

        state.textContent =
            "Holati: Band"

    }

    fetch("/table-update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: Number(card.dataset.id),
            status: "busy",
            remainingSeconds: totalSeconds,
            startSeconds: totalSeconds,
            money: 0,
            mode: card.mode
        })
    })

    updateStats()

    startBtn.disabled = true

    hourWheel.style.pointerEvents = "none"
    minuteWheel.style.pointerEvents = "none"

    card.querySelector(".money-input").disabled = true

    card.querySelector(".free-mode").disabled = true

})

const addTableBtn =
    document.getElementById("addTableBtn")

addTableBtn.addEventListener("click", () => {

    if (tableCount >= settings.maxTables) {

        alert(
            `Maksimal ${settings.maxTables} ta stol mumkin`
        )

        return

    }

    fetch("/add-table", {
        method: "POST"
    })

    tableCount++

    createTable(tableCount)

    updateStats()

})

tablesContainer.addEventListener("click", (e) => {

    if (!e.target.classList.contains("delete-table")) return

    const allTables =
        document.querySelectorAll(".table-card")

    if (allTables.length <= 1) {

        alert("Kamida 1 ta stol qolishi kerak")
        return

    }

    const answer =
        confirm("Stolni o'chirishni xohlaysizmi?")

    if (!answer) return

    const card =
        e.target.closest(".table-card")

    fetch("/delete-table", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: Number(card.dataset.id)
        })
    })

    card.remove()

    tableCount--

    updateStats()

})


const addAdminBtn =
    document.getElementById("addAdminBtn");

if (addAdminBtn) {

    addAdminBtn.addEventListener("click", () => {

        const name =
            document.getElementById("adminName").value;

        const login =
            document.getElementById("adminLogin").value;

        const password =
            document.getElementById("adminPassword").value;

        if (
            !name.trim() ||
            !login.trim() ||
            !password.trim()
        ) {
            alert("Barcha maydonlarni to'ldiring");
            return;
        }

        fetch("/add-admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                login,
                password
            })
        })
            .then(res => res.json())
            .then(data => {

                if (data.success) {
                    alert("Admin qo'shildi");
                    renderAdmins();
                    document.getElementById("adminName").value = "";
                    document.getElementById("adminLogin").value = "";
                    document.getElementById("adminPassword").value = "";
                } else {

                    alert(data.message);

                }

            });

    });

}

function renderAdmins() {

    adminList.innerHTML = "";

    fetch("/admins")
        .then(res => res.json())
        .then(data => {

            data.forEach(admin => {

                adminList.innerHTML += `
    <div class="admin-card">
        <h4>${admin.name}</h4>
        <p>Login: ${admin.login}</p>

        <button
            class="delete-admin"
            data-login="${admin.login}"
        >
            O'chirish
        </button>
    </div>
`;

            });

        });

}

renderAdmins();


adminList.addEventListener("click", (e) => {

    if (
        !e.target.classList.contains("delete-admin")
    ) return;

    const answer =
        confirm("Adminni o'chirishni xohlaysizmi?");

    if (!answer) return;

    fetch("/delete-admin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: e.target.dataset.login
        })
    })
        .then(res => res.json())
        .then(data => {

            if (data.success) {

                renderAdmins();

            } else {

                alert(data.message);

            }

        });

});

setInterval(() => {
    loadIncome()

    loadReports()
    fetch("/tables")
        .then(res => res.json())
        .then(data => {

            data.forEach(table => {
                const card =
                    document.querySelector(
                        `[data-id="${table.id}"]`
                    )

                if (!card) return

                card.mode = table.mode

                const state =
                    card.querySelector(".table-state")

                const timer =
                    card.querySelector(".timer")

                card.querySelector(".money").textContent =
                    Number(table.money || 0).toLocaleString("uz-UZ")
                    + " so'm"

                const pauseBtn =
                    card.querySelector(".pause-btn")

                if (table.status === "busy") {

                    if (table.mode === "free") {

                        state.textContent =
                            "Holati: Cheksiz"

                    } else {

                        state.textContent =
                            "Holati: Band"

                    }

                    pauseBtn.textContent = "Pauza"

                    card.querySelector(".money-input").disabled = true
                    card.querySelector(".free-mode").disabled = true

                    card.querySelector(".hour-wheel").style.pointerEvents =
                        "none"

                    card.querySelector(".minute-wheel").style.pointerEvents =
                        "none"
                }

                if (table.status === "pause") {

                    state.textContent = "Holati: Pauza"
                    pauseBtn.textContent = "Davom ettirish"

                    card.querySelector(".money-input").disabled = true
                    card.querySelector(".free-mode").disabled = true

                    card.querySelector(".hour-wheel").style.pointerEvents =
                        "none"

                    card.querySelector(".minute-wheel").style.pointerEvents =
                        "none"

                }

                if (table.status === "free") {

                    state.textContent = "Holati: Bo'sh"

                    pauseBtn.textContent = "Pauza"

                    timer.textContent = "00:00:00"

                    card.querySelector(".money").textContent =
                        "0 so'm"

                    card.querySelector(".hour-wheel").style.pointerEvents =
                        "auto"

                    card.querySelector(".minute-wheel").style.pointerEvents =
                        "auto"

                    card.querySelector(".money-input").disabled =
                        false

                    card.querySelector(".free-mode").disabled =
                        false

                    card.remainingSeconds = 0

                    return

                }

                const h =
                    Math.floor(table.remainingSeconds / 3600)

                const m =
                    Math.floor((table.remainingSeconds % 3600) / 60)

                const s =
                    table.remainingSeconds % 60

                timer.textContent =
                    String(h).padStart(2, "0")
                    + ":"
                    + String(m).padStart(2, "0")
                    + ":"
                    + String(s).padStart(2, "0")

            })

            let busy = 0;

            data.forEach(table => {

                if (
                    table.status === "busy" ||
                    table.status === "pause"
                ) {
                    busy++;
                }

            });

            busyTablesEl.textContent = busy;

            freeTablesEl.textContent =
                data.length - busy;

        })

}, 1000)






const bestDayAmountEl =
    document.getElementById("bestDayAmount")

const bestDayDateEl =
    document.getElementById("bestDayDate")

const weeklyIncomeEl =
    document.getElementById("weeklyIncome")

const dashboardWeeklyIncomeEl =
    document.getElementById("dashboardWeeklyIncome")

const monthlyIncomeEl =
    document.getElementById("monthlyIncome")

const modal =
    document.getElementById("reportModal")

const reportContent =
    document.getElementById("reportContent")

let currentMonth = 6
let currentYear = 2026

const monthTitle =
    document.getElementById("monthTitle")

const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr"
]


const calendar =
    document.getElementById("calendar")

let reportsData = {}

let selectedYear = "2026"

function renderCalendar(month) {

    calendar.innerHTML = ""

    const firstDay =
        new Date(
            Number(selectedYear),
            Number(month) - 1,
            1
        ).getDay()

    const startDay =
        firstDay === 0 ? 6 : firstDay - 1

    for (let i = 0; i < startDay; i++) {

        calendar.innerHTML += `
        <div></div>
    `

    }

    const totalDays =
        new Date(
            2026,
            Number(month),
            0
        ).getDate()

    for (
        let day = 1;
        day <= totalDays;
        day++
    ) {

        const dayStr =
            String(day).padStart(2, "0")

        const hasReport =
            reportsData?.[selectedYear]?.[month]?.[dayStr]

        const today = new Date()

        const isToday =
            Number(day) === today.getDate() &&
            Number(month) === today.getMonth() + 1 &&
            Number(selectedYear) === today.getFullYear()

        calendar.innerHTML += `
    <button
        class="
day-btn
${hasReport ? "has-report" : ""}
${isToday ? "today" : ""}
"
        data-day="${dayStr}"
    >
        ${day}
    </button>
`

    }

    document.querySelectorAll(".day-btn")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                const day =
                    btn.dataset.day

                const year = selectedYear

                const income =
                    reportsData?.[year]?.[month]?.[day]

                modal.classList.add("show")

                if (income) {

                    reportContent.innerHTML = `
        <div class="report-date">
            ${day}.${month}.${year}
        </div>

        <div class="report-income">
            ${income.toLocaleString("uz-UZ")} so'm
        </div>

        <div class="report-label">
            Kunlik daromad
        </div>
    `

                } else {

                    reportContent.innerHTML = `
        <div class="report-date">
            ${day}.${month}.${year}
        </div>

        <div class="no-report">
            Hisobot mavjud emas
        </div>
    `

                }
            })

        })

}

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.remove("show")

    }

})

function updateTitle() {

    monthTitle.textContent =
        `${months[currentMonth - 1]} ${currentYear}`

}

document
    .getElementById("prevMonth")
    .addEventListener("click", () => {
        currentMonth--

        if (currentMonth < 1) {

            currentMonth = 12
            currentYear--

        }

        selectedYear =
            String(currentYear)

        updateTitle()

        renderCalendar(
            String(currentMonth)
                .padStart(2, "0")
        )

        updateReportStats()


    })


document
    .getElementById("nextMonth")
    .addEventListener("click", () => {


        currentMonth++

        if (currentMonth > 12) {

            currentMonth = 1
            currentYear++

        }

        selectedYear =
            String(currentYear)

        updateTitle()

    })

updateTitle()


updateReportStats()


function updateReportStats() {

    let monthlyIncome = 0
    let weeklyIncome = 0

    let bestAmount = 0
    let bestDay = ""

    const monthData =
        reportsData?.[selectedYear]?.[
        String(currentMonth).padStart(2, "0")
        ]

    if (monthData) {

        Object.entries(monthData)
            .forEach(([day, amount]) => {

                monthlyIncome += amount

                if (amount > bestAmount) {

                    bestAmount = amount

                    bestDay =
                        `${day}.${String(currentMonth)
                            .padStart(2, "0")}.${selectedYear}`

                }

                const dayNumber =
                    Number(day)

                const today =
                    new Date()

                const currentDay =
                    today.getDate()

                if (
                    dayNumber >= currentDay - 6 &&
                    dayNumber <= currentDay
                ) {

                    weeklyIncome += amount

                }

            })

    }

    monthlyIncomeEl.textContent =
        monthlyIncome.toLocaleString("uz-UZ")
        + " so'm"

    weeklyIncomeEl.textContent =
        weeklyIncome.toLocaleString("uz-UZ")
        + " so'm"

    bestDayAmountEl.textContent =
        bestAmount.toLocaleString("uz-UZ")
        + " so'm"

    bestDayDateEl.textContent =
        bestDay || "--"

    dashboardWeeklyIncomeEl.textContent =
        weeklyIncome.toLocaleString("uz-UZ")
        + " so'm"

}

function loadReports() {

    fetch("/reports")
        .then(res => res.json())
        .then(data => {

            reportsData = data

            updateReportStats()

            renderCalendar(
                String(currentMonth)
                    .padStart(2, "0")
            )

        })

    fetch("/settings")
        .then(res => res.json())
        .then(data => {

            settings = data

            if (clubLogo) {

                clubLogo.textContent =
                    data.clubName

            }

        })

}

loadReports()


const clubNameEl =
    document.getElementById("clubName")

const hourPriceEl =
    document.getElementById("hourPrice")

const maxTablesEl =
    document.getElementById("maxTables")

const saveSettingsBtn =
    document.getElementById("saveSettings")

if (saveSettingsBtn) {

    fetch("/settings")
        .then(res => res.json())
        .then(data => {

            clubNameEl.value =
                data.clubName

            hourPriceEl.value =
                data.hourPrice

            maxTablesEl.value =
                data.maxTables

        })

    saveSettingsBtn
        .addEventListener("click", () => {

            fetch("/settings", {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({

                    clubName:
                        clubNameEl.value,

                    hourPrice:
                        Number(
                            hourPriceEl.value
                        ),

                    maxTables:
                        Number(
                            maxTablesEl.value
                        )

                })
            })
                .then(res => res.json())
                .then(() => {

                    alert(
                        "Sozlamalar saqlandi"
                    )

                })

        })

}

setInterval(() => {

    fetch("/settings")
        .then(res => res.json())
        .then(data => {

            settings = data

            const clubLogo =
                document.getElementById("clubLogo")

            if (clubLogo) {

                clubLogo.textContent =
                    data.clubName

            }

        })

}, 3000)

const logoutBtn =
    document.getElementById("logoutBtn")

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        window.location.href =
            "/logout"

    })

}

const changePasswordBtn =
    document.getElementById(
        "changePasswordBtn"
    )

if (changePasswordBtn) {

    changePasswordBtn
        .addEventListener("click", () => {

            fetch(
                "/change-owner-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({

                        currentPassword:
                            document.getElementById(
                                "currentPassword"
                            ).value,

                        newPassword:
                            document.getElementById(
                                "newPassword"
                            ).value

                    })
                }
            )
                .then(res => res.json())
                .then(data => {

                    if (data.success) {

                        document.getElementById(
                            "currentPassword"
                        ).value = ""

                        document.getElementById(
                            "newPassword"
                        ).value = ""

                        alert(
                            "Parol o'zgartirildi"
                        )

                    } else {

                        alert(
                            data.message
                        )

                    }

                })

        })

}