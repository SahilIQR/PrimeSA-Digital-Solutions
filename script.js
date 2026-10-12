(function () {
  "use strict";

  const config = window.PRIMESA_CONFIG;

  if (!config) {
    console.error("PrimeSA configuration could not be loaded. Check config.js.");
    return;
  }

  document.querySelectorAll("[data-business-name]").forEach(function (element) {
    element.textContent = config.businessName;
  });

  document.querySelectorAll("[data-founder-name]").forEach(function (element) {
    element.textContent = config.founder;
  });

  document.querySelectorAll("[data-whatsapp-display]").forEach(function (element) {
    element.textContent = config.whatsappDisplayNumber;
  });

  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-price]").forEach(function (element) {
    const price = config.prices[element.dataset.price];

    if (!price) {
      console.error("No configured price found for:", element.dataset.price);
      return;
    }

    const formattedAmount = new Intl.NumberFormat("en-ZA", {
      maximumFractionDigits: 0,
      useGrouping: true
    }).format(price.amount);
    const cadence = price.cadence === "monthly" ? " / month" : "";

    element.textContent = config.currencySymbol + formattedAmount + cadence;
  });

  document.querySelectorAll("[data-whatsapp-link]").forEach(function (link) {
    const message = link.dataset.whatsappMessage;

    if (!message) {
      console.error("A WhatsApp link is missing its enquiry message.", link);
      return;
    }

    link.href =
      "https://wa.me/" +
      encodeURIComponent(config.whatsappNumber) +
      "?text=" +
      encodeURIComponent(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");

  if (menuToggle && navigation) {
    const closeMenu = function (returnFocus) {
      navigation.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");

      if (returnFocus) {
        menuToggle.focus();
      }
    };

    const openMenu = function () {
      navigation.hidden = false;
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close navigation menu");
    };

    menuToggle.addEventListener("click", function () {
      if (menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu(false);
      } else {
        openMenu();
      }
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 760px)").matches) {
          closeMenu(false);
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        menuToggle.getAttribute("aria-expanded") === "true"
      ) {
        closeMenu(true);
      }
    });

    window.addEventListener("resize", function () {
      if (!window.matchMedia("(max-width: 760px)").matches) {
        navigation.hidden = false;
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      } else if (menuToggle.getAttribute("aria-expanded") !== "true") {
        navigation.hidden = true;
      }
    });

    if (window.matchMedia("(max-width: 760px)").matches) {
      navigation.hidden = true;
    }
  }

  const enquiryForm = document.querySelector("#enquiry-form");
  const formStatus = document.querySelector("#form-status");

  if (enquiryForm && formStatus) {
    enquiryForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!enquiryForm.reportValidity()) {
        return;
      }

      const formData = new FormData(enquiryForm);
      const selectedService = enquiryForm.querySelector("#enquiry-project");
      const name = String(formData.get("name")).trim();
      const contact = String(formData.get("contact")).trim();
      const projectDescription = String(formData.get("message") || "").trim();
      const messageLines = [
        "Website enquiry - " + config.businessName,
        "",
        "Name: " + name,
        "Contact details: " + contact,
        "Service: " + selectedService.selectedOptions[0].textContent.trim()
      ];

      if (projectDescription) {
        messageLines.push("Project description: " + projectDescription);
      }

      const whatsappUrl =
        "https://wa.me/" +
        encodeURIComponent(config.whatsappNumber) +
        "?text=" +
        encodeURIComponent(messageLines.join("\n"));

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      formStatus.textContent =
        "If WhatsApp opens, review your message and press Send to deliver your enquiry. This website cannot confirm delivery.";
    });
  }
})();
