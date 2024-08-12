const h1 = document.getElementById("lbl-pending");
const deskHeader = document.querySelector("h1");
const alert = document.querySelector(".alert");

const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("Desk is required");
}

const deskNumber = searchParams.get("escritorio");
deskHeader.innerHTML = deskNumber;

function checkTicketCount(currentCount = 0) {
  if (currentCount === 0) {
    alert.classList.remove("d-none");
  } else {
    alert.classList.add("d-none");
  }
  h1.innerHTML = currentCount;
}

async function loadInitialCount() {
  const pendingTickets = await fetch("/api/ticket/pending").then((response) =>
    response.json()
  );
  checkTicketCount(pendingTickets.length);
}

function connectToWebSockets() {
  const socket = new WebSocket("ws://localhost:3000/ws");

  socket.onmessage = (event) => {
    console.log(event.data);
    const { type, payload } = JSON.parse(event.data);
    if (type !== "on-ticket-count-changed") return;
    checkTicketCount(payload);
  };

  socket.onclose = (event) => {
    console.log("Connection closed");
    setTimeout(() => {
      console.log("retrying to connect");
      connectToWebSockets();
    }, 1500);
  };

  socket.onopen = (event) => {
    console.log("Connected");
  };
}

loadInitialCount();
connectToWebSockets();
