import './SignUp.css';
import { Auth } from 'aws-amplify';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const SignUp = props => {

  const onFinish = (values) => {
    const { username, password, email } = values;
    signUp(email, password, { name: username });
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  async function signUp(username, password, attributes) {
    try {
      props.onSubmit();
      const { user } = await Auth.signUp({
        username,
        password,
        attributes
      });
      console.log('user', user);
      props.onSignUp(username);
    } catch (error) {
      console.log('sign up error', error);
      props.onSignUpError(error);
    }
  }

  return (
    <div className="SignUp">
      <Card title="Sign Up">
        <Form
          layout="vertical"
          size="large"
          name="normal_signUp"
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"/>
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="username"/>
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
            <Button type="primary" htmlType="submit" className="create-form-button">
              Submit
            </Button>
            Or <a href onClick={() => props.onNavigation('signIn')}>Sign In</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
};

export default SignUp;