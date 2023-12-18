import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

function AuthRoute({ auth, children }) {
  console.log(auth);
  if (!auth) {
    toast.error('Unauthorized!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return <Navigate to="/" replace />;
  }
  return children;
}
export default AuthRoute;
