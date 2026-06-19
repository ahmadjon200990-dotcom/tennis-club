const clientTables =
    document.getElementById("clientTables")

function loadTables() {

    fetch("/client-tables")
        .then(res => res.json())
        .then(data => {

            clientTables.innerHTML = ""

            data.forEach(table => {

                let status = "Bo'sh"
                let className = "free"

                if (table.status === "busy") {

                    if (table.mode === "free") {

                        status = "Cheksiz"
                        className = "unlimited"

                    } else {

                        status = "Band"
                        className = "busy"

                    }

                }

                if (table.status === "pause") {

                    status = "Pauza"
                    className = "pause"

                }

                const h =
                    Math.floor(
                        table.remainingSeconds / 3600
                    )

                const m =
                    Math.floor(
                        (table.remainingSeconds % 3600) / 60
                    )

                const s =
                    table.remainingSeconds % 60

                const time =
                    String(h).padStart(2, "0")
                    + ":"
                    + String(m).padStart(2, "0")
                    + ":"
                    + String(s).padStart(2, "0")

                clientTables.innerHTML += `
<div class="client-card ${className}">

    <div class="table-number">
        Stol ${table.id}
    </div>

    <div class="status">
        ${status}
    </div>

    <div class="timer">
        ${time}
    </div>

    <div class="price">
        ${Number(table.money || 0).toLocaleString("uz-UZ")} so'm
    </div>

</div>
`
            })

        })

}

loadTables()

setInterval(loadTables, 1000)

function updateClock() {

    const now =
        new Date()

    document
        .getElementById("clock")
        .textContent =
        now.toLocaleTimeString(
            "uz-UZ",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        )

}

updateClock()

setInterval(
    updateClock,
    1000
)