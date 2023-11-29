import { RouterProvider } from 'react-router-dom';
import './App.css';
import routesBasic from './router/routesBasic';

function App() {
  return (
    <RouterProvider router={routesBasic} />
  );
}

export default App;