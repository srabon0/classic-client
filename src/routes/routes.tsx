import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Brand from "../pages/Brand";
import Category from "../pages/Categories";
import Login from "../pages/Login";
import Product from "../pages/Products";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "brand",
        element: <Brand />,
      },
      {
        path: "product",
        element: <Product />,
      },
    ],
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/login",
    // index: true,
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;

// import { createBrowserRouter } from 'react-router-dom';
// import App from '../App';
// import Login from '../pages/Login';
// import Register from '../pages/Register';
// import { adminPaths } from './admin.routes';
// import { routeGenerator } from '../utils/routesGenerator';
// import { facultyPaths } from './faculty.routes';
// import { studentPaths } from './student.routes';
// import ProtectedRoute from '../components/layout/ProtectedRoute';
// import ChangePassword from '../pages/ChangePassword';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },
//   {
//     path: '/admin',
//     element: (
//       <ProtectedRoute role="admin">
//         <App />
//       </ProtectedRoute>
//     ),
//     children: routeGenerator(adminPaths),
//   },
//   {
//     path: '/faculty',
//     element: (
//       <ProtectedRoute role="faculty">
//         <App />
//       </ProtectedRoute>
//     ),
//     children: routeGenerator(facultyPaths),
//   },
//   {
//     path: '/student',
//     element: (
//       <ProtectedRoute role="student">
//         <App />
//       </ProtectedRoute>
//     ),
//     children: routeGenerator(studentPaths),
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
//   {
//     path: '/change-password',
//     element: <ChangePassword />,
//   },
//   {
//     path: '/register',
//     element: <Register />,
//   },
// ]);

// export default router;
