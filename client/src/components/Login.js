import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleSubmit = () => {
    const { username, password } = this.state;
    const { handleStatus } = this.props;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/signin`,
        {
          username,
          password
        },
        { withCredentials: true }
      )
      .then(res => {
        localStorage.setItem('accessToken', res.data);
        handleStatus();
      })
      .catch(err => {
        this.setState({
          username: '',
          password: ''
        });
        if (err.response && err.response.status === 401) {
          alert('ID, PW를 정확히 입력해주세요!!');
        }
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="form-container">
        <form className="form-items" onSubmit={e => e.preventDefault()}>
          <div className="login">Enter your ID, PW</div>
          <input
            type="text"
            name="username"
            placeholder="ID"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="PW"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit" onClick={this.handleSubmit}>Connect to server</button>
        </form>
      </div>
    );
  }
}

function LoginWithNavigate(props) {
  let navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

export default LoginWithNavigate;
