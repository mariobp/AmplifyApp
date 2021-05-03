import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Note from './Components/Note/Note';
import Header from './Components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="signOut">
        <AmplifySignOut />
      </div>
      <Note />
    </div>
  );
}

export default withAuthenticator(App);
