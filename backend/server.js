const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

    if (errors.length > 0) {
        return res.send({ status: "error", errors });
    }

    res.send({ status: "success", message: "Form submitted successfully" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
