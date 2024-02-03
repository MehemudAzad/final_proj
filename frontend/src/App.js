import { RouterProvider } from 'react-router-dom';
import { routes } from './Routes/routes/routes';
import { useEffect } from 'react';

function App() {
  return (
    <div className="App">
      {/* <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1> */}
      <RouterProvider router={routes}>
    
    </RouterProvider>
    </div>
  );
}

export default App;
