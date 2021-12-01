// Variables
const highlightClass = "card-highlight";
const muscleGroupSelect = document.getElementById("muscle-group-1-select");
const muscleGroup2Select = document.getElementById("muscle-group-2-select");
const searchForm = document.getElementById("search-form");
const muscleGroupApiUrl =
  "https://git-fit-api.herokuapp.com/muscle_groups.json";
const weeklyScheduleDiv = document.getElementById("weekly-schedule");
const recordsReturnedByApi = 5; // change this to set the amount of records returning from API

// Functions

/**
 * This is called on page load to fetch the muscle groups from the API and to reset / load
 */
function initPage() {
  reset();
  // Hook local storage load HERE

  fetch(muscleGroupApiUrl)
    .then((response) => response.json())
    .then((responseData) => {
      for (let i = 0; i < responseData.length; i += 1) {
        const data = responseData[i];
        if (data) {
          createSelectElement(data.name, data.id);
        }
      }
    })
    // outputs error if unable to search
    .catch((error) => {
      throw new Error("Failed to fetch muscle groups from api", error);
    });
}

/**
 * This is called to remove the class highlight from any cards
 */
function reset() {
  weeklyScheduleDiv.style.display = "none";
  let elements = document.getElementsByClassName(highlightClass);
  while (elements.length > 0) {
    elements[0].classList.remove(highlightClass);
  }
}

/**
 * These dynamically create the select elements in the dropdowns
 */
function createSelectElement(name, id) {
  let option = document.createElement("option");
  option.value = id;
  option.text = name;
  // clone after mutation
  let option2 = option.cloneNode(true);
  // assign to both selects
  muscleGroupSelect.appendChild(option);
  muscleGroup2Select.appendChild(option2);
}

/**
 * This is called when the form is submited for search
 * It will fetch the IDs from the select elements and grab the associated workouts
 * If you wish to add / remove talk to Robbie Boi
 */
function loadExercisesBasedOnMuscleGroupId(event) {
  event.preventDefault();
  reset();

  let dayOfWeek = moment().format("dddd").toLowerCase();

  let muscleGroup1Id =
    muscleGroupSelect.options[muscleGroupSelect.selectedIndex].value;
  let muscleGroup2Id =
    muscleGroup2Select.options[muscleGroup2Select.selectedIndex].value;

  let exercisesMuscleGroup1Api = `https://git-fit-api.herokuapp.com/muscle_groups/${muscleGroup1Id}/exercises.json?limit=${recordsReturnedByApi}`;
  let exercisesMuscleGroup2Api = `https://git-fit-api.herokuapp.com/muscle_groups/${muscleGroup2Id}/exercises.json?limit=${recordsReturnedByApi}`;

  fetch(exercisesMuscleGroup1Api)
    .then((response) => response.json())
    .then((responseData) => {
      let dayText = document.getElementById(`${dayOfWeek}-muscle-group-1`);
      renderDayCardPartial(responseData, dayText);
      return fetch(exercisesMuscleGroup2Api);
    })
    .then((response) => response.json())
    .then((responseData) => {
      let dayText = document.getElementById(`${dayOfWeek}-muscle-group-2`);
      renderDayCardPartial(responseData, dayText);
      return null;
    })
    .then(() => {
      // Unhide the container
      weeklyScheduleDiv.style.display = "block";
    })
    // outputs error if unable to search
    .catch((error) => {
      throw new Error(
        "Failed to fetch exercises for muscle group " + id,
        error
      );
    });
  const dayCard = document.getElementById(`${dayOfWeek}-card`);
  if (dayCard) {
    dayCard.classList.add(highlightClass);
  }
}

/**
 * this will render part of the day of the week card assoicated
 * with teh dayText object
 */
function renderDayCardPartial(responseData, dayText) {
  if (dayText) {
    dayText.innerHTML = "";
    for (let i = 0; i < responseData.length; i += 1) {
      let data = responseData[i];
      if (data) {
        createLiElements(dayText, data);
      }
    }
  }
}
/**
 * Create the LI elements inside the UL for day of the week
 */
function createLiElements(parentDiv, data) {
  const routine = data.routine;
  const li = document.createElement("li");
  li.innerHTML = routine;
  parentDiv.appendChild(li);
}

// Event Listeners
searchForm.addEventListener("submit", loadExercisesBasedOnMuscleGroupId);
initPage(); // Essentially this is document.load
