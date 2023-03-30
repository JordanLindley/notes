export default function Note(props: {
  note: { id: string; title: string; body: string };
}) {
  return (
    <div className="note-display">
      <h1>{props.note.title}</h1>
      <main>{props.note.body}</main>
    </div>
  );
}
