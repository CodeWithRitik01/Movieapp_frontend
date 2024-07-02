import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import styles from './app.module.css'
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { AddForm } from './components/AddForm/AddForm';
import { WatchList } from './components/WatchList/WatchList';
import { EditForm } from './components/EditForm/Editform';
import { Toaster } from 'react-hot-toast';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        { index: true, element: <Home /> },
        {path: "addmovie", element:<AddForm />},
        {path: "watchlist", element:<WatchList/>},
        {path: "edit", element:<EditForm />}
      ],
    },
  ]);

  return (
    <div>
    <RouterProvider router={router} />
    <Toaster position='bottom-center'/> 
    </div>
 
  );
}

export default App;
