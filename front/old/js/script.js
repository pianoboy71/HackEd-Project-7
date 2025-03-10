function toggleForm() {
    const formTitle = document.getElementById("form-title");
    const nameField = document.getElementById("name-field");
    const toggleText = document.getElementById("toggle-form");
    
    if (nameField.style.display === "none") {
        nameField.style.display = "block";
        formTitle.textContent = "Sign Up";
        toggleText.innerHTML = "Already have an account? <a href='#' onclick='toggleForm()'>Login</a>";
    } else {
        nameField.style.display = "none";
        formTitle.textContent = "Login";
        toggleText.innerHTML = "Don't have an account? <a href='#' onclick='toggleForm()'>Sign Up</a>";
    }
}

function processInfo() {
    const page_type = document.getElementById("form-title");
    if (page_type.textContent === "Sign Up") {
        // code to add data to db, and initialise values for new user
    } else {
        // code to fetch data from db and display on page
    }
}