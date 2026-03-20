// Set the date we're counting down to
// WARNING: The user did not provide a specific date, so we are using a placeholder.
// TODO: Update this when the user provides the date.
const weddingDate = new Date("Jul 25, 2026 15:00:00").getTime();

// Update the count down every 1 second
const x = setInterval(function () {

  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = weddingDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="countdown"
  document.getElementById("days").innerHTML = days < 10 ? '0' + days : days;
  document.getElementById("hours").innerHTML = hours < 10 ? '0' + hours : hours;
  document.getElementById("minutes").innerHTML = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById("seconds").innerHTML = seconds < 10 ? '0' + seconds : seconds;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "¡Es hoy!";
  }
}, 1000);
