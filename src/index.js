import Inputmask from "inputmask";

import "./styles.scss";
import { validateForm } from "./utils/validate";
import { postForm } from "./api";

const form = document.querySelector("#myForm");
form.addEventListener("submit", handleSubmit);

const phoneInput = document.getElementById("phone-input");
const phoneMask = new Inputmask("+375 (99) 999-99-99", {
  clearMaskOnLostFocus: false,
});
phoneMask.mask(phoneInput);

const textarea = document.getElementById("message-input");

textarea.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + 10 + "px";
});

function handleSubmit(event) {
  event.preventDefault();

  const name = document.querySelector("#name-input").value;
  const email = document.querySelector("#email-input").value;
  const phone = document.querySelector("#phone-input").value;
  const message = document.querySelector("#message-input").value;

  const formValues = {
    name,
    email,
    phone,
    message,
  };

  const validationResult = validateForm(formValues);

  const entries = Object.entries(validationResult);

  for (let [key, value] of entries) {
    if (!value.isValid) {
      document.getElementById(`${key}-error`).textContent = value.errorMsg;
      document.getElementById(`${key}-input`).classList.add("error-border");
    } else {
      document.getElementById(`${key}-error`).textContent = "";
      document.getElementById(`${key}-input`).classList.remove("error-border");
    }
  }

  const formIsValid = Object.values(validationResult).every((v) => v.isValid);

  if (formIsValid) {
    postForm({ formValues, form: this });
  }
}

const openModalButton = document.getElementById("modal-open-button");
const closeModalButton = document.getElementById("modal-close-button");
const modal = document.getElementById("modal");

const openModalHandler = () => {
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
};

const closeModalHandler = () => {
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
};

openModalButton.addEventListener("click", openModalHandler);
closeModalButton.addEventListener("click", closeModalHandler);
