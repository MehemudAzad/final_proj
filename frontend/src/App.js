import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes/routes/routes';
import { useEffect } from 'react';

function App() {
  return (
    <div className="App">
      <RouterProvider router={routes}>
    
      </RouterProvider>
    </div>
  );
}

export default App;
