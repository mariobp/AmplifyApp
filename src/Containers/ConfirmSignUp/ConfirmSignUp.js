import './ConfirmSignUp.css';
import { Form, Input, Button, Card } from 'antd';
import { Auth } from 'aws-amplify';
import { CodeOutlined } from '@ant-design/icons';

const ConfirmSignUp = props => {

  const onFinish = (values) => {
    const { authCode } = values;
    confirmSignUp(props.username, authCode);
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  async function confirmSignUp(username, code) {
    try {
      props.onSubmit();
      await Auth.confirmSignUp(username, code);
      props.onConfirmSignUp();
    } catch (error) {
      props.onConfirmSignUpError(error);
    }
  }

  async function resendConfirmationCode() {
    try {
        await Auth.resendSignUp(props.username);
    } catch (err) {
        console.log('error resending code: ', err);
    }
}

  return (
    <div className="ConfirmSignUp">
      <Card title="">
        <Form
          layout="vertical"
          size="large"
          name="normal_confirm"
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Confirmation code"
            name="authCode"
            rules={[{ required: true, message: 'Please input your confirmation code!' }]}>
            <Input
              prefix={<CodeOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"/>
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit" className="confirm-button">
              Submit
            </Button>
            Or <a href onClick={resendConfirmationCode}>Re-send confirmation code</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ConfirmSignUp;