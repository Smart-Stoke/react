import router from './routes';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
