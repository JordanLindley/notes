import './Note.css';

export default function Note(props: {
  note: { id: string; title: string; body: string };
}) {
  return (
    <div className="note-container">
      <div className="note-display">
        <div className="note-title">
          <h1>{props.note.title}</h1>
        </div>
        <div className="note-body">
          <main>{props.note.body}</main>
        </div>
      </div>
    </div>
  );
}
