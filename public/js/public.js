const btnForEvent = document.getElementById('#btnforevent');
btnForEvent.addEventListener('click', async (e) => {
  if (e.target.classList.includes('press-event-button')) {
    const { userid } = e.target.dataset;
    const { eventid } = e.target.dataset;
    await fetch('/events/signup', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ userid, eventid }),

    });
    e.target.classList.remove('press-event-button');
    e.target.classList.add('unpress-event-button');
  } else {
    e.target.classList.remove('unpress-event-button');
    e.target.classList.add('press-event-button');
    window.location.replace('/private');
  }
});
