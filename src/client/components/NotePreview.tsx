import './Note.css';

export default function NotePreview(props: { title: string; body: string }) {
  return (
    <div className="note-box">
      <h1>{props.title}</h1>
      <main>{props.body}</main>
    </div>
  );
}
