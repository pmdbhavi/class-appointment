import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {details, isLiked} = props
  const {id, title, date, isLike} = details
  const dated = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const isToggled = () => {
    isLiked(id)
  }

  return (
    <li className="list">
      <div className="titleCon">
        <p className="title">{title}</p>
        <button
          className="star-button"
          type="button"
          data-testid="star"
          onClick={isToggled}
        >
          <img
            src={
              !isLike
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
            }
            alt="star"
          />
        </button>
      </div>
      <p className="date">Date: {dated}</p>
    </li>
  )
}

export default AppointmentItem
