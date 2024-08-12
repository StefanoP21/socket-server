const span = document.getElementById("lbl-new-ticket");
const button = document.querySelector("button");

async function getLastTicket() {
  const response = await fetch("api/ticket/last");
  span.innerText = await response.json();
}

async function createTicket() {
  const data = await fetch("api/ticket", {
    method: "POST",
  }).then((response) => response.json());
  span.innerText = data.ticketNumber;
}

button.addEventListener("click", createTicket);
getLastTicket();
