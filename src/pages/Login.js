import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import emailSave from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };

    this.buttonCheck = this.buttonCheck.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.emailCheck = this.emailCheck.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(emailSave(email));
    history.push('/carteira');
  }

  emailCheck(email) {
    return !!(email.includes('@') === true
         && email.includes('.com') === true);
  }

  buttonCheck() {
    const { email, password } = this.state;
    const MIN_CHARACTERS = 6;
    const passwordvalidation = password.length < MIN_CHARACTERS;
    const emailvalidation = !(this.emailCheck(email));
    const validation = passwordvalidation || emailvalidation;
    this.setState({
      buttonDisabled: validation,
    });
  }

  inputChange(event) {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.buttonCheck();
      },
    );
  }

  render() {
    const { email, password, buttonDisabled } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            type="email"
            id="email"
            name="email"
            value={ email }
            onChange={ this.inputChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            id="password"
            name="password"
            value={ password }
            onChange={ this.inputChange }
          />
        </label>
        <button
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default connect()(Login);
