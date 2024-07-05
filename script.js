// Initialize the experiment
let subjectID = prompt("Subject ID (###x): ");
let startingTrial = 1;
let progress = 0; // Example, handle loading progress from local storage or server if needed

// Define stimuli
let banditImages = {
    'banditA': 'stimuli/banditA_up.png',
    'banditB': 'stimuli/banditB_up.png'
    // Add other bandits here
};

// Instructions
let instructions = {
    type: 'html-keyboard-response',
    stimulus: `<p>Instructions here...</p><p>Press space to continue.</p>`,
    choices: [' ']
};

// Define a trial
let trial = {
    type: 'image-keyboard-response',
    stimulus: banditImages['banditA'],
    choices: ['leftarrow', 'rightarrow'],
    on_finish: function(data){
        jsPsych.data.write({
            subject: subjectID,
            trial: data
        });
    }
};

// Define the timeline
let timeline = [];
timeline.push(instructions);
timeline.push(trial);

// Save data function
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

// Run the experiment
jsPsych.init({
    timeline: timeline,
    on_finish: function() {
        let data = jsPsych.data.get().json();
        saveData({ subjectID: subjectID, trial: data });
        jsPsych.data.displayData();
    }
});

