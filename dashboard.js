document.addEventListener("DOMContentLoaded", () => {
  // Sidebar toggle
  const sidebarToggle = document.getElementById("sidebar-toggle")
  const sidebar = document.getElementById("sidebar")

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed")
    })
  }

  // Set current date
  const dateDisplay = document.querySelector(".date-display")
  if (dateDisplay) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    const today = new Date()
    dateDisplay.textContent = today.toLocaleDateString("en-US", options)
  }

  // Task checkbox functionality
  const taskCheckboxes = document.querySelectorAll(".task-checkbox input")

  taskCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const taskItem = this.closest(".task-item")

      if (this.checked) {
        taskItem.classList.add("completed")
      } else {
        taskItem.classList.remove("completed")
      }
    })
  })

  // Calendar day click
  const calendarDays = document.querySelectorAll(".calendar-day")

  calendarDays.forEach((day) => {
    day.addEventListener("click", function () {
      // Remove current-day class from all days
      calendarDays.forEach((d) => d.classList.remove("selected-day"))

      // Add selected-day class to clicked day
      this.classList.add("selected-day")

      // In a real app, this would load events for the selected day
      console.log(`Selected day: ${this.textContent.trim()}`)
    })
  })

  // Event card actions
  const eventActionButtons = document.querySelectorAll(".event-actions .btn-icon")

  eventActionButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation()

      // In a real app, this would show a dropdown menu
      console.log("Event actions clicked")
    })
  })

  // Task actions
  const taskActionButtons = document.querySelectorAll(".task-actions .btn-icon")

  taskActionButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation()

      // In a real app, this would show a dropdown menu
      console.log("Task actions clicked")
    })
  })

  // Responsive sidebar for mobile
  function handleResponsiveSidebar() {
    if (window.innerWidth <= 576) {
      sidebar.classList.add("collapsed")

      // Create mobile menu toggle if it doesn't exist
      if (!document.querySelector(".mobile-menu-toggle")) {
        const mobileToggle = document.createElement("button")
        mobileToggle.className = "mobile-menu-toggle icon-btn"
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>'

        mobileToggle.addEventListener("click", () => {
          sidebar.classList.toggle("expanded")
        })

        document.querySelector(".dashboard-header").prepend(mobileToggle)
      }
    } else {
      // Remove mobile toggle if screen is larger
      const mobileToggle = document.querySelector(".mobile-menu-toggle")
      if (mobileToggle) {
        mobileToggle.remove()
      }
    }
  }

  // Initial call
  handleResponsiveSidebar()

  // Listen for window resize
  window.addEventListener("resize", handleResponsiveSidebar)

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 576 &&
      sidebar.classList.contains("expanded") &&
      !sidebar.contains(e.target) &&
      !e.target.classList.contains("mobile-menu-toggle") &&
      !e.target.closest(".mobile-menu-toggle")
    ) {
      sidebar.classList.remove("expanded")
    }
  })
})

