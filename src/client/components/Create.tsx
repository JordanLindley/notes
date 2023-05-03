import NotePreview from './NotePreview';
import type { Note } from '../App';

export default function Create() {
  function handleClick() {
    // props.onCreateNote();  ??? not sure what to use as argument here.
  }

  return (
    <button className="create" onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
    </button>
  );
}
