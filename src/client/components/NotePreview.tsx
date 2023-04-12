import './Note.css';

export default function NotePreview(props: { title: string; body: string }) {
  return (
    <div className="note-box">
      <h1 className="title-preview">{props.title}</h1>
      <main className="body-preview">{props.body}</main>
    </div>
  );
}
