const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5500;

//Middweare
app.use(express.static("./"));
app.use(express.json());

app.get("/", (req, res) => {
	res.sendFile(__dirname + "./contact.html");
});

app.post("/", (req, res) => {
	console.log(req.body);
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: "nunsinee.v@gmail.com",
			pass: "Mimmim2022",
		},
	});

	const mailOptions = {
		from: `${req.body.name} : ${req.body.message}`,
		to: "nunsinee.v@gmail.com",
		subject: `${req.body.subject} - ${req.body.message}`,
		text: req.body.message,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			res.send("error");
		} else {
			console.log("Email sent" + info.response);
			res.send("success");
		}
	});
});

app.listen(PORT, () => {
	console.log(`server running on ${PORT}`);
});
