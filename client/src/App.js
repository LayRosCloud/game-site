import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import './app.css'
import {Route, Routes} from "react-router-dom";
import {routes} from "./routes/routes";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
function App() {
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
