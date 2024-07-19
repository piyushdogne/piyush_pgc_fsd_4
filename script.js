document.addEventListener("DOMContentLoaded", () => {
    displayStudents();
});

function addStudent() {
    const studentName = document.getElementById("studentName").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const emailId = document.getElementById("emailId").value.trim();
    const contactNo = document.getElementById("contactNo").value.trim();

    if (!studentName || !studentId || !emailId || !contactNo) {
        alert("Please fill out all fields.");
        return;
    }

    if (!/^[a-zA-Z ]+$/.test(studentName)) {
        alert("Student name should contain only alphabets and spaces.");
        return;
    }

    if (!/^[0-9]+$/.test(studentId)) {
        alert("Student ID should contain only numbers (positive).");
        return;
    }

    if (!/^[0-9]{10}$/.test(contactNo)) {
        alert("Contact number should contain exactly 10 digits.");
        return;
    }

    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(emailId)) {
        alert("Please enter a valid email address.");
        return;
    }

    const student = {
        studentName,
        studentId,
        emailId,
        contactNo
    };

    let students = localStorage.getItem("students");
    students = students ? JSON.parse(students) : [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
    document.getElementById("registrationForm").reset();
}

function displayStudents() {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const tbody = document.querySelector("#studentTable tbody");
    tbody.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.studentName}</td>
            <td>${student.studentId}</td>
            <td>${student.emailId}</td>
            <td>${student.contactNo}</td>
            <td class="actions">
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

function editStudent(index) {
    const students = JSON.parse(localStorage.getItem("students"));
    const student = students[index];

    document.getElementById("studentName").value = student.studentName;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("emailId").value = student.emailId;
    document.getElementById("contactNo").value = student.contactNo;

    deleteStudent(index);
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students"));
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}
