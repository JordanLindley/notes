import { useEffect } from 'react';
import './SaveIndicator.css';

export default function SaveIndicator({
  onComplete,
}: {
  onComplete: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000); // The checkmark will be visible for 2 seconds
    // Clean up the timer in case it's still pending when the component unmounts.
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="checkmark">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle
          className="checkmark__circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path
          className="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
    </div>
  );
}
