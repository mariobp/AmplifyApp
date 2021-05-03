import logo from '../../logo.svg';
import './Header.css';

function Header () {
  return (
    <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>We now have Auth!</h1>
    </header>
  );
}

export default Header;