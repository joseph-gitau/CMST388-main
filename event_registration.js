/*
        Your Name: <Raven Pressley>
        Last Modified Date: <05/04/2023>
        File: event_registration.js
        File Description: <The purpose of this file is to make the web page functional. As well as this file is used to to validate and make the hmtl file use the functions that were put on it. When using a javascript file it is essential tio make sure that the hmtl file and css files are linked>
*/

// Set the minimum and maximum number of tickets able to be purchased
var minTickets = 1;
var maxTickets = 3;
// Set variables for the ticket cost
var costPerTicket = 5.00;
var ticketSurcharge = 0.50;

/*** YOUR CODE STARTS BELOW HERE ***/

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            // trigger a redirect or an alert message here
            alert("Your Session has timed out");
            // on ok button reload the page
            window.location.reload();
        }
    }, 1000);
}

window.onload = function () {
    var tenMinutes = 60 * 10,
        display = document.querySelector('#countdown-timer');
    startTimer(tenMinutes, display);
};

function calculateTotal() {
    var numTickets = parseInt(document.getElementById("numTickets").value);
    if (isNaN(numTickets)) {
        numTickets = 0;
    } else if (numTickets < minTickets) {
        numTickets = minTickets;
    } else if (numTickets > maxTickets) {
        numTickets = maxTickets;
    }

    // reset the value in the input field to the new value
    numTickets = document.getElementById("numTickets").value = numTickets;
    var totalCost = (costPerTicket + ticketSurcharge) * numTickets;

    document.getElementById("total").innerHTML = "$" + totalCost.toFixed(2);
}


// validate the contant information
function validateName() {
    // Get the input value and error element
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    // Clear any previous error message
    nameError.innerHTML = '';
    // Check if name field is empty
    if (nameInput.value.trim() === '') {
        nameError.innerHTML = 'Please enter your name';
        nameInput.focus();
        return false;
    }
    // Check if name contains only letters and spaces
    if (!nameInput.value.match(/^[A-Za-z\s]+$/)) {
        nameError.innerHTML = 'Please enter a valid name';
        nameInput.focus();
        return false;
    }
    // Check if name contains at least two words
    if (nameInput.value.split(' ').length < 2) {
        nameError.innerHTML = 'Please enter your full name';
        nameInput.focus();
        return false;
    }
    // Check if name is longer than 2 characters and shorter than 50 characters
    if (nameInput.value.length < 2 || nameInput.value.length > 50) {
        nameError.innerHTML = 'Please enter a name between 2 and 50 characters';
        nameInput.focus();
        return false;
    }
    // All validations passed
    nameError.innerHTML = 'Name is valid';
    return true;
}


function validateEmail() {
    var email = document.getElementById('email').value;
    var emailError = document.getElementById('email-error');

    if (email.length == 0) {
        emailError.innerHTML = 'Email is required'
        return false;
    }

    // Check for valid email format using regular expression
    if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
        emailError.innerHTML = 'Email is invalid';
        return false;
    }

    // All validations passed
    emailError.innerHTML = 'Email is valid';
    return true;

}


// get reset button and add event listener
let btnReset = document.getElementById('btnReset');
let inputs = document.querySelectorAll('input');


if (btnReset) {
    btnReset.addEventListener('click', () => {
        inputs.forEach(input => input.value = '');
    });
}


// Use the submit function and complete purchase
function completePurchase() {
    // check if all validations passed and no. of tickets is greater than 0
    if (validateName() && validateEmail() && document.getElementById('numTickets').value > 0) {
         confirm('Is this what you are ordering?');
        // if yes, show alert and reload page
        return alert("Your Purchase was complete") && window.location.reload();
    } else {
        return confirm('Please correct the errors and try again');
    }
}
