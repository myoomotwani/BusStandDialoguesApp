"use client";
import Image from "next/image";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import React, {useEffect, useState, useRef} from "react";


const dialogues = [
    ["Seller", "Namaste", "/audios/audio1.mp3", "Hello"],
    ["You", "Namaste", "/audios/audio2.mp3", "Hello"],
    ["Seller", "Haan Boliye", "/audios/audio3.mp3", "Yes?"],
    ["You", "Kya yeh bus Agra jati hai?", "/audios/audio4.mp3", "Does this bus go to Agra?"],
    ["Seller", "Han, yeh bus Agra jati hai", "/audios/audio5.mp3", "Yes, this bus goes to Agra."],
    ["You", "Ticket kitne ka hai?", "/audios/audio6.mp3", "How much for the ticket?"],
    ["Seller", "Ek ticket ka kiraya 300 rupay hai", "/audios/audio7.mp3", "300rs for one ticket."],
    ["You", "Mujhe ek ticket chaiye", "/audios/audio8.mp3", "I want one ticket."],
    ["Seller", "Ye raha aapka ticket", "/audios/audio9.mp3", "Here's your ticket."],
    ["You", "Dhanyawad", "/audios/audio10.mp3", "Thanks."],
    ["Seller", "Aapka swagat hai", "/audios/audio11.mp3", "Your welcome."],
    ["You", "Bus kitne baje aayegi?", "/audios/audio12.mp3", "When will the bus arrive?"],
    ["Seller", "Bus paanch baje aayegi", "/audios/audio13.mp3", "The bus will be here at 5."],
    ["You", "Mujhe kahan intezar karna chaiye", "/audios/audio14.mp3", "Where should I wait?"],
    ["Seller", "Aap platform number 2 par intezar kar sakte hain", "/audios/audio15.mp3", "You can wait on platform number 2."],
    ["You", "Theek hai, dhanyawad", "/audios/audio16.mp3", "Okay, thanks."],
];

const checkDialogues = [
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
    ["You", "मुझे कहां इंतजार करना चाहिए"],
    ["Seller", "आप प्लेटफार्म नंबर दो पर इंतजार कर सकते हैं"],
    ["You", "ठीक है धन्यवाद"],
];

export default function Home() {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(-1);
    const [userSpeech, setUserSpeech] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const lastTextRef = useRef(null);
    const [isClient, setIsClient] = useState(false);
    const [allowContinue, setAllowContinue] = useState(false);
    const scrollableSectionRef = useRef(null);

    useEffect(() => {
      // This ensures the code runs only on the client side
      setIsClient(true);
  }, []);

    // Scroll to the last seller dialogue when the "Continue" button is pressed
    useEffect(() => {
      if (lastTextRef.current) {
          lastTextRef.current.scrollIntoView({ behavior: 'smooth' });
      }
  }, [currentDialogueIndex]);
    // const scrollToElement = () => {
    //   if (lastTextRef.current) {
    //     lastTextRef.current.scrollIntoView({ behavior: 'smooth' });
    //   }
    // };

    const startRecognition = () => {
      if (!isClient) return;
      enqueueSnackbar("Listening...", {
        variant: "info",
        hideIconVariant: true,
        autoHideDuration: 2000,
      })
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'hi-IN';

      recognition.onresult = function(event) {
          const speechResult = event.results[0][0].transcript;
          setUserSpeech(speechResult);

          if (checkDialogue(speechResult, checkDialogues[currentDialogueIndex][1])) {
              setIsCorrect(true);
              setAllowContinue(true);
              playAudio("/audios/success.mp3")
              enqueueSnackbar('Correct!', {
                autoHideDuration: 2000,
                variant: 'success',
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right'
                }
                })
          } else {
              setIsCorrect(false);
              playAudio("/audios/failure.mp3")
              enqueueSnackbar('Try again!', {
                autoHideDuration: 2000,
                variant: 'error',
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right'
                }
              })
          }
      };
      recognition.start();
      
  };


    const playAudio = (audioSrc) => {
      const audio = new Audio(audioSrc);
      audio.play();
    };

    const checkDialogue = (speechResult, expectedDialogue) => {
        return speechResult.trim() === expectedDialogue.trim();
    };

    // const startRecognition = () => {
    //     recognition.start();
    // };

    const proceedToNext = () => {
      if (currentDialogueIndex < dialogues.length - 1) {
          // Advance to the next seller's dialogue
          setCurrentDialogueIndex(currentDialogueIndex + 1);
          setIsCorrect(false);
          setUserSpeech("");
          setAllowContinue(false);
          playAudio(dialogues[currentDialogueIndex + 1][2])
          // scrollToElement();
      }
  };

  return (
    <main className="bg-white py-1 xl:py-3 h-screen text-black overflow-x-hidden">
      <SnackbarProvider dense />
      <div className="w-full flex flex-col space-y-1 lg:space-y-2 xl:space-y-3 items-center justify-center">
        <span className="text-[#036A8C] font-extrabold text-lg md:text-xl xl:text-2xl">Hindi Harmony</span>
        <div className="bg-[url('/busStandImage.jpeg')] h-56 sm:h-60 w-screen bg-bottom md:bg-center bg-cover bg-no-repeat bg-fixed"></div>
        <div className="w-[90%] sm:w-[80%] md:w-[70%] flex flex-col items-center justify-center shadow-[#00000017] shadow-lg drop-shadow-lg rounded-lg">
          <div className="bg-[#036A8C] text-white text-xs sm:text-base rounded-t-lg px-3 py-1 xl:p-3 w-full lg:text-lg z-10">
            Conversation at bus stand
          </div>
          <div className="overflow-y-scroll w-full space-y-3 rounded-2xl p-3 h-60 sm:h-52 md:h-48 xl:h-60" ref={scrollableSectionRef}>
            {currentDialogueIndex < 0 && <div className="flex flex-col space-y-2 items-center justify-center w-full h-full">
              <button onClick={proceedToNext} className="bg-green-500 rounded-3xl py-2 px-4 text-white">Start</button>
              <span className="max-w-[80%] text-center">Practice speaking Hindi with this bus stand conversation about ticket booking. Speak your lines to keep the conversation going.
              </span>
            </div>}
                {dialogues.slice(0, currentDialogueIndex + 1).map((dialogue, index) => (
                    <div 
                        key={index} 
                        className={`w-full flex items-center justify-end`}
                        // ref={dialogue[0] === "Seller" && index === currentDialogueIndex ? lastSellerRef : null}
                    >
                      <div className={`w-full flex items-center hello justify-${index % 2 === 0 ? "start" : "end"}`}>
                        <div className={`flex items-center justify-center space-x-2`}>
                            <Image 
                                src={dialogue[0] === "Seller" ? "/man1.png" : "/man2.png"} 
                                alt="person" 
                                width={30} 
                                height={20} 
                                unoptimized 
                                className="w-7 sm:w-9" 
                            />
                            <div className={`flex flex-col items-center justify-center space-y-1 rounded-lg p-1 sm:px-3 ${dialogue[0] === "Seller" && "bg-[#efefef]"} ${dialogue[0] === "You" && "bg-[#036A8C1A]"} ${index === currentDialogueIndex && dialogue[0] === "You" && userSpeech && !isCorrect && "bg-[#FEDFDF]"}`}>
                              <div className="flex items-center justify-center space-x-2">
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
                                <span className="text-xs sm:text-base lg:text-lg">{dialogue[1]}</span>
                              </div>
                              <span className="text-[10px] sm:text-sm">{dialogue[3]}</span>
                              {currentDialogueIndex < 17 && dialogue[0] === "You" && index === currentDialogueIndex && (
                <div className="user-input flex items-center justify-center flex-col space-y-1">
                  {userSpeech !== "" && isCorrect ? null : <button onClick={startRecognition} className="rounded-3xl p-2 px-4 bg-[#036A8C] text-white flex items-center justify-center space-x-2 text-xs">
                      <Image src={"/microphone.png"} alt="speak" width={13} height={12} />
                      <span className="text-[11px] sm:text-sm lg:text-base">
                        {userSpeech === "" && "Speak"}
                        {userSpeech !== "" && !isCorrect && "Speak Again"}
                      </span>
                  </button>}
                  <p className="text-xs sm:text-sm">{userSpeech ? `Detected Speech: ${userSpeech}` : ""}</p>
                  {/* {userSpeech !== "" && isCorrect ? <p>✅ Correct</p> : <p>❌ Try Again</p>} */}
                </div>
            )}
                            </div>
                        </div>
                        </div>
                    </div>
                ))}
                <div ref={lastTextRef} />  
            </div>

            {currentDialogueIndex > 14 && isCorrect && <span className="px-3 py-1 sm:py-2 text-green-500 text-center text-[10px] sm:text-xs md:text-sm border-t border-green-500">Success!!!<br/>You&apos;ve practiced your speaking skills at a bus stand. You&apos;re now better equipped to handle the ticket booking process in Hindi.</span>}
            
          {currentDialogueIndex > -1 && currentDialogueIndex < 15 && 
          <div className="border-t border-[#D9D9D9] w-full flex items-center justify-center z-10 py-2">
            {/* <button>Continue</button> */}
            {/* dialogues[currentDialogueIndex][0] === "You" &&  */}
            {dialogues[currentDialogueIndex][0] === "You" ? <button onClick={proceedToNext} className={`${allowContinue ? "bg-[#036A8C] text-white" : "bg-[#CACACA] text-[#9F9F9F]"} p-1 sm:p-3 flex items-center justify-center space-x-1 sm:space-x-2 rounded-3xl text-xs sm:text-sm md:text-base`} disabled={!allowContinue}>
              <Image src={allowContinue ? "/continue.png" : "/continueBlack.png"} alt="continue" width={20} height={20} className="w-4" />
              <span>Continue</span>
            </button>
            :
            <button className="bg-[#036A8C] text-white p-1 sm:p-3 flex items-center justify-center space-x-1 sm:space-x-2 rounded-3xl text-xs sm:text-sm md:text-base" onClick={proceedToNext}>
              <Image src={"/continue.png"} alt="continue" width={20} height={20} className="w-4" />
              <span>Continue</span>
            </button>}
          </div>}
        </div>
      </div>
    </main>
  );
}
