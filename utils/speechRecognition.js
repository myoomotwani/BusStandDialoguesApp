const recognition = new window.webkitSpeechRecognition();
recognition.lang = 'hi-IN'; // Set the language to Hindi

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

recognition.onresult = function(event) {
    const speechResult = event.results[0][0].transcript;
    console.log('Result: ', speechResult); 
    // Compare with expected dialogue and proceed
};

function startRecognition() {
    recognition.start();
}
