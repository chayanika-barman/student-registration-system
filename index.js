// Get references to DOM elements
const studentForm = document.getElementById('studentForm');
const tableBody = document.getElementById("studentList");

// Declare studentArray in global scope
let studentArray = [];

// Event listener for form submission
studentForm.addEventListener("submit", function(event){
    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const id = document.getElementById("studentID").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;

    // Create new student object
    const newStudentObject = {
        studentName: name,
        studentID: id,
        studentEmail: email,
        studentContact: contact
    };

    // Add new student to studentArray
    studentArray.push(newStudentObject);

    // Update localStorage
    localStorage.setItem("studentDetails", JSON.stringify(studentArray));

    // Display updated student records
    displayStudents();

    // Reset the form
    studentForm.reset();
});

// Event listener for window load to display existing students
window.addEventListener("load", function(){
    const existingStudentDetails = localStorage.getItem("studentDetails");
    studentArray = existingStudentDetails ? JSON.parse(existingStudentDetails) : [];
    displayStudents();
});

// Function to display students in the table
function displayStudents() {
    // Clear the table body
    tableBody.innerHTML = ""; 

    studentArray.forEach(student => {
        // Create a table row
        const tableRow = document.createElement("tr");
        tableRow.className = "border-b hover:bg-gray-50";

        // Create and append table cells
        const tableName = document.createElement("td");
        tableName.className = "px-4 py-2 whitespace-nowrap text-sm text-gray-700";
        tableName.innerHTML = student.studentName;

        const tableId = document.createElement("td");
        tableId.className = "px-4 py-2 whitespace-nowrap text-sm text-gray-700";
        tableId.innerHTML = student.studentID;

        const tableEmail = document.createElement("td");
        tableEmail.className = "px-4 py-2 whitespace-nowrap text-sm text-gray-700";
        tableEmail.innerHTML = student.studentEmail;

        const tableContact = document.createElement("td");
        tableContact.className = "px-4 py-2 whitespace-nowrap text-sm text-gray-700";
        tableContact.innerHTML = student.studentContact;

        // Action cell for buttons
        const actionCell = document.createElement("td");
        actionCell.className = "px-4 py-2 whitespace-nowrap text-sm font-medium flex space-x-2";

        // Edit button
        const editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.className = "bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded";
        editButton.addEventListener("click", function(){
            // Populate form with student data
            document.getElementById("name").value = student.studentName;
            document.getElementById("studentID").value = student.studentID;
            document.getElementById("email").value = student.studentEmail;
            document.getElementById("contact").value = student.studentContact;

            // Remove the student from the array
            studentArray = studentArray.filter(element => element.studentID !== student.studentID);

            // Update localStorage
            localStorage.setItem("studentDetails", JSON.stringify(studentArray));

            // Refresh the table
            displayStudents();
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.className = "bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded";
        deleteButton.addEventListener("click", function(){
            // Remove the student from the array
            studentArray = studentArray.filter(element => element.studentID !== student.studentID);

            // Update localStorage
            localStorage.setItem("studentDetails", JSON.stringify(studentArray));

            // Refresh the table
            displayStudents();
        });

        // Append buttons to action cell
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        // Append cells to the row
        tableRow.appendChild(tableName);
        tableRow.appendChild(tableId);
        tableRow.appendChild(tableEmail);
        tableRow.appendChild(tableContact);
        tableRow.appendChild(actionCell);

        // Append row to the table body
        tableBody.appendChild(tableRow);
    });
}

// Input validation for Contact and Student ID fields
document.getElementById("contact").addEventListener("input", function (event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
});
document.getElementById("studentID").addEventListener("input", function (event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
});
document.getElementById("name").addEventListener("input", function (event) {
    event.target.value = event.target.value.replace(/[^a-zA-Z\s]/g, '');
});
