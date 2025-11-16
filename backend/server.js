const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());  // <-- REQUIRED FOR REACT
app.use(express.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
    const { username, email, phone, gender } = req.body;

    let errors = [];

    if (!username) {
        errors.push("please enter your name");
    }

    if (!email || !email.includes("@")) {
        errors.push("Invalid email");
    }

    if (!phone || phone.length !== 10) {
        errors.push("please enter your phone number. it must be 10 digits long");
    }

    if (!gender) {
        errors.push("Please enter your gender");
    }

    if (errors.length >= 1) {
        return res.send({ status: "error", errors });
    }

    res.send({ status: "success", message: "Form submitted successfully" });
});

app.listen(3000, () => console.log("Server running on 3000"));
