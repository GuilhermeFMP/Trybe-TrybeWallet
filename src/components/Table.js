import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </thead>
        <tbody>
          { expenses.map((expense, index) => {
            const { description, value, tag, method, exchangeRates, currency } = expense;
            const money = Object.values(exchangeRates !== undefined
              && exchangeRates).find((exchange) => exchange.code === currency);
            const { name, ask } = money;
            return (
              <tr key={ index }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{name}</td>
                <td>{Number(ask).toFixed(2)}</td>
                <td>{(Number(ask) * Number(value)).toFixed(2)}</td>
                <td>Real</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
