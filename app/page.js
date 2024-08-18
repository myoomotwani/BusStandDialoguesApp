import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-white py-5 h-full text-black overflow-x-hidden">
      <div className="w-full flex flex-col space-y-5 items-center justify-center">
        <span className="text-[#036A8C] font-extrabold text-3xl">Hindi Harmony</span>
        <div className="bg-[url('/busStandImage.jpeg')] h-80 w-screen bg-center bg-cover bg-no-repeat bg-fixed"></div>
        <div className="w-[90%] sm:w-[70%] flex flex-col items-center justify-center shadow-[#00000017] shadow-lg drop-shadow-lg rounded-lg -space-y-1">
          <div className="bg-[#036A8C] text-white rounded-t-lg p-3 w-full">
            Hindi Learning App - Bus Stand Dialogue
          </div>
          <div className="flex items-center justify-center w-full flex-col space-y-3 rounded-2xl p-3">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center justify-center space-x-2">
                <Image src={"/man1.png"} alt="person" width={30} height={20} unoptimized />
                <div className="flex items-center justify-center space-x-2 rounded-b-lg rounded-tr-lg p-1 sm:px-3 bg-[#EFEFEF]">
                  <Image src={"/speakButton.png"} alt="speak" width={15} height={10} />
                  <span className="text-xs sm:text-sm">Namaste</span>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 mt-10">
                <Image src={"/man2.png"} alt="person" width={30} height={20} unoptimized />
                <div className="flex items-center justify-center space-x-2 rounded-b-lg rounded-tr-lg p-1 sm:px-3 bg-[#EFEFEF]">
                  <Image src={"/speakButton.png"} alt="speak" width={15} height={10} />
                  <span className="text-xs sm:text-sm">Namaste</span>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center justify-center space-x-2">
                <Image src={"/man1.png"} alt="person" width={30} height={20} unoptimized />
                <div className="flex items-center justify-center space-x-2 rounded-b-lg rounded-tr-lg p-1 sm:px-3 bg-[#EFEFEF]">
                  <Image src={"/speakButton.png"} alt="speak" width={15} height={10} />
                  <span className="text-xs sm:text-sm">Namaste</span>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 mt-10">
                <Image src={"/man2.png"} alt="person" width={30} height={20} unoptimized />
                <div className="flex items-center justify-center space-x-2 rounded-b-lg rounded-tr-lg p-1 sm:px-3 bg-[#EFEFEF]">
                  <Image src={"/speakButton.png"} alt="speak" width={15} height={10} />
                  <span className="text-xs sm:text-sm">Namaste</span>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center justify-center space-x-2">
                <Image src={"/man1.png"} alt="person" width={30} height={20} unoptimized />
                <div className="flex items-center justify-center space-x-2 rounded-b-lg rounded-tr-lg p-1 sm:px-3 bg-[#EFEFEF]">
                  <Image src={"/speakButton.png"} alt="speak" width={15} height={10} />
                  <span className="text-xs sm:text-sm">Namaste</span>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 mt-10">
                <Image src={"/man2.png"} alt="person" width={30} height={20} unoptimized />
                <div className="flex items-center justify-center space-x-2 rounded-b-lg rounded-tr-lg p-1 sm:px-3 bg-[#EFEFEF]">
                  <Image src={"/speakButton.png"} alt="speak" width={15} height={10} />
                  <span className="text-xs sm:text-sm">Namaste</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#D9D9D9] w-full flex items-center justify-center p-5 mt-10 mb-1">
            <button className="bg-[#036A8C] p-3 text-white flex items-center justify-center space-x-2 rounded-3xl">
              <Image src={"/continue.png"} alt="continue" width={20} height={20} />
              <span>Continue</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
