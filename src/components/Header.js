import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  valueOfExpenses = () => {
    const { expenses } = this.props;
    const values = expenses.map((expense) => {
      const totalValues = Object.entries(expense.exchangeRates);
      const currentValor = totalValues.find((valor) => valor[0] === expense.currency);
      return Number(expense.value) * Number(currentValor[1].ask);
    });
    return values.reduce((sum, a) => sum + a, 0);
  };

  render() {
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="header-currency-field">BRL</p>
        <p data-testid="total-field">{ this.valueOfExpenses().toFixed(2) }</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  value: state.wallet.totalValue,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
