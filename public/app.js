const ownerBtn =
    document.querySelector(".owner-btn")

const adminBtn =
    document.querySelector(".admin-btn")

if (ownerBtn) {

    ownerBtn.addEventListener("click", () => {

        localStorage.setItem("role", "owner")

        window.location.href = "loging.html"

    })

}

if (adminBtn) {

    adminBtn.addEventListener("click", () => {

        localStorage.setItem("role", "admin")

        window.location.href = "loging.html"

    })

}
const loginForm =
    document.getElementById("loginForm")

if (loginForm) {

    loginForm.addEventListener("submit", (e) => {

        e.preventDefault()

        const login =
            document.getElementById("login").value

        const password =
            document.getElementById("password").value

        const selectedRole =
            localStorage.getItem("role")

        const errorEl =
            document.getElementById("loginError")

        errorEl.textContent = ""

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login,
                password,
                selectedRole
            })
        })
            .then(res => res.json())
            .then(data => {

                if (data.success) {

                    errorEl.textContent = ""

                    if (data.role === "owner") {

                        window.location.href =
                            "/owner/owner.html"

                    } else {

                        window.location.href =
                            "/admin.html"

                    }

                } else {

                    errorEl.textContent =
                        "Login yoki parol noto'g'ri"

                }

            })

    })

}

const clientBtn =
    document.querySelector(".customer-btn")

if (clientBtn) {

    clientBtn.addEventListener("click", () => {

        window.location.href =
            "/client.html"

    })

}