import { RouterProvider} from 'react-router-dom'
import router from './routes/AllRoutes.jsx'
import {Toaster} from 'react-hot-toast'

function App() {

  return (
    <div className="bg-gray-500">
            <Toaster reverseOrder={false}/>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
