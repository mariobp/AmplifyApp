import './Header.css';
import { LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { Auth } from 'aws-amplify';
import { Menu } from 'antd';

const Header = props => {
  const handleClick = e => {
    switch (e.key) {
      case 'logout':
        signOut();
        break;
      case 'signIn':
        props.onNavigation('signIn');
        break;
      default:
        break;
    }
  };

  async function signOut() {
    try {
      await Auth.signOut();
      props.onSignOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <nav className="NavMenu">
      <header>
        <h1>{props.title}</h1>
      </header>
      <Menu onClick={handleClick}>
        {
          props.user
          ? <Menu.Item key="logout" icon={<LogoutOutlined />}>
              Logout
            </Menu.Item>
          :  <Menu.Item key="signIn" icon={<LoginOutlined />}>
              Sign In
            </Menu.Item>
        }
        
      </Menu>
    </nav>
  );
}

export default Header;