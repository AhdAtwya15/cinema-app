import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../components/Layout/Layout";
import AdminLayout from "../components/Admin/AdminLayout/AdminLayout";
import AdminProtectedRoute from "../components/Auth/AdminProtectedRoute";

const HomePage = lazy(() => import("../pages/Home/Home"));
const LoginPage = lazy(() => import("../pages/Login/Login"));
const RegisterPage = lazy(() => import("../pages/Register/Register"));
const MoviesPage = lazy(() => import("../pages/Movies/Movies"));
const MovieDetailsPage = lazy(() => import("../pages/Movies/MovieDetails"));
const ReleasesPage = lazy(() => import("../pages/Releases/Releases"));
const ContactPage = lazy(() => import("../pages/Contact/Contact"));
const SeatsPage = lazy(() => import("../pages/Seats/Seates"));
const AddMoviePage = lazy(() => import("../pages/Admin/AddMovie"));
const MoviesList = lazy(() => import("../pages/Admin/MoviesList")); 
const DashboardPage = lazy(() => import("../pages/Admin/Dashboard"));
const BookingPage = lazy(() => import("../pages/Admin/Bookings"));
const BookingDetailsPage = lazy(() => import("../pages/Admin/BookingDetails"));
const PaymentSuccessPage = lazy(() => import("../pages/Payment/PaymentSuccess"));
const PaymentFailedPage = lazy(() => import("../pages/Payment/PaymentFailed"));
const BookingsPage = lazy(() => import("../pages/Bookings/Bookings"));

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        index: true, 
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: "/movies",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <MoviesPage />
          </Suspense>
        ),
      },
      {
        path: "/movies/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <MovieDetailsPage />
          </Suspense>
        ),
      },
      {
        path: "/releases",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ReleasesPage />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: "/movies/:id/seats/:slot",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SeatsPage />
          </Suspense>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PaymentSuccessPage />
          </Suspense>
        ),
      },
      {
        path: "/payment-failed",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PaymentFailedPage />
          </Suspense>
        ),
      },
      {
        path: "/bookings",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <BookingsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
         <DashboardPage/>
        ),
      },
      {
        path: "/admin/add-movie",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AddMoviePage />
          </Suspense>
        ),
      },
      {
        path: "/admin/movies",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <MoviesList />
          </Suspense>
        ),
      },
      {
        path: "/admin/bookings",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <BookingPage />
          </Suspense>
        ),
      },
      {
        path: "/admin/bookings/:movieId",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <BookingDetailsPage />
          </Suspense>
        ),
      },

    ],
  },
]);

export default Router;
