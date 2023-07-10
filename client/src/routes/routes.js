import News from "../pages/News/News";
import About from "../pages/About/About";
import Main from "../pages/Main/Main";
import Store from "../pages/Store/Store";
import LoginPage from "../pages/Authorization/Login/LoginPage";
import RegistrationPage from "../pages/Authorization/Registration/RegistrationPage";

export const routes = [
    {path: '/', component: Main },
    {path: '/news', component: News },
    {path: '/store', component: Store },
    {path: '/about', component: About },
    {path: '/login', component: LoginPage },
    {path: '/register', component: RegistrationPage },
]