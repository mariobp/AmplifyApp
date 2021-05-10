import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import Card from '../Card/Card';
import AddNote from '../AddNote/AddNote';
import { listTodos } from '../../graphql/queries';
import { createTodo as createNoteMutation, deleteTodo as deleteNoteMutation } from '../../graphql/mutations';
import './Note.css';

const initialFormState = { name: '', description: '' }

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listTodos });
    setNotes(apiData.data.listTodos.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

  return (
    <div className="Notes">
      <AddNote
        name={formData.name}
        description={formData.description}
        onNameChange={value => setFormData({ ...formData, 'name': value})}
        onDescriptionChange={value => setFormData({ ...formData, 'description': value})}
        onCreateNote={createNote}/>
      <div className="container">
        {
          notes.map((note, index) => (
            <Card key={note.id || index}>
              <h2>{note.name}</h2>
              <p>{note.description}</p>
              <button onClick={() => deleteNote(note)}>Delete note</button>
            </Card>
          ))
        }
      </div>
    </div>
  );
}

export default Note;