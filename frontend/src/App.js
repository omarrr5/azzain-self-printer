import './index.css';
import {RouterProvider} from "react-router-dom";
import router from './router.jsx';
import { ContextProvider } from './contexts/ContextProvider.jsx';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </div>
  );
}

export default App;
