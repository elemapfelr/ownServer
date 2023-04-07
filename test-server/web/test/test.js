// Get all the checkboxes
const checkboxes = document.querySelectorAll('input[type=checkbox]');

// Save the initial state of the checkboxes
let initialStates = [];
checkboxes.forEach((checkbox) => {
	initialStates.push(checkbox.checked);
});

// Save the current state of the checkboxes
function saveCurrentStates() {
	let currentStates = [];
	checkboxes.forEach((checkbox) => {
		currentStates.push(checkbox.checked);
	});
	return currentStates;
}

// Check if there are any changes in the checkbox states
function checkChanges() {
	let currentStates = saveCurrentStates();
	let changes = false;
	for (let i = 0; i < initialStates.length; i++) {
		if (initialStates[i] !== currentStates[i]) {
			changes = true;
			break;
		}
	}
	if (changes) {
		alert('There are changes in the checkbox states!');
	} else {
		alert('There are no changes in the checkbox states.');
	}
}
// Add event listeners to the buttons
document.getElementById('saveBtn').addEventListener('click', () => {
	initialStates = saveCurrentStates();
	alert('Initial states saved!');
});

document.getElementById('checkBtn').addEventListener('click', () => {
	checkChanges();
});
