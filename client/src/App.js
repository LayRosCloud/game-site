import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import './app.css'
import {Route, Routes} from "react-router-dom";
import {routes} from "./routes/routes";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import {useDispatch} from "react-redux";
function App() {
    const dispatch = useDispatch();
    const auth = localStorage.getItem('isAuth') || false;

    const authArray = [{type: 'AUTH'}, {type: 'EXIT_AUTH'}]

    dispatch(auth ? authArray[0] : authArray[1])

  return (
    <div className="App">
        <Header/>
        <main>
            <Routes>
                { routes.map ( route =>
                    <Route key={route.path} path={route.path} Component={route.component}/>)
                }
                <Route path='*' Component={NotFoundPage}/>
            </Routes>
        </main>
        <Footer/>
    </div>
  );
}

export default App;
