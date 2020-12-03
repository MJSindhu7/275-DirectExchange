import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import Icons from "views/Icons.jsx";
import Notifications from "views/Notifications.jsx";
import AllOffers from "views/AllOffers";
import MyOfferPage from "views/MyOfferPage";
import PostOffer from "views/PostOffer";
import BankAccountSetup from "views/BankAccountSetup";
import Login from "views/Login.jsx";

const dashboardRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "pe-7s-user",
    component: Login,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin",
  },

  {
    path: "/bankaccount",
    name: "Add Bank Account",
    icon: "pe-7s-user",
    component: BankAccountSetup,
    layout: "/admin",
  },
  {
    path: "/postoffer",
    name: "Post Offer",
    icon: "pe-7s-user",
    component: PostOffer,
    layout: "/admin",
  },
  {
    path: "/alloffers",
    name: "All Offers",
    icon: "pe-7s-note2",
    component: AllOffers,
    layout: "/admin",
  },
  {
    path: "/myoffers",
    name: "My Offers",
    icon: "pe-7s-note2",
    component: MyOfferPage,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin",
  },
];

export default dashboardRoutes;
