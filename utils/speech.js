let recognition;

function initializeRecogEngine() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Your browser doesn't support the Web Speech API. Try using Google Chrome.");
  } else {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log('Speech recognition started');
    };

    recognition.onspeechend = () => {
      recognition.stop();
      console.log('Speech recognition ended');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Transcript:', transcript);
      //userResponse.innerText = `Learner: ${transcript}`;
      checkResponse(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
    };
  }
}

const dialogues = [
	  ["Seller", "नमस्ते" ],
      ["You", "नमस्ते"],
      ["Seller", "Haan Boliye"],
      ["You", "क्या यह बस आगरा जाती है"],
      ["Seller", "हाँ, यह बस आगरा जाती है"],
      ["You", "टिकट कितने का है"],
      ["Seller", "एक टिकट का किराया तीन सौ रुपये है"],
      ["You", "मुझे एक टिकट चाहिए"],
      ["Seller", "Ye raha aapka ticket"],
      ["You", "धन्यवाद"],
      ["Seller", "आपका स्वागत है"],
      ["You", "बस कितने बजे आएगी"],
      ["Seller", "बस पाँच बजे आएगी"],
      ["You", "मुझे कहाँ इंतजार करना चाहिए"],
      ["Seller", "आप प्लेटफार्म नंबर दो पर इंतजार कर सकते हैं"],
      ["You", "ठीक है, धन्यवाद"],
];

let currentDialogueIndex = 0;

const dialogueList = document.getElementById('dialogue-list');
const userResponse = document.createElement('div');
userResponse.className = 'user-response';
dialogueList.appendChild(userResponse);
const feedback = document.createElement('div');
feedback.className = 'feedback';
dialogueList.appendChild(feedback);
const startBtn = document.getElementById('start-btn');
const continueBtn = document.getElementById('continue-btn');

function disableButton(buttonId) {
  const button = document.getElementById(buttonId);
  button.disabled = true;
  button.style.backgroundColor = '#ccc'; // Grey out the button
  button.style.cursor = 'not-allowed'; // Change the cursor to indicate the button is disabled
}

function enableButton(buttonId) {
  const button = document.getElementById(buttonId);
  button.disabled = false;
  button.style.backgroundColor = ''; // Reset to default background color
  button.style.cursor = 'pointer'; // Reset cursor to pointer
}

function scrollToBottom() {
  console.log('In scrollToBottom()');
  const dialogueList = document.getElementById('dialogue-container');
  dialogueList.scrollTop = dialogueList.scrollHeight;
}

function displayDialogue() {
  const [speaker, dialogue, audioSrc] = dialogues[currentDialogueIndex];
  const dialogueDiv = document.createElement('div');
  dialogueDiv.className = 'dialogue';
  dialogueDiv.id = `dialogue-${currentDialogueIndex}`;
  dialogueDiv.innerText = `${speaker}: ${dialogue}`;

  // Create audio element
  const audio = document.createElement('audio');
  const src = "audios/" + audioSrc;
  console.log('src:' + src);
  const nextIndex = currentDialogueIndex+1;
  audio.src = `audios/audio` + nextIndex + '.mp3';
  
  audio.id = `audio${currentDialogueIndex}`;
  
  // Create play icon
  const playIcon = document.createElement('span');
  playIcon.className = 'play-icon';
  playIcon.innerHTML = '        ▶';
  playIcon.onclick = () => {
    audio.play();
  };

  dialogueDiv.appendChild(playIcon);
  dialogueDiv.appendChild(audio);
  dialogueList.appendChild(dialogueDiv);

  // Play the audio as soon as the dialogue is displayed
  audio.play();

  if (speaker === "You") {
    startBtn.style.display = 'block';
	disableButton('continue-btn');
	enableButton('start-btn');
	
  } else {
    startBtn.style.display = 'none';
    //continueBtn.style.display = 'block';
	disableButton('start-btn');
	enableButton('continue-btn');
  }

  // Scroll to the bottom after adding a new dialogue
  scrollToBottom();
}

/*
function displayDialogue() {
  const [speaker, dialogue] = dialogues[currentDialogueIndex];
  const dialogueDiv = document.createElement('div');
  dialogueDiv.className = 'dialogue';
  dialogueDiv.id = `dialogue-${currentDialogueIndex}`;
  dialogueDiv.innerText = `${speaker}: ${dialogue}`;
  dialogueList.insertBefore(dialogueDiv, userResponse);
  scrollToBottom();
  
  if (speaker === "You") {
    //startBtn.style.display = 'block';
    //continueBtn.style.display = 'none';
	startBtn.style.display = 'block';
	disableButton('continue-btn');
	enableButton('start-btn');
  } else {
    startBtn.style.display = 'none';
    //continueBtn.style.display = 'block';
	disableButton('start-btn');
	enableButton('continue-btn');
  }
}

*/

function checkResponse(transcript) {
  const expectedResponse = dialogues[currentDialogueIndex][1];
  console.log('expectedResponse:' + expectedResponse);
  //if (transcript.trim() === expectedResponse) {
	if(true){
	 disableButton('start-btn');
     enableButton('continue-btn');
  } else {
    feedback.innerText = 'Try again.';
  }
}

startBtn.addEventListener('click', () => {
  console.log('clicked on start-btn');
  if (recognition) {
    recognition.start();
  } else {
    console.error('Speech recognition is not initialized.');
  }
});

continueBtn.addEventListener('click', () => {
  currentDialogueIndex += 1;
  if (currentDialogueIndex < dialogues.length) {
    displayDialogue();
  } else {
    const completedMsg = document.createElement('div');
    completedMsg.className = 'dialogue';
    completedMsg.innerText = 'Dialogue completed!';
    dialogueList.insertBefore(completedMsg, userResponse);
    startBtn.style.display = 'none';
    continueBtn.style.display = 'none';
  }
});

// Initialize the speech recognition engine
initializeRecogEngine();

// Display the initial dialogue
displayDialogue();
