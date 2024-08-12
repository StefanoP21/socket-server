function renderTickets(tickets = []) {
  for (let i = 0; i < tickets.length; i++) {
    if (i >= 4) break;

    const ticket = tickets[i];
    if (!ticket) break;

    const lblTicket = document.querySelector(`#lbl-ticket-0${i + 1}`);
    const lblDesk = document.querySelector(`#lbl-desk-0${i + 1}`);

    lblTicket.innerText = `Ticket ${ticket.ticketNumber}`;
    lblDesk.innerText = ticket.handledAtDesk;
  }
}

async function loadCurrentTicket() {
  const tickets = await fetch("/api/ticket/working-on").then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error loading tickets");
    }
  });
  renderTickets(tickets);
}

loadCurrentTicket();
