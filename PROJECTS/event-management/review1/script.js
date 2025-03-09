document.addEventListener("DOMContentLoaded", function() {
    // Search Bar Functionality
    document.getElementById("searchEvent").addEventListener("input", function() {
        let searchQuery = this.value.toLowerCase();
        let events = document.querySelectorAll(".event-card");
        
        events.forEach(event => {
            let title = event.querySelector(".card-title").innerText.toLowerCase();
            if (title.includes(searchQuery)) {
                event.parentElement.style.display = "block";
            } else {
                event.parentElement.style.display = "none";
            }
        });
    });

    // Login Button Click Event
    document.querySelectorAll(".login-btn").forEach(button => {
        button.addEventListener("click", function() {
            let userType = this.getAttribute("data-user");
            alert(Redirecting to ${userType} Login Page...);
        });
    });

    // Event Button Click Effect
    document.querySelectorAll(".event-btn").forEach(button => {
        button.addEventListener("mouseover", function() {
            this.style.backgroundColor = "#0056b3";
        });
        button.addEventListener("mouseout", function() {
            this.style.backgroundColor = "#007bff";
        });
        button.addEventListener("click", function() {
            alert("Viewing events in this category...");
        });
    });
});