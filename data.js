function saveData(data) {
    fetch('https://your-server.com/save-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Use saveData function in your main script
jsPsych.init({
    timeline: timeline,
    on_finish: function() {
        let data = jsPsych.data.get().json();
        saveData(data);
        jsPsych.data.displayData();
    }
});
