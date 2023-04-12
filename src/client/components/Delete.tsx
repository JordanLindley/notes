export default function Delete(props: {
  noteId: string;
  onDeleteNote: (id: string) => void;
}) {
  function handleClick() {
    // alert user for confirmation when clicked
    if (window.confirm('Delete note?')) {
      props.onDeleteNote(props.noteId);
    }
  }

  return (
    <button className="delete" onClick={handleClick}>
      🗑️
    </button>
  );
}
