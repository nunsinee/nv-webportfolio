const form = document.querySelector("#contactForm");
const contactName = document.querySelector(".name");
const subjectCheck = document.querySelector(".subject");
const emailCheck = document.querySelector(".email");
const textArea = document.querySelector(".message");
const messageAlert = document.querySelector("#messageAlert");

//if all the input  pass validation
contactName.addEventListener("input", () => {
	if (checkLength(contactName.value, 0) === true) {
		contactNameError.style.display = "none";
	} else {
		contactNameError.style.display = "block";
	}
});

subjectCheck.addEventListener("input", () => {
	if (checkLength(subjectCheck.value, 9) === true) {
		subjectError.style.display = "none";
	} else {
		subjectError.style.display = "block";
	}
});

emailCheck.addEventListener("input", () => {
	if (validateEmail(emailCheck.value) === true) {
		emailError.style.display = "none";
	} else {
		emailError.style.display = "block";
	}
});

textArea.addEventListener("input", () => {
	if (checkLength(textArea.value, 19) === true) {
		textAreaError.style.display = "none";
	} else {
		textAreaError.style.display = "block";
	}
});

form.addEventListener("submit", submitForm);

//2.function to run when the form is submitted
function submitForm(event) {
	event.preventDefault();
	if (
		checkLength(contactName.value, 0) &&
		checkLength(subjectCheck.value, 9) &&
		validateEmail(emailCheck.value) &&
		checkLength(textArea.value, 19)
	) {
		//display the message when the form has been submitted
		messageAlert.innerHTML = `<div class="message"> Your message has been sent </div>`;
		form.reset();
	} else {
		messageAlert.innerHTML = "";
	}
}

//3.function to check if the length of the input value is valid
function checkLength(value, len) {
	if (value.trim().length > len) {
		return true;
	} else {
		return false;
	}
}

//4.function to check if email is valid
function validateEmail(emailCheck) {
	const regEX = /\S+@\S+\.\S+/;
	const patternMatches = regEX.test(emailCheck);
	return patternMatches;
}
