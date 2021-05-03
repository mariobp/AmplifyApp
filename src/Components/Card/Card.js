import './Card.css';

const Card = props => {
  const classes = ['Card'];
  if (props.className) {
    classes.push(props.className)
  }
  return (
    <div className={classes.join(' ')}>
      {props.children}
    </div>
  )
};

export default Card;