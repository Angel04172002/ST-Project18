document.addEventListener("DOMContentLoaded", () => {
    const gradeForm = document.getElementById("grade-form");
  
    gradeForm.addEventListener("submit", function(event) {
        event.preventDefault();
  
        const student = document.getElementById("student").value;
        const subject = document.getElementById("subject").value;
        const grade = document.getElementById("grade").value;
  
        // Изпратка на данните към сървъра за запис в базата данни
        fetch("/save-grade", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ student, subject, grade })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Оценката беше записана успешно:", data);
        })
        .catch(error => {
            console.error("Грешка при записване на оценката:", error);
        });
    });
  });