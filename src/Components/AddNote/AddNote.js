import './AddNote.css';
import Card from '../Card/Card';

const AddNote = props => {
  return (
    <Card className="AddNote">
      <input
        onChange={e => props.onNameChange(e.target.value)}
        placeholder="Note name"
        value={props.name}
      />
      <input
        onChange={e => props.onDescriptionChange(e.target.value)}
        placeholder="Note description"
        value={props.description}
      />
      <button className="button" onClick={() => props.onCreateNote()}>Create Note</button>
    </Card>
  );
}

export default AddNote;