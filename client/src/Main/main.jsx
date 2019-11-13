import React, { Component } from 'react';
import Switch from 'react-switch';
import moment from 'moment';
import './main.scss';

export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switchEarliest: true,
    }
  }

  sortWorkOrders = () => {
    this.setState({ switchEarliest: !this.state.switchEarliest })
  }

  defaultImage = e => {
    e.target.src = 'https://via.placeholder.com/500';
  }

  render() {
    const { switchEarliest } = this.state;
    const { orders, filtered, filterInput } = this.props;
    const id = parseInt(filterInput);
    const filteredData = orders.filter(data => {
      if (id) {
        return data.workerId === id;
      } else if (typeof filterInput === 'string') {
        const dataName = data.details.name.toLowerCase();
        const itemName = filterInput.toLowerCase();
        return dataName.includes(itemName)
      }
      return null;
    })

    const data = filtered ? filteredData : orders;

    if (switchEarliest) {
      data.sort((a, b) => a.deadline < b.deadline ? -1 : 1)
    } else {
      data.sort((a, b) => b.deadline < a.deadline ? -1 : 1)
    }

    return (
      <div>
        <div className="switch">
          <span className="switch-font">
            Earliest
          </span>
          <Switch
            className="deadline-input"
            onChange={this.sortWorkOrders}
            checked={this.state.switchEarliest}
            checkedIcon={false}
            uncheckedIcon={false}
            height={20}
          />
          <span className="switch-font">
            Latest
          </span>
        </div>
        <div className="main-container">
          {data.map(el => {
            const { name, description, details, deadline } = el;
            const { image, companyName, email } = details;
            const timeStamp = moment(deadline).format('MM/DD/YYYY, h:mm:ssA');

            return(
              <div className="item-container">
                <div className="name">
                  <strong>{name}</strong>
                </div>
                <div className="description">
                  {description}
                </div>
                <div className="worker">
                  <div className="image">
                    <img src={image} onError={this.defaultImage}/>
                  </div>
                  <div className="info">
                    <div>{details.name}</div>
                    <div>{companyName}</div>
                    <div>{email}</div>
                    <div className="timestamp">
                      {timeStamp}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div> 
      </div>  
    )
  }
}