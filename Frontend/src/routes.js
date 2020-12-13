import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import Icons from "views/Icons.jsx";
import AllOffers from "views/AllOffers";
import MyOfferPage from "views/MyOfferPage";
import PostOffer from "views/PostOffer";
import BankAccountSetup from "views/BankAccountSetup";
import BankTransaction from "views/BankTransaction";
import ExhangeRates from "views/ExhangeRates";
import ViewBankAccounts from "views/ViewBankAccounts";
//import Login from "views/Login";

const dashboardRoutes = [
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

  /*{
    path: "/login",
    name: "Login",
    icon: "pe-7s-user",
    component: Login,
    layout: "/admin",
  },*/
  {
    path: "/exchangerates",
    name: "Prevailing Rates",
    icon: "pe-7s-note2",
    component: ExhangeRates,
    layout: "/admin",
  },
  {
    path: "/bankaccount",
    name: "Bank",
    icon: "pe-7s-user",
    component: BankAccountSetup,
    layout: "/admin",
  },

  {
    path: "/viewaccounts",
    name: "Linked Accounts",
    icon: "pe-7s-user",
    component: ViewBankAccounts,
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
    path: "/transfermoney",
    name: "Transfer Money",
    icon: "pe-7s-user",
    component: BankTransaction,
    layout: "/admin",
  },
  {
    path: "/myoffers",
    name: "My Offers",
    icon: "pe-7s-note2",
    component: MyOfferPage,
    layout: "/admin",
  }
];

export default dashboardRoutes;
