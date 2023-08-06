import News from "../pages/News/News";
import About from "../pages/About/About";
import Main from "../pages/Main/Main";
import Store from "../pages/Store/Store";
import LoginPage from "../pages/Authorization/Login/LoginPage";
import RegistrationPage from "../pages/Authorization/Registration/RegistrationPage";
import NewsId from "../pages/News/NewsId";
import Game from "../pages/Store/Game";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile/EditProfile";
import DeveloperPanel from "../pages/Admin/DeveloperPanel/DeveloperPanel";
import AdminPanel from "../pages/Admin/AdminPanel/AdminPanel";

export const routes = [
    {path: '/', component: Main },
    {path: '/profile/edit/:link', component: EditProfile },
    {path: '/developer/*', component: DeveloperPanel },
    {path: '/admin/*', component: AdminPanel },
    {path: '/profile/:link', component: Profile },
    {path: '/news', component: News },
    {path: '/news/:id', component: NewsId },
    {path: '/store/:id', component: Game },
    {path: '/store', component: Store },
    {path: '/about', component: About },
    {path: '/login', component: LoginPage },
    {path: '/register', component: RegistrationPage},
    {path: '/error', component: NotFoundPage},
    {path: '*', component: NotFoundPage}
]