document.addEventListener("DOMContentLoaded", () => {
  // Set current date in header
  const dateDisplay = document.querySelector(".date-display")
  if (dateDisplay) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    const today = new Date()
    dateDisplay.textContent = today.toLocaleDateString("en-US", options)
  }

  // Modal functionality
  const addCourseBtn = document.getElementById("add-course-btn")
  const addCourseModal = document.getElementById("add-course-modal")
  const closeModalBtn = document.querySelector(".close-modal")
  const cancelModalBtn = document.querySelector(".cancel-modal")

  if (addCourseBtn && addCourseModal) {
    addCourseBtn.addEventListener("click", () => {
      addCourseModal.classList.add("active")
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
    addCourseModal.classList.remove("active")
    document.body.style.overflow = "" // Re-enable scrolling
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === addCourseModal) {
      closeModal()
    }
  })

  // Color selection in modal
  const colorOptions = document.querySelectorAll(".color-option")
  const courseColorInput = document.getElementById("course-color-input")

  if (colorOptions.length > 0 && courseColorInput) {
    colorOptions.forEach((option) => {
      option.addEventListener("click", () => {
        // Remove active class from all options
        colorOptions.forEach((opt) => opt.classList.remove("active"))

        // Add active class to clicked option
        option.classList.add("active")

        // Update hidden input value
        const color = option.getAttribute("data-color")
        courseColorInput.value = color
      })
    })
  }

  // File upload
  const fileInput = document.getElementById("course-syllabus")
  const fileName = document.querySelector(".file-name")

  if (fileInput && fileName) {
    fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
        fileName.textContent = fileInput.files[0].name
      } else {
        fileName.textContent = "No file chosen"
      }
    })
  }

  // Form submission
  const addCourseForm = document.getElementById("add-course-form")

  if (addCourseForm) {
    addCourseForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const courseName = document.getElementById("course-name").value
      const courseInstructor = document.getElementById("course-instructor").value
      const courseDays = document.getElementById("course-days").value
      const courseTime = document.getElementById("course-time").value
      const courseLocation = document.getElementById("course-location").value
      const courseColor = courseColorInput.value

      // Create new course card
      const coursesGrid = document.querySelector(".courses-grid")

      if (coursesGrid) {
        const newCourseCard = document.createElement("div")
        newCourseCard.className = "course-card"
        newCourseCard.innerHTML = `
          <div class="course-header" style="background-color: ${courseColor};">
            <div class="course-actions">
              <button class="btn-icon"><i class="fas fa-ellipsis-v"></i></button>
            </div>
          </div>
          <div class="course-content">
            <h4>${courseName}</h4>
            <p class="course-instructor">${courseInstructor}</p>
            <div class="course-details">
              <div class="course-detail">
                <i class="fas fa-clock"></i>
                <span>${courseDays} ${courseTime}</span>
              </div>
              <div class="course-detail">
                <i class="fas fa-map-marker-alt"></i>
                <span>${courseLocation}</span>
              </div>
            </div>
            <div class="course-progress">
              <div class="progress-label">
                <span>Progress</span>
                <span>0%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 0%;"></div>
              </div>
            </div>
          </div>
          <div class="course-footer">
            <button class="btn-text">View Syllabus</button>
            <button class="btn-text">View Tasks</button>
          </div>
        `

        // Add new course card to the grid
        coursesGrid.prepend(newCourseCard)

        // Close modal and reset form
        closeModal()
        addCourseForm.reset()
        fileName.textContent = "No file chosen"

        // Show success message
        alert("Course added successfully!")
      }
    })
  }

  // Course card actions
  const courseActionBtns = document.querySelectorAll(".course-actions .btn-icon")

  courseActionBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation()
      // In a real app, this would show a dropdown menu with options like Edit, Delete, etc.
      alert("Course actions menu would appear here")
    })
  })

  // Course footer buttons
  const viewSyllabusBtns = document.querySelectorAll(".course-footer .btn-text:first-child")
  const viewTasksBtns = document.querySelectorAll(".course-footer .btn-text:last-child")

  viewSyllabusBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // In a real app, this would navigate to the syllabus page or open a modal
      alert("View syllabus functionality would be implemented here")
    })
  })

  viewTasksBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // In a real app, this would navigate to the tasks page filtered for this course
      alert("View tasks functionality would be implemented here")
    })
  })
})

