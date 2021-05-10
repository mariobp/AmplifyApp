import './SignIn.css';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Auth } from 'aws-amplify';

const SignIn = props => {
  const onFinish = (values) => {
    const { email, password } = values;
    signIn(email, password);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  async function signIn(username, password) {
    try {
      props.onSubmit();
      const user = await Auth.signIn({
        username,
        password
      });
      props.onSignIn(user);
    } catch (error) {
      props.onSignInError(error);
    }
  }


  return (
    <div className="SignIn">
      <Card title="Sign In">
        <Form
          layout="vertical"
          size="large"
          name="normal_login"
          className="login-form"
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}>
             <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"/>
          </Form.Item>
          <Form.Item>
            <a className="login-form-forgot" href onClick={() => props.onNavigation('resetPassword')}>
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Submit
            </Button>
            Or <a href onClick={() => props.onNavigation('signUp')}>Sign Up</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
};

export default SignIn;