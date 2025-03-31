document.addEventListener("DOMContentLoaded", () => {
  // Set current date in header
  const dateDisplay = document.querySelector(".date-display")
  if (dateDisplay) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    const today = new Date()
    dateDisplay.textContent = today.toLocaleDateString("en-US", options)
  }

  // Task filters
  const filterButtons = document.querySelectorAll(".filter-btn")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      // Get filter value
      const filter = button.getAttribute("data-filter")

      // Update tasks list header
      const tasksListHeader = document.querySelector(".tasks-list-header h3")
      if (tasksListHeader) {
        let headerText = ""

        switch (filter) {
          case "all":
            headerText = "All Tasks"
            break
          case "today":
            headerText = "Today's Tasks"
            break
          case "upcoming":
            headerText = "Upcoming Tasks"
            break
          case "completed":
            headerText = "Completed Tasks"
            break
          default:
            headerText = "All Tasks"
        }

        tasksListHeader.innerHTML = `${headerText} <span class="task-count">12</span>`
      }

      // In a real app, this would filter the tasks
      console.log(`Filter tasks by: ${filter}`)
    })
  })

  // Task sidebar categories
  const sidebarItems = document.querySelectorAll(".tasks-sidebar li")

  sidebarItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault()

      // Remove active class from all items
      sidebarItems.forEach((i) => i.classList.remove("active"))

      // Add active class to clicked item
      item.classList.add("active")

      // In a real app, this would filter the tasks
      const category = item.querySelector("span:not(.task-count)").textContent
      console.log(`Filter tasks by category: ${category}`)
    })
  })

  // Task sort
  const sortSelect = document.getElementById("sort-tasks")

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      // In a real app, this would sort the tasks
      console.log(`Sort tasks by: ${sortSelect.value}`)
    })
  }

  // Task checkboxes
  const taskCheckboxes = document.querySelectorAll(".task-checkbox input")

  taskCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const taskItem = this.closest(".task-item")

      if (this.checked) {
        taskItem.classList.add("completed")
      } else {
        taskItem.classList.remove("completed")
      }

      // In a real app, this would update the task status in the database
      console.log(
        `Task "${taskItem.querySelector("h4").textContent}" marked as ${this.checked ? "completed" : "incomplete"}`,
      )
    })
  })

  // Task actions
  const taskActionButtons = document.querySelectorAll(".task-actions .btn-icon")

  taskActionButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation()

      // In a real app, this would show a dropdown menu with options like Edit, Delete, etc.
      const taskTitle = button.closest(".task-item").querySelector("h4").textContent
      alert(`Actions for task: ${taskTitle}`)
    })
  })

  // Modal functionality
  const addTaskBtn = document.getElementById("add-task-btn")
  const addTaskModal = document.getElementById("add-task-modal")
  const closeModalBtn = document.querySelector(".close-modal")
  const cancelModalBtn = document.querySelector(".cancel-modal")

  if (addTaskBtn && addTaskModal) {
    addTaskBtn.addEventListener("click", () => {
      addTaskModal.classList.add("active")
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
    addTaskModal.classList.remove("active")
    document.body.style.overflow = "" // Re-enable scrolling
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === addTaskModal) {
      closeModal()
    }
  })

  // Set default due date to today
  const dueDateInput = document.getElementById("task-due-date")
  if (dueDateInput) {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    dueDateInput.value = `${year}-${month}-${day}`
  }

  // Form submission
  const addTaskForm = document.getElementById("add-task-form")

  if (addTaskForm) {
    addTaskForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const taskTitle = document.getElementById("task-title").value
      const taskDescription = document.getElementById("task-description").value
      const taskCourse = document.getElementById("task-course").value
      const taskCategory = document.getElementById("task-category").value
      const taskDueDate = document.getElementById("task-due-date").value
      const taskEstimatedTime = document.getElementById("task-estimated-time").value
      const taskTimeUnit = document.getElementById("task-time-unit").value
      const taskPriority = document.querySelector('input[name="task-priority"]:checked').value

      // Get reminders
      const reminders = []
      document.querySelectorAll('input[name="task-reminder"]:checked').forEach((checkbox) => {
        reminders.push(checkbox.value)
      })

      // Create new task item
      const tasksList = document.querySelector(".tasks-list")

      if (tasksList) {
        // Get course color based on selected course
        let courseColor = "#6c63ff" // Default color
        switch (taskCourse) {
          case "physics":
            courseColor = "#6c63ff"
            break
          case "calculus":
            courseColor = "#ff6584"
            break
          case "psychology":
            courseColor = "#4ecdc4"
            break
          case "cs":
            courseColor = "#f59e0b"
            break
        }

        // Get course name based on selected course
        let courseName = "Physics 101" // Default name
        switch (taskCourse) {
          case "physics":
            courseName = "Physics 101"
            break
          case "calculus":
            courseName = "Calculus II"
            break
          case "psychology":
            courseName = "Psychology"
            break
          case "cs":
            courseName = "Computer Science"
            break
        }

        // Format due date
        const dueDate = new Date(taskDueDate)
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        let dueDateText = ""
        if (dueDate.toDateString() === today.toDateString()) {
          dueDateText = "Due Today"
        } else if (dueDate.toDateString() === tomorrow.toDateString()) {
          dueDateText = "Due Tomorrow"
        } else {
          const options = { month: "short", day: "numeric" }
          dueDateText = `Due ${dueDate.toLocaleDateString("en-US", options)}`
        }

        // Format estimated time
        const timeText = `${taskEstimatedTime} ${taskTimeUnit}`

        // Create new task element
        const newTaskId = `task${Date.now()}`
        const newTask = document.createElement("div")
        newTask.className = "task-item"
        newTask.innerHTML = `
          <div class="task-checkbox">
            <input type="checkbox" id="${newTaskId}">
            <label for="${newTaskId}"></label>
          </div>
          <div class="task-content">
            <div class="task-title-row">
              <h4>${taskTitle}</h4>
              <span class="task-priority ${taskPriority}">${taskPriority.charAt(0).toUpperCase() + taskPriority.slice(1)}</span>
            </div>
            <p class="task-description">${taskDescription}</p>
            <div class="task-meta">
              <div class="task-course">
                <span class="course-dot" style="background-color: ${courseColor};"></span>
                <span>${courseName}</span>
              </div>
              <div class="task-due-date">
                <i class="far fa-calendar-alt"></i>
                <span>${dueDateText}</span>
              </div>
              <div class="task-time">
                <i class="far fa-clock"></i>
                <span>${timeText}</span>
              </div>
            </div>
          </div>
          <div class="task-actions">
            <button class="btn-icon"><i class="fas fa-ellipsis-v"></i></button>
          </div>
        `

        // Add new task to the list
        tasksList.prepend(newTask)

        // Add event listener to checkbox
        const newCheckbox = newTask.querySelector(`#${newTaskId}`)
        newCheckbox.addEventListener("change", function () {
          if (this.checked) {
            newTask.classList.add("completed")
          } else {
            newTask.classList.remove("completed")
          }
        })

        // Add event listener to action button
        const newActionButton = newTask.querySelector(".task-actions .btn-icon")
        newActionButton.addEventListener("click", (e) => {
          e.stopPropagation()
          alert(`Actions for task: ${taskTitle}`)
        })

        // Close modal and reset form
        closeModal()
        addTaskForm.reset()

        // Reset due date to today
        if (dueDateInput) {
          const today = new Date()
          const year = today.getFullYear()
          const month = String(today.getMonth() + 1).padStart(2, "0")
          const day = String(today.getDate()).padStart(2, "0")
          dueDateInput.value = `${year}-${month}-${day}`
        }

        // Show success message
        alert("Task added successfully!")
      }
    })
  }
})

