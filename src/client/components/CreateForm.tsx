import type { Note } from '../App';

export default function CreateForm() {
  return (
    <div>
      <form action="localhost:5432/notes" method="POST">
        <input type="text" name="title" id="title" placeholder="Title" />
        <input type="text" name="body" id="body" />
      </form>
    </div>
  );
}
