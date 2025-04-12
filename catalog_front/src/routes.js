import Categories from "./pages/Categories"
import Main from "./pages/Main"


export const privateRoutes = [
    {path: '/*', component: <Main/>, exact: true},
    {path: '/products', component: <Main/>, exact: true},
    {path: '/categories', component: <Categories/>, exact: true},
]

export const publicRoutes = [
    {path: '/*', component: <Main/>, exact: true},
]