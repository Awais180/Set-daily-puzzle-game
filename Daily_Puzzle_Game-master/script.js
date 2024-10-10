let setsComplete = document.querySelector(".set_1");
let holder = document.getElementById("images_holder");
let matchedSetsBody = document.getElementById("matched_sets");

let solutions = [
  [9, 10, 77],
  [9, 37, 58],
  [74, 10, 58],
  [10, 53, 67],
  [37, 72, 74],
  [77, 72, 58],
];

let count = 0;
const maxSelection = 3;
let selectIds = [];

const handleClick = (event) => {
  let id = parseInt(event.target.id);

  if (event.target.style.border !== "1px solid blue") {
    if (count < maxSelection) {
      count++;
      event.target.style =
        "border: 1px solid blue; box-shadow: rgba(4, 0, 255, 0.979) 0px 2px 15px;";
      selectIds.push(id);
    }
  } else {
    count--;
    event.target.style.border = "none";
    event.target.style.boxShadow = "none";
    selectIds = selectIds.filter((selectedId) => selectedId !== id);
  }

  if (count === maxSelection) {
    checkMatch();
  }
};

const checkMatch = () => {
  let matchFound = solutions.some((solution) => 
    solution.slice().sort().every((id, index) => selectIds.slice().sort()[index] === id)
  );

  let findIndex = solutions.findIndex((solution) => 
    solution.slice().sort().every((id, index) => selectIds.slice().sort()[index] === id)
  );

  if (solutions.length === 0) {
    alert("All sets found!");
    resetSelection();
    return;
  }

  if (matchFound && findIndex >= 0) {
    setTimeout(() => {
      alert("Set found!");
      addMatchedSetToTable(selectIds);
      resetSelection();
    }, 100);
    solutions.splice(findIndex, 1);
  } else {
    setTimeout(() => {
      alert("Set Not found!");
      resetSelection();
    }, 100);
  }
};

const addMatchedSetToTable = (matchedSet) => {
  // Create a section to hold the matched set and text
  let row = document.createElement("section");
  row.classList.add("create_div_main");

  // Check if the text "Matched Set Found!" already exists
  let existingMessage = document.getElementById("matchMessage");
  
  if (!existingMessage) {
    // Add a message once if it doesn't exist yet
    let message = document.createElement("p");
    message.textContent = "Matched Set Found!";
    // message.style.fontSize = "18px";
    // message.style.color = "green";
    // message.style.fontWeight = "bold";
    message.id = "matchMessage"; // Give it an ID for future reference
    matchedSetsBody.appendChild(message);
  }

  // Add the matched images below the text
  matchedSet.forEach((id) => {
    let cell = document.createElement("div");
    cell.classList.add("images_flex-item");
    let img = document.getElementById(id).cloneNode();
    img.style.border = "none";
    img.style.boxShadow = "none";
    cell.appendChild(img);
    row.appendChild(cell);
  });

  // Append the matched set images to the matchedSetsBody
  matchedSetsBody.appendChild(row);
};



const resetSelection = () => {
  count = 0;
  selectIds = [];
  [...holder.getElementsByTagName("img")].forEach((img) => {
    img.style.border = "none";
    img.style.boxShadow = "none";
  });
};

holder.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") {
    handleClick(event);
  }
});
