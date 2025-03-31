document.addEventListener("DOMContentLoaded", () => {
  // Tab navigation
  const tabLinks = document.querySelectorAll(".settings-nav li")
  const tabContents = document.querySelectorAll(".settings-tab")

  tabLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const tabId = link.getAttribute("data-tab")

      // Update active tab link
      tabLinks.forEach((l) => l.classList.remove("active"))
      link.classList.add("active")

      // Update active tab content
      tabContents.forEach((content) => {
        content.classList.remove("active")
        if (content.id === `${tabId}-tab`) {
          content.classList.add("active")
        }
      })
    })
  })

  // Theme selection
  const themeOptions = document.querySelectorAll(".theme-option")

  themeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      themeOptions.forEach((o) => o.classList.remove("active"))
      option.classList.add("active")

      // In a real app, this would update the theme
      console.log(`Theme changed to: ${option.querySelector(".theme-label span").textContent}`)
    })
  })

  // Color selection
  const colorOptions = document.querySelectorAll(".color-option")

  colorOptions.forEach((option) => {
    option.addEventListener("click", () => {
      colorOptions.forEach((o) => o.classList.remove("active"))
      option.classList.add("active")

      // In a real app, this would update the accent color
      const color = option.style.getPropertyValue("--color")
      console.log(`Accent color changed to: ${color}`)
    })
  })

  // Font size slider
  const fontSizeSlider = document.getElementById("font-size-slider")

  if (fontSizeSlider) {
    fontSizeSlider.addEventListener("input", function () {
      // In a real app, this would update the font size
      console.log(`Font size changed to: ${this.value}`)
    })
  }

  // Profile picture upload
  const profilePicture = document.querySelector(".profile-picture")

  if (profilePicture) {
    profilePicture.addEventListener("click", () => {
      // In a real app, this would open a file picker
      console.log("Profile picture clicked")
    })
  }

  // Save changes buttons
  const saveButtons = document.querySelectorAll(".btn-primary")

  saveButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // In a real app, this would save the settings
      alert("Settings saved successfully!")
    })
  })

  // Delete account button
  const deleteAccountBtn = document.querySelector(".btn-danger")

  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", () => {
      // In a real app, this would show a confirmation dialog
      const confirmed = confirm("Are you sure you want to delete your account? This action cannot be undone.")

      if (confirmed) {
        // In a real app, this would delete the account
        console.log("Account deleted")
      }
    })
  }

  // Set current date in header
  const dateDisplay = document.querySelector(".date-display")
  if (dateDisplay) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    const today = new Date()
    dateDisplay.textContent = today.toLocaleDateString("en-US", options)
  }
})

