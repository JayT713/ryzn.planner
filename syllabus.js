document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const uploadArea = document.getElementById("upload-area")
  const syllabusFile = document.getElementById("syllabus-file")
  const browseFiles = document.getElementById("browse-files")
  const nextButtons = document.querySelectorAll(".next-step")
  const prevButtons = document.querySelectorAll(".prev-step")
  const addToCalendarBtn = document.getElementById("add-to-calendar")
  const successMessage = document.getElementById("success-message")
  const addEventBtn = document.getElementById("add-event")
  const eventsList = document.getElementById("events-list")
  const setRemindersCheckbox = document.getElementById("set-reminders")
  const reminderSettings = document.getElementById("reminder-settings")

  // Step navigation
  function goToStep(stepNumber) {
    // Update steps
    document.querySelectorAll(".step").forEach((step, index) => {
      const stepNum = index + 1
      step.classList.remove("active", "completed")

      if (stepNum < stepNumber) {
        step.classList.add("completed")
      } else if (stepNum === stepNumber) {
        step.classList.add("active")
      }
    })

    // Update step content
    document.querySelectorAll(".syllabus-step-content").forEach((content, index) => {
      content.classList.remove("active")
      if (index + 1 === stepNumber) {
        content.classList.add("active")
      }
    })

    // Scroll to top
    window.scrollTo(0, 0)
  }

  // Next step buttons
  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextStep = Number.parseInt(button.getAttribute("data-next"))
      goToStep(nextStep)
    })
  })

  // Previous step buttons
  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const prevStep = Number.parseInt(button.getAttribute("data-prev"))
      goToStep(prevStep)
    })
  })

  // File upload handling
  if (uploadArea && syllabusFile && browseFiles) {
    // Click on browse files button
    browseFiles.addEventListener("click", () => {
      syllabusFile.click()
    })

    // Click on upload area
    uploadArea.addEventListener("click", (e) => {
      if (e.target !== browseFiles && !browseFiles.contains(e.target)) {
        syllabusFile.click()
      }
    })

    // File selected
    syllabusFile.addEventListener("change", () => {
      if (syllabusFile.files.length > 0) {
        const file = syllabusFile.files[0]
        handleFileUpload(file)
      }
    })

    // Drag and drop
    uploadArea.addEventListener("dragover", (e) => {
      e.preventDefault()
      uploadArea.classList.add("drag-over")
    })

    uploadArea.addEventListener("dragleave", () => {
      uploadArea.classList.remove("drag-over")
    })

    uploadArea.addEventListener("drop", (e) => {
      e.preventDefault()
      uploadArea.classList.remove("drag-over")

      if (e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0]
        handleFileUpload(file)
      }
    })

    // Handle file upload
    function handleFileUpload(file) {
      // Check file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ]

      if (!validTypes.includes(file.type)) {
        alert("Please upload a PDF, Word, or Text file.")
        return
      }

      // Update UI
      uploadArea.classList.add("has-file")
      uploadArea.querySelector(".upload-text p:first-child").textContent = file.name

      // Enable continue button
      document.querySelector(".next-step[data-next='2']").removeAttribute("disabled")

      // In a real app, you would upload the file to the server here
      console.log("File selected:", file.name)
    }
  }

  // Processing simulation
  function simulateProcessing() {
    const processSteps = document.querySelectorAll(".process-step")
    const progressText = document.querySelector(".progress-text")
    const progressFill = document.querySelector(".progress-fill")

    // Reset
    processSteps.forEach((step, index) => {
      if (index > 0) {
        step.classList.remove("active", "completed")
      }
    })

    // Step 1 is already marked as completed

    // Step 2: Analyzing document structure
    setTimeout(() => {
      processSteps[1].classList.add("active")
      progressText.textContent = "Analyzing document structure..."
    }, 1000)

    // Step 3: Extracting dates and events
    setTimeout(() => {
      processSteps[1].classList.remove("active")
      processSteps[1].classList.add("completed")
      processSteps[1].querySelector("i").className = "fas fa-check-circle"

      processSteps[2].classList.add("active")
      progressText.textContent = "Extracting dates and events..."
    }, 3000)

    // Step 4: Categorizing events
    setTimeout(() => {
      processSteps[2].classList.remove("active")
      processSteps[2].classList.add("completed")
      processSteps[2].querySelector("i").className = "fas fa-check-circle"

      processSteps[3].classList.add("active")
      progressText.textContent = "Categorizing events..."
    }, 5000)

    // Step 5: Preparing calendar entries
    setTimeout(() => {
      processSteps[3].classList.remove("active")
      processSteps[3].classList.add("completed")
      processSteps[3].querySelector("i").className = "fas fa-check-circle"

      processSteps[4].classList.add("active")
      progressText.textContent = "Preparing calendar entries..."
    }, 7000)

    // Complete
    setTimeout(() => {
      processSteps[4].classList.remove("active")
      processSteps[4].classList.add("completed")
      processSteps[4].querySelector("i").className = "fas fa-check-circle"

      progressText.textContent = "Processing complete!"

      // Enable continue button
      document.querySelector(".next-step[data-next='3']").removeAttribute("disabled")
    }, 8000)
  }

  // When going to step 2, start processing simulation
  document.querySelector(".next-step[data-next='2']").addEventListener("click", () => {
    simulateProcessing()
  })

  // Add event manually
  if (addEventBtn && eventsList) {
    addEventBtn.addEventListener("click", () => {
      const newRow = document.createElement("tr")

      const today = new Date()
      const formattedDate = today.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })

      newRow.innerHTML = `
        <td>${formattedDate}</td>
        <td>
          <input type="text" value="New Event" class="event-input">
        </td>
        <td>
          <select class="event-type">
            <option value="quiz">Quiz</option>
            <option value="exam">Exam</option>
            <option value="assignment">Assignment</option>
            <option value="project">Project</option>
            <option value="other" selected>Other</option>
          </select>
        </td>
        <td>
          <button class="btn-icon delete-event"><i class="fas fa-trash-alt"></i></button>
        </td>
      `

      eventsList.appendChild(newRow)

      // Scroll to bottom of table
      const tableContainer = document.querySelector(".events-table-container")
      tableContainer.scrollTop = tableContainer.scrollHeight

      // Add event listener to delete button
      addDeleteEventListeners()
    })
  }

  // Delete event
  function addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll(".delete-event")

    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const row = this.closest("tr")
        row.remove()
      })
    })
  }

  // Initial call to add delete event listeners
  addDeleteEventListeners()

  // Toggle reminder settings
  if (setRemindersCheckbox && reminderSettings) {
    setRemindersCheckbox.addEventListener("change", function () {
      if (this.checked) {
        reminderSettings.style.display = "block"
      } else {
        reminderSettings.style.display = "none"
      }
    })
  }

  // Add to calendar button
  if (addToCalendarBtn && successMessage) {
    addToCalendarBtn.addEventListener("click", () => {
      // Hide all step content
      document.querySelectorAll(".syllabus-step-content").forEach((content) => {
        content.style.display = "none"
      })

      // Hide steps navigation
      document.querySelector(".syllabus-steps").style.display = "none"

      // Show success message
      successMessage.classList.add("active")

      // In a real app, you would save the events to the database here
      console.log("Events added to calendar")
    })
  }

  // Reset form when clicking "Upload Another Syllabus"
  const resetLink = document.querySelector(".success-buttons .btn-secondary")
  if (resetLink) {
    resetLink.addEventListener("click", (e) => {
      e.preventDefault()

      // Reset form
      if (uploadArea) {
        uploadArea.classList.remove("has-file")
        uploadArea.querySelector(".upload-text p:first-child").textContent = "Drag and drop your syllabus file here"
      }

      // Reset steps
      document.querySelector(".syllabus-steps").style.display = "flex"

      // Go back to step 1
      goToStep(1)

      // Hide success message
      successMessage.classList.remove("active")

      // Disable continue button
      document.querySelector(".next-step[data-next='2']").setAttribute("disabled", "disabled")
    })
  }
})

