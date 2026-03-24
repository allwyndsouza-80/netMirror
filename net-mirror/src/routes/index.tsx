import { createBrowserRouter } from "react-router-dom";
import Login from "../features/Login/Login";
import AppLayout from "../app/AppLayout";
import Search from "../features/Search/Search";
import MovieDetails from "../features/Movie-Details/MovieDetails";
import Profile from "../features/Profile/Profile";
import MyList from "../features/My-List/MyList";
import TvShows from "../features/TV-Shows/TvShows";
import NewAndPopular from "../features/New-And-Popular/NewAndPopular";
import Movies from "../features/Movies/Movies";
import NetflixVideoPlayer from "../features/Video-Player/VideoPlayer";
import Home from "../features/Home/Home";
import NotFound from "../features/NotFound/NotFound";
import ErrorPage from "../features/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />, // Google SSO
  },      {
    path: "/video",
    element: <NetflixVideoPlayer />,
  },

  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/profiles",
        element: <Profile />, // choose profile
      },
      {
        path: "/home",
        element: <Home />, // dashboard
      },
      {
        path: "/my-list",
        element: <MyList />, // dashboard
      },
      {
        path: "/tvshows",
        element: <TvShows />, // dashboard
      },
      {
        path: "/new&popular",
        element: <NewAndPopular />, // dashboard
      },
      {
        path: "/movies",
        element: <Movies />, // dashboard
      },
      {
        path: "search",
        element: <Search />,
      },

      {
        path: "movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);