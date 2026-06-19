const fs = require("fs");
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

let settings = JSON.parse(
    fs.readFileSync(
        "settings.json",
        "utf8"
    )
)

const incomeData =
    JSON.parse(
        fs.readFileSync(
            "income.json",
            "utf8"
        )
    )

const today =
    new Date()
        .toISOString()
        .split("T")[0]

if (incomeData.date !== today) {

    incomeData.todayIncome = 0
    incomeData.date = today

    fs.writeFileSync(
        "income.json",
        JSON.stringify(
            incomeData,
            null,
            2
        )
    )

}

let todayIncome =
    incomeData.todayIncome

app.use(express.static("public"));
app.use(express.json());

app.use(session({
    secret: "tennis-secret-key",
    resave: false,
    saveUninitialized: false
}));

function requireLogin(req, res, next) {

    if (!req.session.role) {

        return res.status(401).json({
            success: false,
            message: "Login required"
        })

    }

    next()

}


const admins =
    JSON.parse(
        fs.readFileSync("admins.json", "utf8")
    );

const tables =
    JSON.parse(
        fs.readFileSync("tables.json", "utf8")
    );

let reports = JSON.parse(
    fs.readFileSync("reports.json", "utf8")
);

setInterval(() => {

    tables.forEach(table => {

        if (
            table.status === "busy" &&
            table.mode !== "free" &&
            table.remainingSeconds > 0
        ) {

            table.remainingSeconds--;

        }

        if (
            table.status === "busy" &&
            table.mode === "free"
        ) {

            table.remainingSeconds++;

        }

        let usedSeconds = 0;

        if (table.mode === "free") {

            usedSeconds =
                table.remainingSeconds;

        } else {

            usedSeconds =
                table.startSeconds -
                table.remainingSeconds;

        }

        table.money =
            Math.floor(
                usedSeconds *
                (settings.hourPrice / 3600)
            );

        if (
            table.status === "busy" &&
            table.remainingSeconds <= 0 &&
            table.mode !== "free"
        ) {

            table.status = "free";
            table.money = 0;

        }

    });

    fs.writeFileSync(
        "tables.json",
        JSON.stringify(tables, null, 2)
    );

}, 1000);

app.post("/login", (req, res) => {

    const {
        login,
        password,
        selectedRole
    } = req.body;

    if (
        selectedRole === "owner" &&
        login === "owner" &&
        password === settings.ownerPassword
    ) {

        req.session.role = "owner";

        return res.json({
            success: true,
            role: "owner"
        });

    }

    if (selectedRole === "admin") {

        const admin = admins.find(item =>
            item.login === login &&
            item.password === password
        );

        if (admin) {

            req.session.role = "admin";
            req.session.name = admin.name;

            return res.json({
                success: true,
                role: "admin",
                name: admin.name
            });

        }

    }

    res.json({
        success: false
    });

});


app.post("/add-admin", requireLogin, (req, res) => {

    const { name, login, password } = req.body;

    const exists =
        admins.some(
            admin =>
                admin.login.toLowerCase() ===
                login.toLowerCase()
        );

    if (exists) {

        return res.json({
            success: false,
            message: "Bu login allaqachon mavjud"
        });

    }

    admins.push({
        name,
        login,
        password
    });

    fs.writeFileSync(
        "admins.json",
        JSON.stringify(admins, null, 2)
    );

    console.log(admins);

    res.json({
        success: true
    });

});

app.post("/delete-admin", requireOwner, (req, res) => {

    const { login } = req.body;

    if (admins.length <= 1) {

        return res.json({
            success: false,
            message: "Kamida 1 ta admin qolishi kerak"
        });

    }

    const index =
        admins.findIndex(
            admin => admin.login === login
        );

    if (index !== -1) {

        admins.splice(index, 1);

        fs.writeFileSync(
            "admins.json",
            JSON.stringify(admins, null, 2)
        );

    }

    res.json({
        success: true
    });

});

app.get("/tables", requireLogin, (req, res) => {

    res.json(tables);

});

app.get("/income", requireLogin, (req, res) => {

    res.json({
        todayIncome
    });

});

app.get("/reports", requireLogin, (req, res) => {

    res.json(reports);

});

app.post("/add-income", requireLogin, (req, res) => {

    const { amount } = req.body;

    const income = Number(amount) || 0;

    todayIncome += income;

    fs.writeFileSync(
        "income.json",
        JSON.stringify(
            { todayIncome },
            null,
            2
        )
    );

    const now = new Date();

    const year =
        String(now.getFullYear());

    const month =
        String(now.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(now.getDate())
            .padStart(2, "0");

    if (!reports[year]) {
        reports[year] = {};
    }

    if (!reports[year][month]) {
        reports[year][month] = {};
    }

    if (!reports[year][month][day]) {
        reports[year][month][day] = 0;
    }

    reports[year][month][day] += income;

    fs.writeFileSync(
        "reports.json",
        JSON.stringify(
            reports,
            null,
            2
        )
    );

    res.json({
        success: true
    });

});

app.get("/admins", requireOwner, (req, res) => {

    res.json(admins);

});

app.get("/owner/owner.html", (req, res) => {

    if (req.session.role !== "owner") {
        return res.redirect("/");
    }

    res.sendFile(
        path.join(__dirname, "public", "owner", "owner.html")
    );

});

app.get("/admin.html", (req, res) => {

    if (
        req.session.role !== "owner" &&
        req.session.role !== "admin"
    ) {
        return res.redirect("/");
    }

    res.sendFile(
        path.join(__dirname, "public", "admin.html")
    );

});

app.get("/logout", (req, res) => {

    req.session.destroy(() => {
        res.redirect("/");
    });

});




app.post("/table-update", requireLogin, (req, res) => {

    const {
        id,
        status,
        remainingSeconds,
        startSeconds,
        money,
        mode
    } = req.body;

    const table =
        tables.find(item => item.id === id);

    if (table) {

        if (status !== undefined)
            table.status = status;

        if (remainingSeconds !== undefined)
            table.remainingSeconds = remainingSeconds;

        if (startSeconds !== undefined)
            table.startSeconds = startSeconds;

        if (money !== undefined)
            table.money = money;

        if (mode !== undefined)
            table.mode = mode;

    }

    fs.writeFileSync(
        "tables.json",
        JSON.stringify(tables, null, 2)
    );

    res.json({
        success: true
    });

});


const PORT =
    process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishga tushdi`)
})

setInterval(() => {

    const now = new Date()

    if (
        now.getHours() === 0 &&
        now.getMinutes() === 0
    ) {

        todayIncome = 0

        fs.writeFileSync(
            "income.json",
            JSON.stringify(
                { todayIncome },
                null,
                2
            )
        )

    }

}, 60000)

app.post("/add-table", requireLogin, (req, res) => {

    if (tables.length >= settings.maxTables) {

        return res.json({
            success: false,
            message: "Maksimal stol soniga yetildi"
        })

    }

    const newTable = {
        id: tables.length + 1,
        status: "free",
        remainingSeconds: 0,
        money: 0,
        mode: "time"
    };

    tables.push(newTable);

    fs.writeFileSync(
        "tables.json",
        JSON.stringify(tables, null, 2)
    );

    res.json({
        success: true
    });

});

app.post("/delete-table", requireLogin, (req, res) => {

    const { id } = req.body;

    const index =
        tables.findIndex(
            table => table.id === id
        );

    if (index !== -1) {

        tables.splice(index, 1);

        fs.writeFileSync(
            "tables.json",
            JSON.stringify(tables, null, 2)
        );

    }

    res.json({
        success: true
    });

});

app.get("/check-owner", (req, res) => {

    if (req.session.role === "owner") {

        return res.json({
            success: true
        })

    }

    res.json({
        success: false
    })

})

app.get("/check-admin", (req, res) => {

    if (
        req.session.role === "owner" ||
        req.session.role === "admin"
    ) {

        return res.json({
            success: true
        })

    }

    res.json({
        success: false
    })

})

function requireOwner(req, res, next) {

    if (req.session.role !== "owner") {

        return res.status(403).json({
            success: false,
            message: "Forbidden"
        })

    }

    next()

}

app.get("/client-tables", (req, res) => {

    res.json(tables)

})

app.get("/settings", requireLogin, (req, res) => {

    res.json(settings)

})

app.post("/settings", requireOwner, (req, res) => {

    settings = {
        ...settings,
        ...req.body
    }

    fs.writeFileSync(
        "settings.json",
        JSON.stringify(
            settings,
            null,
            2
        )
    )

    res.json({
        success: true
    })

})

app.post("/change-owner-password", (req, res) => {

    const {
        currentPassword,
        newPassword
    } = req.body

    if (
        currentPassword !==
        settings.ownerPassword
    ) {

        return res.json({
            success: false,
            message: "Joriy parol noto'g'ri"
        })

    }

    settings.ownerPassword =
        newPassword

    fs.writeFileSync(
        "settings.json",
        JSON.stringify(
            settings,
            null,
            2
        )
    )

    res.json({
        success: true
    })

})