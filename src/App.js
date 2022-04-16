import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Location from "./components/pages/Location";
import Resource from "./components/pages/Resource";
import ResourceType from "./components/pages/ResourceType";
import User from "./components/pages/User";
import LocationDetail from "./components/pages/LocationDetail";
import ResourceDetail from "./components/pages/ResourceDetail";
import ResourceTypeDetail from "./components/pages/ResourceTypeDetail";
import AddLocation from "./components/pages/AddLocation";
import AddResource from "./components/pages/AddResource";
import AddResourceType from "./components/pages/AddResourceType";

const App = () => {
  return (
    <>
      <Router>
        <div className="app">
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Dashboard />} />
            </Route>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/location" element={<Location />} />
            <Route exact path="/resource" element={<Resource />} />
            <Route exact path="/resourceType" element={<ResourceType />} />
            <Route exact path="/user" element={<User />} />
            <Route
              exact
              path="/locationDetail/:id"
              element={<LocationDetail />}
            />
            <Route
              exact
              path="/resourceDetail/:id"
              element={<ResourceDetail />}
            />
            <Route
              exact
              path="/resourceTypeDetail/:id"
              element={<ResourceTypeDetail />}
            />
            <Route exact path="/addLocation" element={<AddLocation />} />
            <Route exact path="/addResource" element={<AddResource />} />
            <Route
              exact
              path="/addResourceType"
              element={<AddResourceType />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
