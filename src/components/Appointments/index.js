import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {list: [], title: '', date: '', star: false}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title.length !== 0 && date.length !== 0) {
      const newAppointment = {
        id: uuidv4(),
        title,
        date,
        isLike: false,
      }

      this.setState(prevState => ({
        list: [...prevState.list, newAppointment],
        title: '',
        date: '',
      }))
    } else {
      alert('Please enter the valid Details')
    }
  }

  isToggle = id => {
    this.setState(prevState => ({
      list: prevState.list.map(each => {
        if (each.id === id) {
          return {...each, isLike: !each.isLike}
        }
        return each
      }),
    }))
  }

  onClickStar = () => {
    const {star} = this.state
    this.setState({star: !star})
  }

  isFiltered = () => {
    const {list, star} = this.state
    if (star) {
      return list.filter(each => each.isLike)
    }
    return list
  }

  render() {
    const {title, date, star} = this.state
    const filteredList = this.isFiltered()

    return (
      <div className="main-container">
        <div className="container">
          <div className="con">
            <form className="form" onSubmit={this.addAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                className="input"
                value={title}
                onChange={this.onChangeTitle}
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                id="date"
                type="date"
                className="input"
                placeholder="dd/mm/yyyy"
                value={date}
                onChange={this.onChangeDate}
              />
              <button type="submit" className="button1">
                Add
              </button>
            </form>
            <div className="ImgCon">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="hr" />
          <div className="con1">
            <h1 className="appoint">Appointments</h1>
            <button
              className={!star ? 'starred' : 'star'}
              type="button"
              onClick={this.onClickStar}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list">
            {filteredList.map(each => (
              <AppointmentItem
                details={each}
                key={each.id}
                isLiked={this.isToggle}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
