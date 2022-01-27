const contactForm = document.querySelector(".contact-form");

const name = document.querySelector("#name");
const contactNameError = document.querySelector("#contactNameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const message = document.querySelector("#message");
const textAreaError = document.querySelector("#textAreaError ");

name.addEventListener("input", () => {
	if (checkLength(name.value.trim(), 0) === true) {
		contactNameError.style.display = "none";
	} else {
		contactNameError.style.display = "block";
	}
});

email.addEventListener("input", () => {
	if (validateEmail(email.value) === true) {
		emailError.style.display = "none";
	} else {
		emailError.style.display = "block";
	}
});

message.addEventListener("input", () => {
	if (checkLength(message.value.trim(), 19) === true) {
		textAreaError.style.display = "none";
	} else {
		textAreaError.style.display = "block";
	}
});

contactForm.addEventListener("submit", (e) => {
	e.preventDefault();

	if (
		checkLength(name.value, 1) &&
		validateEmail(email.value) &&
		checkLength(message.value, 19)
	) {
		senddingMail();
		contactForm.reset();
	} else {
		messageAlert.innerHTML = "";
	}
});

//function to check if the length of the input value is valid
function checkLength(value, len) {
	if (value.trim().length > len) {
		return true;
	} else {
		return false;
	}
}

//function to check if email is valid
function validateEmail(email) {
	const regEX = /\S+@\S+\.\S+/;
	const patternMatches = regEX.test(email);
	return patternMatches;
}

//function sending email to nodemailer

function senddingMail() {
	let formData = {
		name: name.value,
		email: email.value,
		message: message.value,
	};
	emailjs
		.send("service_6noogkt", "template_xf6zs66", formData)
		.then(function (res) {
			console.log("success", res.status);
			messageAlert.innerHTML = `<div class="alert alert-custom"> Your message has been sent! </div>`;
		})
		.catch(function (err) {
			console.log("not sent", err.status);
			messageAlert.innerHTML = `<div class="alert alert-danger"> Sorry! something went wrong.</div>`;
		});
}
