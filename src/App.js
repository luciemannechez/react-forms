import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            errorEmail: '',
            errorPassword: '',
            errorConfirmPassword: '',
            disabledSubmit: true
        };

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmail(e) {
        this.setState({email: e.target.value}, () => this.validForm());
    }

    handlePassword(e) {
        this.setState({password: e.target.value}, () => this.validForm());
    }

    handleConfirmPassword(e) {
        this.setState({confirmPassword: e.target.value}, () => this.validForm());
    }

    validForm() {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const emailValid = re.test(this.state.email);

        if (!emailValid)
            this.setState({errorEmail: 'email invalide'});
        else this.setState({errorEmail: ''});

        if (this.state.password.length < 4)
            this.setState({errorPassword: 'le mot de passe doit comporter au moins 4 caractères'});
        else this.setState({errorPassword: ''});

        if (this.state.confirmPassword !== this.state.password)
            this.setState({errorConfirmPassword: 'le mot de passe doit être identique'});
        else this.setState({errorConfirmPassword: ''});

        if (emailValid && this.state.password.length > 4 && this.state.confirmPassword === this.state.password) {
            this.setState({disabledSubmit: false});
        }
        else
            this.setState({disabledSubmit: true});
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <div>
                    <div className="error">{this.state.errorEmail}</div>
                    <label>Email
                        <input type="text" value={this.state.email} onChange={this.handleEmail} />
                    </label>
                </div>
                <div>
                    <div className="error">{this.state.errorPassword}</div>
                    <label>Password
                        <input type="text" value={this.state.password} onChange={this.handlePassword} />
                    </label>
                </div>
                <div>
                    <div className="error">{this.state.errorConfirmPassword}</div>
                    <label>Confirm password
                        <input type="text" value={this.state.confirmPassword} onChange={this.handleConfirmPassword} />
                    </label>
                </div>
                <input type="submit" value="Submit" disabled={this.state.disabledSubmit}/>
            </form>
        )
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
          <Form/>
      </div>
    );
  }
}

export default App;
