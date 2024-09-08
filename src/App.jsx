import React, { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "./App.css"; // For shaking animation and explosion

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const [noClickedCount, setNoClickedCount] = useState(0);
  const [text, setText] = useState("Sabay tomorrow?");
  const [noDisabled, setNoDisabled] = useState(false);
  const [isShaking, setIsShaking] = useState(false); // For shaking effect
  const [explosion, setExplosion] = useState(false); // For explosion effect
  const [showYesImage, setShowYesImage] = useState(false); // For showing image on Yes click
  const [showNoImage, setShowNoImage] = useState(false); // For showing image on No's final click
  const [showTextAndButtons, setShowTextAndButtons] = useState(true); // To hide Yes button and text on final No
  const { width, height } = useWindowSize();

  const handleYesClick = () => {
    setShowConfetti(true);
    setYesClicked(true);
    setText("gege loads what time?");
    setNoDisabled(true); // Disable the No button
    setShowYesImage(true); // Show the Yes image
  };

  const handleNoClick = () => {
    if (noClickedCount < 4) {
      setNoClickedCount(noClickedCount + 1);
      setText((prevText) => prevText + "?"); // Add more question marks
      setIsShaking(true); // Start shaking
      setTimeout(() => setIsShaking(false), 500); // Stop shaking after 0.5s
    } else {
      setExplosion(true); // Trigger explosion on the 5th click
      setTimeout(() => {
        setNoDisabled(true); // Disable No button
        setShowNoImage(true); // Show the No image
        setShowTextAndButtons(false); // Hide the Yes button and text
      }, 500);
    }
  };

  return (
    <div
      className={`flex flex-col gap-7 justify-center items-center w-screen h-screen ${
        isShaking ? "shake" : ""
      }`}
    >
      {showConfetti && <Confetti width={width} height={height} />}
      
      {/* Conditionally render Yes Image */}
      {showYesImage && (
        <div className="flex justify-center items-center">
          <img
            src="https://wallpapers.com/images/hd/meme-pictures-t5i9qfiats5iylyv.jpg"
            alt="Yes Clicked"
            className="w-2/6"
          />
        </div>
      )}

      {/* Conditionally render No Image */}
      {showNoImage && (
        <div className="flex flex-col gap-3 justify-center items-center">
          <img
            src="https://i.imgur.com/nk2j1J6.png"
            alt="No Clicked"
            className="no-image"
          />
          <h1 className="text-2xl">awts gege.</h1>
        </div>
      )}

      {/* Conditionally render the text and buttons */}
      {showTextAndButtons && (
        <>
          <h1
            className={`transition-transform text-2xl ${
              noClickedCount > 0
                ? `text-red-600 scale-${1 + noClickedCount * 0.1}`
                : ""
            }`}
          >
            {text}
          </h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="btn btn-lg"
              onClick={handleYesClick}
              disabled={yesClicked}
            >
              Yes
            </button>
            <button
              className={`btn btn-lg ${explosion ? "explode" : ""}`}
              onClick={handleNoClick}
              disabled={noDisabled}
              style={{ opacity: noDisabled ? 0 : 1 }}
            >
              No
            </button>
          </div>
        </>
      )}
      
      {explosion && <div className="explosion-effect"></div>} {/* Explosion effect */}
    </div>
  );
}

export default App;