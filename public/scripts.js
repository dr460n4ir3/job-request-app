const form = document.querySelector("#service-request-form");

// The following line of code adds an event listener to the form submit event
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const serviceTypeSelect = document.querySelector("#service-type");
  const selectedServiceType = serviceTypeSelect.options[serviceTypeSelect.selectedIndex].text;

  const currentDate = new Date();
  const dateString = currentDate.toISOString().substr(0, 10);
  const timeString = currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  const newServiceRequest = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    "service type": selectedServiceType,
    date: dateString,
    time: timeString,
    description: formData.get("description")
  }

  // The following line of code sends data from the form to the server
  fetch("http://localhost:4004/service-requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newServiceRequest)
  })
  .then(response => {
    if (response.ok) {
      form.reset();
      alert("Request sent successfully!");
    } else {
      alert("Error submitting form. Please try again later.");
    }
  })
  .catch(error => {
    console.error(error);
    alert("Error submitting form. Please try again later.");
  });
});
