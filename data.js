function saveData(data) {
    fetch('http://localhost:3000/save-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            console.log('Data saved successfully');
        } else {
            console.error('Error:', response.statusText);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Define your timeline and subjectID somewhere in your script
let subjectID = prompt("Subject ID (###x): ");
let timeline = []; // Populate your timeline with jsPsych trials

// Use saveData function in your main script
jsPsych.init({
    timeline: timeline,
    on_finish: function() {
        let data = jsPsych.data.get().json();
        saveData({ subjectID: subjectID, trial: data });
        jsPsych.data.displayData();
    }
});


