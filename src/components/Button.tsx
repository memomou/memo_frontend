import {useParams} from 'react-router-dom';
function Button() {
  const params = useParams();
  return <button >Click me {params.id}</button>;
}

export default Button;
