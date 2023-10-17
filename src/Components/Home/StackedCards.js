import React, { useState } from "react";

const StackedCards = ({ artisans }) => {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    setCurrentCard((currentCard + 1) % artisans.length);
  };

  return (
    <div className="text-center py-6 mx-auto max-w-screen-xl">
      <div className="avatar-group -space-x-6 inline-block relative">
        {artisans.map((artisan, index) => (
          <div
            key={index}
            className={`avatar ${index === currentCard ? "" : "hidden"}`}
          >
            <div className="w-48 h-48 overflow-hidden" onClick={nextCard}>
              <img
                src={artisan.image}
                alt={`Artisan ${artisan.name}`}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-sm mt-2 text-primary">
              <p className="font-bold">{artisan.name}</p>
              <p>{artisan.specialty}</p>
            </div>
          </div>
        ))}
        <p>click to see others...</p>
      </div>
    </div>
  );
};

export default StackedCards;
