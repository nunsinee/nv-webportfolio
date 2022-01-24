const contactForm = document.querySelector(".contact-form");

let name = document.querySelector("#name");
let email = document.querySelector("#email");
let subject = document.querySelector("#subject");
let message = document.querySelector("#message");

name.addEventListener("input", () => {
	if (checkLength(name.value, 1) === true) {
		contactNameError.style.display = "none";
	} else {
		contactNameError.style.display = "block";
	}
});

subject.addEventListener("input", () => {
	if (checkLength(subject.value, 9) === true) {
		subjectError.style.display = "none";
	} else {
		subjectError.style.display = "block";
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
	if (checkLength(message.value, 19) === true) {
		textAreaError.style.display = "none";
	} else {
		textAreaError.style.display = "block";
	}
});

contactForm.addEventListener("submit", (e) => {
	e.preventDefault();

	if (
		checkLength(name.value, 1) ||
		(checkLength(name.value !== null) &&
			checkLength(subject.value, 9) &&
			validateEmail(email.value) &&
			checkLength(message.value, 19))
	) {
		senddingMail();
		contactForm.reset();
	} else {
		messageAlert.innerHTML = "";
		// contactForm.reset();
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
		subject: subject.value,
		message: message.value,
	};
	let xhr = new XMLHttpRequest();

	xhr.open("POST", "/");
	xhr.setRequestHeader("content-type", "application/json");
	xhr.onload = function () {
		console.log(xhr.responseText);
		if (xhr.responseText == "success") {
			//alert("email sent");
			messageAlert.innerHTML = `<div class="alert alert-success"> Your message has been sent </div>`;
			name.value = "";
			email.value = "";
			subject.value = "";
			message.value = "";
		} else {
			//alert("something went wrong!");
			messageAlert.innerHTML = `<div class="alert alert-danger"> Sorry! something went wrong.</div>`;
		}
	};
	xhr.send(JSON.stringify(formData));
}
