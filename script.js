/* Main JavaScript for Avondale Primary School */

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Admissions Form Validation
    const admissionsForm = document.getElementById('admissionsForm');

    if (admissionsForm) {
        admissionsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Clear previous errors
            const inputs = admissionsForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                const group = input.closest('.form-group');
                if (group) group.classList.remove('error');
            });

            // Validation Logic
            const requiredIds = ['studentName', 'studentAge', 'grade', 'parentName', 'parentEmail'];

            requiredIds.forEach(id => {
                const input = document.getElementById(id);
                if (input) {
                    const value = input.value.trim();
                    if (!value) {
                        showError(input, 'This field is required');
                        isValid = false;
                    } else if (id === 'parentEmail' && !validateEmail(value)) {
                        showError(input, 'Please enter a valid email address');
                        isValid = false;
                    }
                }
            });

            if (isValid) {
                alert('Application submitted successfully! We will contact you shortly.');
                admissionsForm.reset();
            }
        });
    }
});

function showError(input, message) {
    const group = input.closest('.form-group');
    if (group) {
        group.classList.add('error');
        const errorDisplay = group.querySelector('.error-message');
        if (errorDisplay) {
            errorDisplay.textContent = message;
        }
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
