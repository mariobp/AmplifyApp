import './Loader.css';
import { Spin } from 'antd';

const Loader = props => {
  let classes = ['Loader'];
  if (props.show) {
    classes.push('show')
  }

  return (
    <div className={classes.join(' ')}>
      <Spin size="large"/>
    </div>
  )
};

export default Loader;