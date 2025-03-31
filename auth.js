document.addEventListener("DOMContentLoaded", () => {
  // Password strength meter
  const passwordInput = document.getElementById("password")
  const strengthBar = document.querySelector(".strength-bar")
  const strengthText = document.querySelector(".strength-text")

  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      const password = this.value
      let strength = 0
      let message = ""

      if (password.length >= 8) {
        strength += 25
      }

      if (password.match(/[A-Z]/)) {
        strength += 25
      }

      if (password.match(/[0-9]/)) {
        strength += 25
      }

      if (password.match(/[^A-Za-z0-9]/)) {
        strength += 25
      }

      strengthBar.style.width = strength + "%"

      if (strength <= 25) {
        strengthBar.style.backgroundColor = "#ef4444"
        message = "Weak"
      } else if (strength <= 50) {
        strengthBar.style.backgroundColor = "#f59e0b"
        message = "Fair"
      } else if (strength <= 75) {
        strengthBar.style.backgroundColor = "#3b82f6"
        message = "Good"
      } else {
        strengthBar.style.backgroundColor = "#22c55e"
        message = "Strong"
      }

      strengthText.textContent = message || "Password strength"
    })
  }

  // Form submission
  const loginForm = document.getElementById("login-form")
  const signupForm = document.getElementById("signup-form")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simulate login
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      console.log("Login attempt:", { email, password })

      // Redirect to dashboard (in a real app, this would happen after server validation)
      window.location.href = "dashboard.html"
    })
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Validate password match
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirm-password").value

      if (password !== confirmPassword) {
        alert("Passwords do not match!")
        return
      }

      // Simulate signup
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value

      console.log("Signup attempt:", { name, email, password })

      // Redirect to dashboard (in a real app, this would happen after server validation)
      window.location.href = "dashboard.html"
    })
  }

  // Social login buttons
  const socialButtons = document.querySelectorAll(".social-btn")

  socialButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const provider = this.classList.contains("google") ? "Google" : "Facebook"
      console.log(`Login with ${provider}`)

      // In a real app, this would trigger OAuth flow
      setTimeout(() => {
        window.location.href = "dashboard.html"
      }, 1000)
    })
  })
})

