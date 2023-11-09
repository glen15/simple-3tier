import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Main from './components/Main';
import './App.css';

class App extends Component {
  state = {
    isLogin: false,
    status: ''
  };

  handleStatus = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/status`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then(res => {
        this.setState({
          isLogin: res.data.isLogin,
          status: res.data.isConnectedToDatabase
        });
      })
      .catch(err => console.log(err));
  };

  changeLoginStatus = () => {
    this.setState({
      isLogin: false,
      status: ''
    });
  };

  render() {
    const { isLogin, status } = this.state;

    return (
      <div className="app">
        <div className="container">
          {isLogin ? (
            <div className="success">서버 연결 성공</div>
          ) : (
            <div className="status">TOP SECRET → ID=admin, PW=1234</div>
          )}
          <Routes>
            <Route
              path="/main"
              element={isLogin ? <Main changeLoginStatus={this.changeLoginStatus} /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/login"
              element={!isLogin ? <Login handleStatus={this.handleStatus} /> : <Navigate replace to="/main" />}
            />
            <Route
              path="*"
              element={!isLogin ? <Navigate replace to="/login" /> : <Navigate replace to="/main" />}
            />
          </Routes>
          {isLogin && (
            status ? (
              <div className="success">데이터베이스 연결 성공</div>
            ) : (
              <div className="fail">데이터베이스 연결 정보를 입력하세요</div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default App;
