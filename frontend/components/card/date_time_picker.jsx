import React from 'react';



export default class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dueDate = this.props.card.due_date;
    let date; let month; let year;
    let time;
    let selectedDate; 
    if (dueDate) {
      selectedDate = new Date(dueDate);
    } else {
      selectedDate = new Date();
      selectedDate.setDate(selectedDate.getDate() + 1);
    }
    time = this.getTime(dueDate);
    date = selectedDate.getDate();
    month = selectedDate.getMonth();
    year = selectedDate.getFullYear();
    selectedDate = `${selectedDate.getMonth()+1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;

    this.state = { dueDate, time, selectedDate, date, month, year };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.setRef = this.setRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
    this.validateTime = this.validateTime.bind(this);
  }

  setRef(node) {
    this.containerRef = node;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);
    document.addEventListener('mousedown', this.handleClickOutside);
    this.containerRef.focus();
  }

  componentDidUpdate() {
    const prevSelected = document.getElementsByClassName('calendar-selected');
    const dateEls = this.state.selectedDate.split('/');
    if ( prevSelected.length > 0 && (this.state.year !== parseInt(dateEls[2]) || this.state.month !== (parseInt(dateEls[0])-1)) ) {
      // debugger;
      prevSelected[0].classList.remove('calendar-selected');
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }


  escFunction(e) {
    if(e.keyCode === 27) {
      this.props.toggleModal("DateTimePicker");
    }
  }

  handleClickOutside(e) {
    if (this.containerRef && !this.containerRef.contains(e.target)) {
      this.props.toggleModal("DateTimePicker");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const updatedCard = {
      id: this.props.card.id,
      due_date: new Date(this.state.selectedDate + ' ' + this.state.time).toISOString(),
    };
    // debugger;
    this.props.updateCard(updatedCard);
    this.props.toggleModal("DateTimePicker");
  }

  update(field) {
    return e => {
      e.preventDefault();
      let val;
      if (isNaN(e.target.value)) {
        val = e.target.value;
      } else {
        if (e.target.id === "time-input")
          val = e.target.value;
        else 
          val = parseInt(e.target.value);
      }
      this.setState({[field]: val});
    };
  }

  getTime(iso8601Date) {
    if (!iso8601Date)
      return '12:00 PM';
    let date = new Date(iso8601Date);
    let postfix = 'AM';
    let hour = date.getHours();
    if (hour > 12) {
      hour -= 12;
      postfix = 'PM';
    }
    if (hour === 12)
      postfix = 'PM';
    let minutes = date.getMinutes().toString().padStart(2,'0');
    let time = `${hour}:${minutes} ${postfix}`;
    return time;
  }

  validateTime(e) {
    e.preventDefault();
    const isValid = this.isValidTime(e.target.value);
    if (!isValid) {
      let time;
      if (this.state.dueDate)
        time = this.getTime(this.state.dueDate);
      else
        time = '12:00 PM';
      this.setState({ time });
    }
    console.log(isValid);
  }

  isValidTime(str) {
    const timeRegex = /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/;
    return str.match(timeRegex);
  }

  handleSelect(e) {
    e.preventDefault();
    const prevSelected = document.getElementsByClassName('calendar-selected');
    if (prevSelected.length > 0) {
      prevSelected[0].classList.remove('calendar-selected');
    }
    const stateDate = `${this.state.month+1}/${e.target.value}/${this.state.year}`;
    this.setState({ selectedDate: stateDate });
    e.currentTarget.classList.add('calendar-selected');
    
  }

  renderMonthPicker() {
    return (
      <select onChange={this.update('month')} value={this.state.month}>
        <option value={0}>{this.months[0]}</option>
        <option value={1}>{this.months[1]}</option>
        <option value={2}>{this.months[2]}</option>
        <option value={3}>{this.months[3]}</option>
        <option value={4}>{this.months[4]}</option>
        <option value={5}>{this.months[5]}</option>
        <option value={6}>{this.months[6]}</option>
        <option value={7}>{this.months[7]}</option>
        <option value={8}>{this.months[8]}</option>
        <option value={9}>{this.months[9]}</option>
        <option value={10}>{this.months[10]}</option>
        <option value={11}>{this.months[11]}</option>
      </select>
    );
  }

  renderYearPicker() {
    const selectedYear = this.state.year;
    const years = [];
    for (let i = 0; i <= 20; i++) {
      years.push(selectedYear - 10 + i);
    }
    const yearOptions = years.map(year => {
      return <option key={year} value={year} >{year}</option>;
    });
    return (
      <select value={selectedYear} onChange={this.update('year')}>
        {yearOptions}
      </select>
    );
  }

  handleChangeMonth(forward) {
    const that = this;
    return (e) => {
      e.preventDefault();
      if (forward) {
        if (that.state.month === 11) {
          that.setState({ year: that.state.year+1, month: 0 });
        } else {
          that.setState({ month: that.state.month+1});
        }
      } else {
        if (that.state.month === 0) {
          that.setState({year: that.state.year-1, month: 11});
        } else {
          that.setState({ month: that.state.month-1});
        }
      }
    };
  }

  renderCalendar() {
    const date = new Date();
    date.setFullYear(this.state.year);
    date.setMonth(this.state.month);
    date.setDate(1);
    const firstWeekday = date.getDay();
    const rows = [];
    while (date.getMonth() === this.state.month) {
      const row = [];
      if (date.getDate() === 1) {
        for (let i=0; i < firstWeekday; i++) {
          row.push(<td className="empty-cal"></td>);
        }
      }
      while (row.length < 7) {
        if (date.getMonth() !== this.state.month)
          row.push(<td className="empty-cal"></td>);
        else {
          let selectedClass = '';
          if (date.getDate() === this.state.date) 
            selectedClass = 'calendar-selected';
          let todayClass = '';
          let today = new Date();
          if (date.getYear() === today.getYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
            todayClass = 'is-today';
          }
          row.push(
          <td onClick={this.handleSelect} className={selectedClass}>
            <button value={date.getDate()} onClick={this.update('date')} className={todayClass}>
              {date.getDate()}
            </button>
          </td>
          );
          date.setDate(date.getDate() + 1);
        }
      }
      rows.push(<tr>{row}</tr>);
    }
    return (
      <tbody>
        {rows}
      </tbody>
    );
  }

  render() {
    console.log(this.state);
    return (
      <div ref={this.setRef}
      className="dt-container">
        <div className="dt-title">
          <span>Change Due Date</span>
          <img className="close-dt"
          onClick={() => this.props.toggleModal("DateTimePicker")}
          src={window.closeIcon} />
        </div>
        <form className="dt-picker">
          <div className="dt-header">
            <div className="dt-input">
              <label htmlFor="date-input">Date</label>
              <input id="date-input"
                    type="text" 
                    value={this.state.selectedDate} 
                    onChange={this.update('fullDate')}/>
            </div>
            <div className="dt-input">
              <label htmlFor="time-input">Time</label>
              <input id="time-input" 
                    type="text"
                    value={this.state.time}
                    onBlur={this.validateTime}
                    onChange={this.update('time')}/>
            </div>
          </div>
            <div className="dt-calendar">
              <div className="dt-calendar-header">
                <button onClick={this.handleChangeMonth(false)}>Prev</button>
                <div>
                  {this.renderMonthPicker()}
                  {this.renderYearPicker()}
                </div>
                <button onClick={this.handleChangeMonth(true)}>Next</button>
              </div>
              <table className="calendar">
                <thead>
                  <tr>
                    <th>Su</th>
                    <th>Mo</th>
                    <th>Tu</th>
                    <th>We</th>
                    <th>Th</th>
                    <th>Fr</th>
                    <th>Sa</th>
                  </tr>
                </thead>
                {this.renderCalendar()}
              </table>
            </div>
            <div className="dt-buttons">
              <input className="green-submit-button" type="submit" value="Save" onClick={this.handleSubmit}/>
            </div>
        </form>
      </div>
    );
  }
}