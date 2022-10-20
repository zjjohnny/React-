import './App.css'
import React from 'react';
import Navbar from './router/Navbar';
import axios from 'axios';
import { HashRouter, Router, Route, NavLink, Redirect, Switch, Routes, Navigate, Link, Outlet, BrowserRouter } from 'react-router-dom'
import Routers from './router';


function App() {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  )
}

export default App;
