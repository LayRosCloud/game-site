import News from "../pages/News/News";
import About from "../pages/About/About";
import Main from "../pages/Main/Main";
import Store from "../pages/Store/Store";
import LoginPage from "../pages/Authorization/Login/LoginPage";
import RegistrationPage from "../pages/Authorization/Registration/RegistrationPage";
import NewsId from "../pages/News/NewsId";
import Game from "../pages/Store/Game";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

export const routes = [
    {path: '/', component: Main },
    {path: '/news', component: News },
    {path: '/news/:id', component: NewsId },
    {path: '/store/:id', component: Game },
    {path: '/store', component: Store },
    {path: '/about', component: About },
    {path: '/login', component: LoginPage },
    {path: '/register', component: RegistrationPage},
    {path: '/error', component: NotFoundPage}
]