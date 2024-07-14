import styles from './Button.module.css';
import {useParams} from 'react-router-dom';
function Button() {
  const params = useParams();
  return <button className={styles.btn}>Click me {params.id}</button>;
}

export default Button;
