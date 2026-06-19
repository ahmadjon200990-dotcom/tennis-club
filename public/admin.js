const menuBtns = document.querySelectorAll(".menu-btn")
const pages = document.querySelectorAll(".page")
const menuToggle =
    document.getElementById("menuToggle")
fetch("/check-admin")
    .then(res => res.json())
    .then(data => {

        if (!data.success) {
            window.location.href = "/";
        }

    });
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
let settings = {}
const clubLogo =
    document.getElementById("clubLogo")
fetch("/settings")
    .then(res => res.json())
    .then(data => {

        settings = data

        if (clubLogo) {

            clubLogo.textContent =
                data.clubName

        }

    })

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

    fetch("/income")
        .then(res => res.json())
        .then(data => {

            todayIncomeEl.textContent =
                data.todayIncome.toLocaleString("uz-UZ")
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

        updateStats()

    })

updateStats()

loadIncome()

function createTable(number) {

    const table = document.createElement("div")

    table.className = "table-card"

    table.innerHTML = `

        <h3>${number}-Stol</h3>

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

            <label>
                Pul bo'yicha
            </label>

            <input
                type="number"
                class="money-input"
                placeholder="Masalan 10000"
            >
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



                <div class="mode-box">

                    <button class="free-mode">
                        Cheksiz
                    </button>

                </div>

                <div class="table-actions">

                    <button class="start-btn">
                        Boshlash
                    </button>

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

    // Stol allaqachon ishlayotgan bo'lsa
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

setInterval(() => {
    loadIncome()
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



const dashboardWeeklyIncomeEl =
    document.getElementById("dashboardWeeklyIncome")

fetch("/reports")
    .then(res => res.json())
    .then(data => {

        let weeklyIncome = 0

        const today =
            new Date()

        const currentYear =
            String(today.getFullYear())

        const currentMonth =
            String(today.getMonth() + 1)
                .padStart(2, "0")

        const currentDay =
            today.getDate()

        const monthData =
            data?.[currentYear]?.[currentMonth]

        if (monthData) {

            Object.entries(monthData)
                .forEach(([day, amount]) => {

                    const dayNumber =
                        Number(day)

                    if (
                        dayNumber >= currentDay - 6 &&
                        dayNumber <= currentDay
                    ) {

                        weeklyIncome += amount

                    }

                })

        }

        dashboardWeeklyIncomeEl.textContent =
            weeklyIncome.toLocaleString("uz-UZ")
            + " so'm"

    })

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