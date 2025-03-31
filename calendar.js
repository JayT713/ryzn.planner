document.addEventListener("DOMContentLoaded", () => {
  // Set current date in header
  const dateDisplay = document.querySelector(".date-display")
  if (dateDisplay) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    const today = new Date()
    dateDisplay.textContent = today.toLocaleDateString("en-US", options)
  }

  // Calendar view buttons
  const viewButtons = document.querySelectorAll(".view-btn")

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      viewButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      // Get view value
      const view = button.getAttribute("data-view")

      // In a real app, this would switch between different calendar views
      alert(`Switching to ${view} view...`)
    })
  })

  // Calendar navigation
  const prevButton = document.querySelector(".calendar-navigation .btn-icon:first-child")
  const nextButton = document.querySelector(".calendar-navigation .btn-icon:last-child")
  const currentMonthElement = document.querySelector(".current-month")

  if (prevButton && nextButton && currentMonthElement) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    const currentDate = new Date()

    prevButton.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1)
      updateCalendarHeader()
      alert("In a real app, this would load the previous month's calendar")
    })

    nextButton.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1)
      updateCalendarHeader()
      alert("In a real app, this would load the next month's calendar")
    })

    function updateCalendarHeader() {
      currentMonthElement.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    }
  }

  // Add Event button
  const addEventButton = document.querySelector(".calendar-actions .btn-primary")
  const addEventModal = document.getElementById("add-event-modal")
  const closeModalButton = document.querySelector(".close-modal")
  const cancelModalButton = document.querySelector(".cancel-modal")

  if (addEventButton && addEventModal) {
    addEventButton.addEventListener("click", () => {
      addEventModal.classList.add("active")
      document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
    })
  }

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal)
  }

  if (cancelModalButton) {
    cancelModalButton.addEventListener("click", closeModal)
  }

  function closeModal() {
    addEventModal.classList.remove("active")
    document.body.style.overflow = "" // Re-enable scrolling
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === addEventModal) {
      closeModal()
    }
  })

  // Set default date to today
  const eventDateInput = document.getElementById("event-date")
  if (eventDateInput) {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    eventDateInput.value = `${year}-${month}-${day}`
  }

  // Calendar events
  const calendarEvents = document.querySelectorAll(".calendar-event")

  calendarEvents.forEach((event) => {
    event.addEventListener("click", () => {
      const title = event.querySelector(".event-title").textContent
      const time = event.querySelector(".event-time").textContent
      const location = event.querySelector(".event-location").textContent

      alert(
        `Event: ${title}\nTime: ${time}\nLocation: ${location}\n\nIn a real app, this would open the event details.`,
      )
    })
  })

  // Add event form submission
  const addEventForm = document.getElementById("add-event-form")

  if (addEventForm) {
    addEventForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const title = document.getElementById("event-title").value
      const date = document.getElementById("event-date").value
      const startTime = document.getElementById("event-start-time").value
      const endTime = document.getElementById("event-end-time").value
      const location = document.getElementById("event-location").value
      const description = document.getElementById("event-description").value
      const course = document.getElementById("event-course").value

      // Get reminders
      const reminders = []
      document.querySelectorAll('input[name="event-reminder"]:checked').forEach((checkbox) => {
        reminders.push(checkbox.value)
      })

      // In a real app, this would add the event to the calendar
      alert(
        `Event added: ${title}\nDate: ${date}\nTime: ${startTime} - ${endTime}\nLocation: ${location}\n\nIn a real app, this would add the event to your calendar.`,
      )

      // Close modal and reset form
      closeModal()
      addEventForm.reset()

      // Reset date to today
      if (eventDateInput) {
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, "0")
        const day = String(today.getDate()).padStart(2, "0")
        eventDateInput.value = `${year}-${month}-${day}`
      }
    })
  }
})

