"use client";
import Image from "next/image";
import React, {useEffect, useState, useRef} from "react";

const dialogues = [
    ["Seller", "नमस्ते", "/audios/audio1.mp3" ],
    ["You", "नमस्ते", "/audios/audio2.mp3"],
    ["Seller", "Haan Boliye", "/audios/audio3.mp3"],
    ["You", "क्या यह बस आगरा जाती है", "/audios/audio4.mp3"],
    ["Seller", "हाँ, यह बस आगरा जाती है", "/audios/audio5.mp3"],
    ["You", "टिकट कितने का है", "/audios/audio6.mp3"],
    ["Seller", "एक टिकट का किराया तीन सौ रुपये है", "/audios/audio7.mp3"],
    ["You", "मुझे एक टिकट चाहिए", "/audios/audio8.mp3"],
    ["Seller", "Ye raha aapka ticket", "/audios/audio9.mp3"],
    ["You", "धन्यवाद", "/audios/audio10.mp3"],
    // ["Seller", "आपका स्वागत है", "/audios/audio11.mp3"],
    // ["You", "बस कितने बजे आएगी", "../utils/audios/audio.mp3"],
    // ["Seller", "बस पाँच बजे आएगी", "../utils/audios/audio.mp3"],
    // ["You", "मुझे कहाँ इंतजार करना चाहिए", "../utils/audios/audio.mp3"],
    // ["Seller", "आप प्लेटफार्म नंबर दो पर इंतजार कर सकते हैं", "../utils/audios/audio.mp3"],
    // ["You", "ठीक है, धन्यवाद", "../utils/audios/audio.mp3"],
];

export default function Home() {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(1);
    const [userSpeech, setUserSpeech] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const lastSellerRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      // This ensures the code runs only on the client side
      setIsClient(true);
  }, []);

    // Scroll to the last seller dialogue when the "Continue" button is pressed
    useEffect(() => {
        if (lastSellerRef.current) {
            lastSellerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentDialogueIndex]);

    const startRecognition = () => {
      if (!isClient) return;

      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'hi-IN';

      recognition.onresult = function(event) {
          const speechResult = event.results[0][0].transcript;
          setUserSpeech(speechResult);

          if (checkDialogue(speechResult, dialogues[currentDialogueIndex][1])) {
              setIsCorrect(true);
          } else {
              setIsCorrect(false);
          }
      };

      recognition.start();
  };

    // // Speech recognition setup
    // const recognition = new window.webkitSpeechRecognition();
    // recognition.lang = 'hi-IN';

    const playAudio = (audioSrc) => {
      const audio = new Audio(audioSrc);
      audio.play();
    };

    // recognition.onresult = function(event) {
    //     const speechResult = event.results[0][0].transcript;
    //     setUserSpeech(speechResult);

    //     if (checkDialogue(speechResult, dialogues[currentDialogueIndex][1])) {
    //         setIsCorrect(true);
    //     } else {
    //         setIsCorrect(false);
    //     }
    // };

    const checkDialogue = (speechResult, expectedDialogue) => {
        return speechResult.trim() === expectedDialogue.trim();
    };

    // const startRecognition = () => {
    //     recognition.start();
    // };

    const proceedToNext = () => {
      if (isCorrect && currentDialogueIndex < dialogues.length - 1) {
          // Advance to the next seller's dialogue
          setCurrentDialogueIndex(currentDialogueIndex + 2);
          setIsCorrect(false);
          setUserSpeech("");
      }
  };

  return (
    <main className="bg-white py-3 h-screen text-black overflow-x-hidden">
      <div className="w-full flex flex-col space-y-3 items-center justify-center">
        <span className="text-[#036A8C] font-extrabold text-2xl">Hindi Harmony</span>
        <div className="bg-[url('/busStandImage.jpeg')] h-72 w-screen bg-center bg-cover bg-no-repeat bg-fixed"></div>
        <div className="w-[90%] sm:w-[70%] flex flex-col items-center justify-center shadow-[#00000017] shadow-lg drop-shadow-lg rounded-lg">
          <div className="bg-[#036A8C] text-white text-xs sm:text-base rounded-t-lg p-3 w-full z-10">
            Hindi Learning App - Bus Stand Dialogue
          </div>
          <div className="flex items-center justify-end w-full flex-col space-y-3 rounded-2xl p-3 overflow-y-scroll max-h-52">
                {dialogues.slice(0, currentDialogueIndex + 1).map((dialogue, index) => (
                    <div 
                        key={index} 
                        className={`w-full flex items-center justify-${dialogue[0] === "Seller" ? "end" : "end"}`}
                        ref={dialogue[0] === "Seller" && index === currentDialogueIndex ? lastSellerRef : null}
                    >
                        <div className={`flex w-full items-center justify-${dialogue[0] === "Seller" ? "start" : "end"} space-x-2`}>
                            <Image 
                                src={dialogue[0] === "Seller" ? "/man1.png" : "/man2.png"} 
                                alt="person" 
                                width={30} 
                                height={20} 
                                unoptimized 
                                className="w-7 sm:w-9" 
                            />
                            <div className="flex items-center justify-center space-x-2 rounded-lg p-1 sm:px-3 bg-[#EFEFEF]">
                              <button onClick={() => {
                                playAudio(dialogue[2])
                              }}>
                                <Image 
                                    src="/speakButton.png" 
                                    alt="speak" 
                                    width={15} 
                                    height={10} 
                                    className="w-3 sm:w-4" 
                                />
                              </button>
                                <span className="text-xs sm:text-sm">{dialogue[1]}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {currentDialogueIndex < 11 && dialogues[currentDialogueIndex][0] === "You" && (
                <div className="user-input">
                    <button onClick={startRecognition} className="border border-black rounded-xl p-3">🎤 Speak</button>
                    <p>Detected Speech: {userSpeech}</p>
                    {isCorrect ? <p>✅ Correct</p> : <p>❌ Try Again</p>}
                </div>
            )}

          <div className="border-t border-[#D9D9D9] w-full flex items-center justify-center z-10 py-2">
          {dialogues[currentDialogueIndex][0] === "You" && isCorrect && (
            <button onClick={proceedToNext} className="bg-[#036A8C] p-3 text-white flex items-center justify-center space-x-2 rounded-3xl">
              <Image src={"/continue.png"} alt="continue" width={20} height={20} />
              <span>Continue</span>
            </button>)}
          </div>
        </div>
      </div>
    </main>
  );
}
