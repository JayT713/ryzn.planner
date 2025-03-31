document.addEventListener("DOMContentLoaded", () => {
  // Set current date in header
  const dateDisplay = document.querySelector(".date-display")
  if (dateDisplay) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    const today = new Date()
    dateDisplay.textContent = today.toLocaleDateString("en-US", options)
  }

  // Time period filter
  const periodButtons = document.querySelectorAll(".period-btn")

  periodButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      periodButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      // Get period value
      const period = button.getAttribute("data-period")

      // In a real app, this would update the data for the selected time period
      console.log(`Update data for period: ${period}`)

      // For demo purposes, show a loading message
      alert(`Loading data for ${period}...`)
    })
  })

  // Export progress report
  const exportButton = document.getElementById("export-progress-btn")

  if (exportButton) {
    exportButton.addEventListener("click", () => {
      // In a real app, this would generate and download a PDF or CSV report
      alert(
        "Generating progress report...\n\nIn a real application, this would download a PDF or CSV file with your progress data.",
      )
    })
  }

  // Chart actions
  const chartActionButtons = document.querySelectorAll(".chart-actions .btn-icon")

  chartActionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // In a real app, this would show a dropdown menu with options
      alert(
        "Chart options would appear here, such as:\n- Download as image\n- View full screen\n- Change chart type\n- Export data",
      )
    })
  })

  // Info buttons for study habits
  const infoButtons = document.querySelectorAll(".habits-card-header .btn-icon")

  infoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const cardTitle = button.previousElementSibling.textContent

      // Show different information based on the card title
      let message = ""

      switch (cardTitle) {
        case "Peak Study Hours":
          message =
            "This chart shows the times of day when you're most productive based on your study session data. The higher the bar, the more effective your studying is during that time."
          break
        case "Study Session Length":
          message =
            "This chart shows the distribution of your study session lengths. It helps identify your preferred study duration patterns."
          break
        case "Focus Quality":
          message =
            "Focus quality is calculated based on task completion rate, time spent on tasks vs. breaks, and self-reported focus levels. Higher scores indicate better concentration."
          break
        case "Study Environment":
          message =
            "This chart shows where you study most frequently and your productivity in each environment. The data is collected from your study session logs."
          break
        default:
          message = "Additional information about this metric would appear here."
      }

      alert(message)
    })
  })

  // Recommendation buttons
  const recommendationButtons = document.querySelectorAll(".recommendation-content .btn-text")

  recommendationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const recommendationTitle = button.closest(".recommendation-content").querySelector("h4").textContent

      // Show different actions based on the recommendation title
      switch (recommendationTitle) {
        case "Increase Calculus Study Time":
          alert("This would open your schedule planner to add more Calculus study sessions.")
          break
        case "Optimize Study Schedule":
          alert("This would show you an optimized study schedule based on your peak productivity hours.")
          break
        case "Try Pomodoro Technique":
          alert(
            "This would provide information about the Pomodoro Technique and how to implement it in your study routine.",
          )
          break
        default:
          alert("Action for this recommendation would appear here.")
      }
    })
  })
})

