import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Sidebar from './components/Sidebar';
import Topnav from './components/Topnav';
import CountyNew from './pages/counties/new/index';
import Counties from './pages/counties';
import CountiesEdit from './pages/counties/edit/index';
import UserEdit from './pages/users/edit/index';
import NoMatch from './pages/noMatch';
import Users from './pages/users';
import UsersNew from './pages/users/new/index';
import Addresses from './pages/addresses/index';
import AddressesNew from './pages/addresses/new/index';
import AddressesEdit from './pages/addresses/edit/index';

const API_URL = 'http://localhost:3030/api/v1/'

function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Topnav />
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <Routes>
                <Route path="/" element={<Counties urlApi={API_URL} />} />
                <Route path="/counties" element={<Counties urlApi={API_URL} />} />
                <Route path="/counties/new" element={<CountyNew urlApi={API_URL} />} />
                <Route path="/counties/:id" element={<CountiesEdit urlApi={API_URL} />} />
                <Route path="/addresses" element={<Addresses urlApi={API_URL} />} />
                <Route path="/addresses/:id" element={<AddressesEdit urlApi={API_URL} />} />
                <Route path="/addresses/new" element={<AddressesNew urlApi={API_URL} />} />
                <Route path="/users/:id" element={<UserEdit urlApi={API_URL} />} />
                <Route path="/users" element={<Users urlApi={API_URL} />} />
                <Route path="/users/new" element={<UsersNew urlApi={API_URL} />} />
                <Route path="*" element={<NoMatch />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
