import { RESPONSE_STATUS } from "../constants";

export const postForm = async ({ formValues, form }) => {
  const submitButton = document.getElementById("submit-button");

  submitButton.disabled = true;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:9090/api/registration");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    const response = JSON.parse(xhr.responseText);

    const toast = document.getElementById(`toast`);
    const toastMessageElement = document.getElementById("toast-message");

    if (response.status === RESPONSE_STATUS.SUCCESS) {
      form.reset();

      toast.classList.remove("error-toast");
      toast.classList.add("success-toast");
      toastMessageElement.classList.remove("error");
      toastMessageElement.classList.add("success");

      toastMessageElement.textContent = response.message;

      submitButton.disabled = false;
    }

    if (response.status === RESPONSE_STATUS.ERROR) {
      toast.classList.remove("success-toast");
      toast.classList.add("error-toast");
      toastMessageElement.classList.remove("success");
      toastMessageElement.classList.add("error");

      if (response.fields) {
        const fieldsErrors = [];

        const entries = Object.entries(response.fields);

        for (let [key, value] of entries) {
          fieldsErrors.push(`${value} in ${key} field`);
        }

        const message = fieldsErrors.join(", ");

        toastMessageElement.textContent = message;
      } else if (response.message) {
        toastMessageElement.textContent = response.message;
      }

      submitButton.disabled = false;
    }
  };

  xhr.send(formValues);
};
