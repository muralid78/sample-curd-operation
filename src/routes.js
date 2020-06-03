import Dashboard from "views/Dashboard.jsx";
import TableList from "views/Tables.jsx";





var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  
  
  
  {
    path: "/tables",
    name: " Add item ",
    icon: "nc-icon nc-bullet-list-67",
    component: TableList,
    layout: "/admin"
  },
 

 
];
export default routes;
