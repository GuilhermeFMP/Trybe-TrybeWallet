import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, value } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="header-currency-field">BRL</p>
        <p data-testid="total-field">{ value.toFixed(2) }</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  value: state.wallet.totalValue,
});

export default connect(mapStateToProps)(Header);
