document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenu = document.getElementById("mobile-menu")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
      navMenu.classList.toggle("active")

      // Toggle the bars to form an X
      const bars = mobileMenu.querySelectorAll(".bar")
      if (mobileMenu.classList.contains("active")) {
        bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
        bars[1].style.opacity = "0"
        bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
      } else {
        bars[0].style.transform = "none"
        bars[1].style.opacity = "1"
        bars[2].style.transform = "none"
      }
    })
  }

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        mobileMenu.classList.remove("active")

        const bars = mobileMenu.querySelectorAll(".bar")
        bars[0].style.transform = "none"
        bars[1].style.opacity = "1"
        bars[2].style.transform = "none"
      }
    })
  })

  // Navbar background change on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.style.padding = "10px 0"
      navbar.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.padding = "15px 0"
      navbar.style.boxShadow = "none"
    }
  })

  // Feature cards hover effect
  const featureCards = document.querySelectorAll(".feature-card")
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".feature-icon i")
      icon.style.transform = "scale(1.2) rotate(5deg)"
      icon.style.transition = "all 0.3s ease"
    })

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".feature-icon i")
      icon.style.transform = "scale(1) rotate(0deg)"
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      if (this.getAttribute("href") === "#") return

      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const headerOffset = 80
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})

