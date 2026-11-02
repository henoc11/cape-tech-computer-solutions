/* =========================================
   CAPE TECH COMPUTER SOLUTIONS
   PART 3: NAVIGATION AND FORM VALIDATION
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       1. RESPONSIVE BURGER MENU
       ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navList = document.querySelector(".nav-list");

    if (menuToggle && navList) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navList.classList.toggle("is-open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

        });

        // Close the menu after a navigation link is clicked.
        navList.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navList.classList.remove("is-open");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    /* =========================================
       2. SHARED FORM VALIDATION
       Supports enquiry.html and contact.html
       ========================================= */

    function setupFormValidation(config) {

        const form = document.querySelector(config.formSelector);

        // Skip validation if this page does not contain the form.
        if (!form) {
            return;
        }

        const fields = config.fields.map(function (item) {

            return {
                input: form.querySelector(item.selector),
                errorId: item.errorId,
                type: item.type,
                label: item.label
            };

        }).filter(function (item) {

            return item.input !== null;

        });

        const status = form.querySelector(config.statusSelector);


        // Display an error message for a specific field.
        function showError(field, errorId, message) {

            const errorElement = form.querySelector("#" + errorId);

            if (errorElement) {
                errorElement.textContent = message;
            }

            field.setAttribute("aria-invalid", "true");

        }


        // Clear the error message for a specific field.
        function clearError(field, errorId) {

            const errorElement = form.querySelector("#" + errorId);

            if (errorElement) {
                errorElement.textContent = "";
            }

            field.removeAttribute("aria-invalid");

        }


        // Validate one field at a time.
        function validateField(item) {

            const field = item.input;
            const value = field.value.trim();


            // Check that the field is not empty.
            if (value === "") {

                showError(
                    field,
                    item.errorId,
                    "Please enter your " + item.label + "."
                );

                return false;

            }


            // Validate email address format.
            if (item.type === "email") {

                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(value)) {

                    showError(
                        field,
                        item.errorId,
                        "Please enter a valid email address."
                    );

                    return false;

                }

            }


            // Validate a 10-digit South African phone number.
            if (item.type === "phone") {

                const phonePattern = /^0\d{9}$/;

                if (!phonePattern.test(value)) {

                    showError(
                        field,
                        item.errorId,
                        "Enter a valid 10-digit South African number, e.g. 0821234567."
                    );

                    return false;

                }

            }


            // Clear errors when the field is valid.
            clearError(field, item.errorId);

            return true;

        }


        // Validate all fields when the form is submitted.
        form.addEventListener("submit", function (event) {

            // This form performs browser-side validation only.
            event.preventDefault();

            let isValid = true;

            fields.forEach(function (item) {

                if (!validateField(item)) {
                    isValid = false;
                }

            });


            // Display the overall validation result.
            if (status) {

                status.textContent = isValid
                    ? config.successMessage
                    : "Please correct the errors above.";

            }


            // Focus the first invalid field.
            if (!isValid) {

                const firstInvalid = form.querySelector(
                    '[aria-invalid="true"]'
                );

                if (firstInvalid) {
                    firstInvalid.focus();
                }

            }

        });


        // Clear errors as the user corrects their input.
        fields.forEach(function (item) {

            ["input", "change"].forEach(function (eventName) {

                item.input.addEventListener(eventName, function () {

                    clearError(item.input, item.errorId);

                    if (status) {
                        status.textContent = "";
                    }

                });

            });

        });

    }


    /* =========================================
       3. ENQUIRY FORM
       enquiry.html
       ========================================= */

    setupFormValidation({

        formSelector: "#enquiry-form",

        statusSelector: "#form-status",

        successMessage:
            "Your form has been validated successfully. It has not been sent.",

        fields: [

            {
                selector: "#name",
                errorId: "name-error",
                type: "text",
                label: "full name"
            },

            {
                selector: "#email",
                errorId: "email-error",
                type: "email",
                label: "email address"
            },

            {
                selector: "#phone",
                errorId: "phone-error",
                type: "phone",
                label: "phone number"
            },

            {
                selector: "#service",
                errorId: "service-error",
                type: "text",
                label: "a service"
            },

            {
                selector: "#message",
                errorId: "message-error",
                type: "text",
                label: "message"
            }

        ]

    });


    /* =========================================
       4. CONTACT FORM
       contact.html
       ========================================= */

    setupFormValidation({

        formSelector: "#contact-form",

        statusSelector: "#contact-form-status",

        successMessage:
            "Your message has been validated successfully. It has not been sent.",

        fields: [

            {
                selector: "#contact-name",
                errorId: "contact-name-error",
                type: "text",
                label: "full name"
            },

            {
                selector: "#contact-email",
                errorId: "contact-email-error",
                type: "email",
                label: "email address"
            },

            {
                selector: "#contact-phone",
                errorId: "contact-phone-error",
                type: "phone",
                label: "phone number"
            },

            {
                selector: "#contact-message",
                errorId: "contact-message-error",
                type: "text",
                label: "message"
            }

        ]

    });

});