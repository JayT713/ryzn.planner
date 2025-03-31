document.addEventListener("DOMContentLoaded", () => {
  // Set current date in header
  const dateDisplay = document.querySelector(".date-display")
  if (dateDisplay) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    const today = new Date()
    dateDisplay.textContent = today.toLocaleDateString("en-US", options)
  }

  // Tab navigation
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get the tab to show
      const tabToShow = button.getAttribute("data-tab")

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      button.classList.add("active")
      document.getElementById(`${tabToShow}-content`).classList.add("active")
    })
  })

  // Create Group Modal
  const createGroupBtn = document.getElementById("create-group-btn")
  const createGroupModal = document.getElementById("create-group-modal")
  const closeModalBtn = document.querySelector(".close-modal")
  const cancelModalBtn = document.querySelector(".cancel-modal")

  if (createGroupBtn && createGroupModal) {
    createGroupBtn.addEventListener("click", () => {
      createGroupModal.classList.add("active")
      document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
    })
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal)
  }

  if (cancelModalBtn) {
    cancelModalBtn.addEventListener("click", closeModal)
  }

  function closeModal() {
    createGroupModal.classList.remove("active")
    document.body.style.overflow = "" // Re-enable scrolling
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === createGroupModal) {
      closeModal()
    }
  })

  // Group course selection
  const groupCourseSelect = document.getElementById("group-course")
  const otherCourseGroup = document.getElementById("other-course-group")

  if (groupCourseSelect && otherCourseGroup) {
    groupCourseSelect.addEventListener("change", function () {
      if (this.value === "other") {
        otherCourseGroup.style.display = "block"
      } else {
        otherCourseGroup.style.display = "none"
      }
    })
  }

  // Color selection in modal
  const colorOptions = document.querySelectorAll(".color-option")
  const groupColorInput = document.getElementById("group-color-input")

  if (colorOptions.length > 0 && groupColorInput) {
    colorOptions.forEach((option) => {
      option.addEventListener("click", () => {
        // Remove active class from all options
        colorOptions.forEach((opt) => opt.classList.remove("active"))

        // Add active class to clicked option
        option.classList.add("active")

        // Update hidden input value
        const color = option.getAttribute("data-color")
        groupColorInput.value = color
      })
    })
  }

  // Form submission
  const createGroupForm = document.getElementById("create-group-form")

  if (createGroupForm) {
    createGroupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const groupName = document.getElementById("group-name").value
      const groupCourse = document.getElementById("group-course").value
      const otherCourse = document.getElementById("other-course").value
      const groupDescription = document.getElementById("group-description").value
      const meetingType = document.getElementById("meeting-type").value
      const meetingFrequency = document.getElementById("meeting-frequency").value
      const meetingLocation = document.getElementById("meeting-location").value
      const groupColor = groupColorInput.value
      const groupPrivacy = document.querySelector('input[name="group-privacy"]:checked').value

      // In a real app, this would create a new group
      alert(`Group "${groupName}" created successfully!`)

      // Close modal and reset form
      closeModal()
      createGroupForm.reset()
    })
  }

  // Group action buttons
  const joinMeetingButtons = document.querySelectorAll(".group-footer .btn-primary")
  const viewDetailsButtons = document.querySelectorAll(".group-footer .btn-secondary")
  const requestJoinButtons = document.querySelectorAll(".discover-group-actions .btn-primary")
  const acceptInviteButtons = document.querySelectorAll(".invitation-actions .btn-primary")
  const declineInviteButtons = document.querySelectorAll(".invitation-actions .btn-secondary")

  joinMeetingButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const groupName = this.closest(".study-group-card").querySelector("h4").textContent
      alert(`Joining meeting for ${groupName}. In a real app, this would open the meeting interface.`)
    })
  })

  viewDetailsButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const groupName = this.closest(".study-group-card").querySelector("h4").textContent
      alert(`Viewing details for ${groupName}. In a real app, this would show the group details page.`)
    })
  })

  requestJoinButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const groupName = this.closest(".discover-group-item").querySelector("h4").textContent
      alert(`Request sent to join ${groupName}. In a real app, this would send a join request to the group admin.`)
      button.textContent = "Request Sent"
      button.disabled = true
    })
  })

  acceptInviteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const groupName = this.closest(".invitation-item").querySelector("h4").textContent
      alert(`You have joined ${groupName}. In a real app, this would add you to the group.`)
      this.closest(".invitation-item").remove()

      // Update invitation count
      updateInvitationCount()
    })
  })

  declineInviteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const groupName = this.closest(".invitation-item").querySelector("h4").textContent
      alert(`You have declined the invitation to ${groupName}. In a real app, this would remove the invitation.`)
      this.closest(".invitation-item").remove()

      // Update invitation count
      updateInvitationCount()
    })
  })

  function updateInvitationCount() {
    const invitationItems = document.querySelectorAll(".invitation-item")
    const invitationBadge = document.querySelector(".tab-btn[data-tab='invitations'] .badge")

    if (invitationBadge) {
      invitationBadge.textContent = invitationItems.length

      if (invitationItems.length === 0) {
        invitationBadge.style.display = "none"
      }
    }
  }
})

