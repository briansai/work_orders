import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Filter from '../Filter/filter.jsx';
import Main from '../Main/main.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      filterInput: '',
      filtered: false,
    }
  }

  componentDidMount() {
    axios.get('/work-orders')
      .then(async res => {
        const workerInfo = {};
        const data = res.data;
        const filteredIds = data.reduce((a, c) => {
          if (!a.includes(c.workerId)) {
            a.push(c.workerId);
          }
          return a;
        }, [])
        
        const promise = () => {
          return filteredIds.map(async id => {
            return await axios.get('/workerId', {
              params: { id }
            })
            .then(workers => {
              workerInfo[id] = workers.data;
            })
            .catch(err => {
              throw new Error(err);
            })
          })
        }

        await Promise.all(promise());

        const workerDetails = data.map(orders => {
          if (workerInfo[orders.workerId]) {
            orders.details = workerInfo[orders.workerId];
          }
          return orders;
        })

        this.setState({ orders: workerDetails });
      })
      .catch(err => {
        throw new Error(err);
      })
  }

  handleFilter = filterInput => {
    this.setState({ filterInput });
  }

  toggleFiltered = bool  => {
    if (bool) {
      this.setState({ filtered: true });
    } else {
      this.setState({ filtered: false });
    }
  }

  render() {
    const { orders, filterInput, filtered } = this.state;
    return (
      orders ? (
        <Fragment>
          <div className="filter">
            <Filter
              orders={orders}
              handleFilter={this.handleFilter}
              filtered={filtered}
              toggleFiltered={this.toggleFiltered}
            />
          </div>
          <div className="main">
            <Main
              orders={orders}
              filtered={filtered}
              filterInput={filterInput}
            />
          </div>
        </Fragment> 
      ) : (
        null
      )
    )
  }
}
