const inputs = document.querySelectorAll(".customer-input");
const dateInput = document.querySelector("input[type='date']");
const radios = document.querySelectorAll("input[type='radio']");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const form = document.getElementById("form");
const gift = document.querySelector(".gifts");
const submitBtn = document.querySelector(".submit");
const cancelBtn = document.querySelector(".cancel-btn");
const orderBtn = document.querySelector(".order-btn");
const modal = document.querySelector(".modal");
const orderDetails = document.querySelectorAll(".order-value");
const isValid = {
    name: false,
    surname: false,
    date: false,
    street: false,
    house: false,
    flat: false,
    payment: false,
    gift: true,
};

function enableSubmitBtn() {
    const check = Object.values(isValid).includes(false);
    if (!check) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", "disabled");
    }
}

inputs.forEach((input) => {
    input.addEventListener("blur", () => {
        if (!input.classList.contains("error")) {
            const errorMessage = getErrorMessage(
                input.value,
                input.dataset.name
            );
            if (errorMessage) {
                displayError(input, errorMessage);
                isValid[input.dataset.name] = false;
                enableSubmitBtn();
                return;
            } else {
                isValid[input.dataset.name] = true;
                enableSubmitBtn();
                return;
            }
        } else {
            const errorMessage = getErrorMessage(
                input.value,
                input.dataset.name
            );
            if (errorMessage) {
                updateError(input, errorMessage);
                isValid[input.dataset.name] = false;
                enableSubmitBtn();
                return;
            } else {
                isValid[input.dataset.name] = true;
                enableSubmitBtn();
                removeError(input);
                return;
            }
        }

        removeError(input);
    });
});

dateInput.addEventListener("change", () => {
    const errorMessage = getErrorMessage(
        dateInput.value,
        dateInput.dataset.name
    );
    if (!errorMessage) {
        isValid[dateInput.dataset.name] = true;
        enableSubmitBtn();
    }
});

radios.forEach((radio) => {
    radio.addEventListener("change", () => {
        isValid.payment = true;
        enableSubmitBtn();
    });
});

gift.querySelectorAll("input").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        const gifts = gift.querySelectorAll("input");
        let count = 0;
        for (const gift of gifts) {
            if (gift.checked) count++;
        }

        if (count <= 2) {
            isValid.gift = true;
            enableSubmitBtn();
            gift.classList.remove("error");
            const message = gift.querySelector("span");
            if (message) message.remove();
        } else {
            isValid.gift = false;
            enableSubmitBtn();
            if (!gift.classList.contains("error")) {
                gift.classList.add("error");
                const span = document.createElement("span");
                span.className = "errorMessage";
                span.textContent = "Please choose only 2 gifts";
                gift.append(span);
            }
        }
    });
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll("input");
    const payments = document.querySelectorAll("input[type='radio']:checked");
    const gifts = document.querySelectorAll("input[type='checkbox']:checked");
    const values = [];
    const values2 = [];
    for (const input of inputs) {
        values.push(input.value);
    }
    values.length = 6;
    for (const payment of payments) {
        values.push(payment.value);
    }

    for (const gift of gifts) {
        values2.push(gift.value);
    }

    for (let i = 0; i < orderDetails.length; i++) {
        if (i < 7) {
            orderDetails[i].textContent = values[i];
        } else {
            orderDetails[i].textContent = values2.join(", ");
        }
    }

    document.querySelector("body").style.overflowY = "hidden";
    modal.hidden = false;
});

cancelBtn.addEventListener("click", () => {
    document.querySelector("body").style.overflowY = "auto";
    modal.hidden = true;
});

orderBtn.addEventListener("click", () => {
    location.reload();
});

function displayError(input, message) {
    input.classList.add("error");
    const span = document.createElement("span");
    span.className = "errorMessage";
    span.textContent = message;
    input.closest("label").append(span);
}

function updateError(input, message) {
    span = input.closest("label").querySelector("span");
    span.textContent = message;
}

function removeError(input) {
    input.classList.remove("error");
    span = input.closest("label").querySelector("span");
    span.remove();
}

function getErrorMessage(value, name) {
    switch (name) {
        case "name": {
            let message;
            if (!value.length) {
                message = "This field is required";
            } else if (value.length < 4) {
                message = "The length should be not less than 4 symbols";
            } else if (/\s/g.test(value)) {
                message = "Please enter without space";
            } else if (!/^[A-Za-z]+$/.test(value)) {
                message = "Please enter only letters, A-Z or a-z";
            }
            return message;
        }
        case "surname": {
            let message;
            if (!value.length) {
                message = "This field is required";
            } else if (value.length < 5) {
                message = "The length should be not less than 5 symbols";
            } else if (/\s/g.test(value)) {
                message = "Please enter without space";
            } else if (!/^[A-Za-z]+$/.test(value)) {
                message = "Please enter only letters, A-Z or a-z";
            }
            return message;
        }
        case "date": {
            let message;
            if (!value.length) {
                message = "This field is required";
            } else if (new Date(value) - new Date() <= 0) {
                message = "Please enter date not earlier than next day";
            }
            return message;
        }
        case "street": {
            let message;
            if (!value.length) {
                message = "This field is required";
            } else if (value.length < 5) {
                message = "The length should be not less than 5 symbols";
            }
            return message;
        }
        case "house": {
            let message;
            if (!value.length && typeof value === "number") {
                message = "This field is required";
            } else if (!value.length && typeof value === "string") {
                message = "Please enter only number";
            } else if (isNaN(Number(value)) || Number(value) <= 0) {
                message = "Please enter only positive numbers";
            }
            return message;
        }
        case "flat": {
            let message;
            console.log(value);
            if (!value.length && typeof value === "number") {
                message = "This field is required";
            } else if (
                Number(value) <= 0 &&
                value
                    .split("-")
                    .join("")
                    .match(/^[1-9]+[0-9]*$/)
            ) {
                message = "Please enter only positive numbers";
            }
            return message;
        }
    }
}
