import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          className="scroll-to-top fixed bottom-20 right-30 left-10 z-50 bg-primary text-accent cursor-pointer p-4 rounded-full transition-colors duration-300 hover:bg-secondary"
          onClick={scrollToTop}
        >
          Scroll to Top
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
