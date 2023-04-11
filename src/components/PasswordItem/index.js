import './index.css'

const PasswordItem = props => {
  const {passwordDetails, PassWordsAreVisible, deletePasswordItem} = props
  const {
    websitename,
    username,
    password,
    randomBgColorclassName,
    id,
  } = passwordDetails
  const firstletter = username[0].toUpperCase()

  const onDeletePasswordItem = () => {
    // console.log('fff')
    deletePasswordItem(id)
  }

  const renderMaskedPassword = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="masked-stars-img"
    />
  )

  const renderUnMaskedPassWord = () => (
    <p className="password-text">{password}</p>
  )

  return (
    <li className="password-item-container">
      <div className="passwd-firstLetter-and-details-container">
        <p className={`profile-first-letter ${randomBgColorclassName}`}>
          {firstletter}
        </p>
        <div className="password-details-container">
          <p className="domain-name">{websitename}</p>
          <p className="user-name">{username}</p>
          {PassWordsAreVisible
            ? renderUnMaskedPassWord()
            : renderMaskedPassword()}
        </div>
      </div>
      <button
        type="button"
        data-testid="delete"
        className="delete-btn"
        onClick={onDeletePasswordItem}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}
export default PasswordItem
