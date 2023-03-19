export default function Note(props: { title: string; body: string }) {
  return (
    <div>
      <h1>{props.title}</h1>
      <main>{props.body}</main>
    </div>
  );
}
