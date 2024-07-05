// data.js

export function saveData(data) {
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



