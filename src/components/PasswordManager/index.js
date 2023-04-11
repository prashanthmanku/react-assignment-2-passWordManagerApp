import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const bgcolorsList = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7']

let initialpassWordsList = JSON.parse(localStorage.getItem('passwordsList'))

if (initialpassWordsList === null) {
  initialpassWordsList = []
}

class PasswordManager extends Component {
  state = {
    PassWordsAreVisible: false,
    websitename: '',
    username: '',
    password: '',
    passwordsList: initialpassWordsList,
    searchInput: '',
  }

  onChangeWebsiteName = event => {
    this.setState({websitename: event.target.value})
  }

  onChangeUserName = e => {
    this.setState({username: e.target.value})
  }

  onChangePasssword = e => {
    this.setState({password: e.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    let {username, websitename, password} = this.state
    const {passwordsList} = this.state
    username = username.trim()
    websitename = websitename.trim()
    password = password.trim()
    if (password !== '' && websitename !== '' && username !== '') {
      const randomBgColorclassName =
        bgcolorsList[Math.ceil(Math.random() * (bgcolorsList.length - 1))]
      const newpassword = {
        id: v4(),
        websitename,
        username,
        password,
        randomBgColorclassName,
      }
      this.setState({
        passwordsList: [...passwordsList, newpassword],
        websitename: '',
        username: '',
        password: '',
        searchInput: '',
      })
    }
  }

  checkboxToggled = e => {
    if (e.target.checked) {
      this.setState({PassWordsAreVisible: true})
    } else {
      this.setState({PassWordsAreVisible: false})
    }
  }

  deletePasswordItem = id => {
    const {passwordsList} = this.state
    console.log(id)
    this.setState({passwordsList: passwordsList.filter(each => each.id !== id)})
  }

  getfilterList = () => {
    let {searchInput} = this.state

    const {passwordsList} = this.state
    searchInput = searchInput.trim().toLowerCase()
    const list = passwordsList.filter(each =>
      each.websitename.toLowerCase().includes(searchInput),
    )
    return list
  }

  renderNoPasswordsView = () => (
    <div className="no-password-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-img"
      />
      <p className="no-passwords-text">No Passwords</p>
    </div>
  )

  renderMaskedShowPasswordView = list => {
    const {PassWordsAreVisible} = this.state

    return (
      <ul className="passwords-lists-container">
        {list.map(each => (
          <PasswordItem
            passwordDetails={each}
            key={each.id}
            PassWordsAreVisible={PassWordsAreVisible}
            deletePasswordItem={this.deletePasswordItem}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {
      passwordsList,
      websitename,
      username,
      password,
      searchInput,
    } = this.state

    localStorage.setItem('passwordsList', JSON.stringify(passwordsList))

    const paswordsListLength = passwordsList.length
    const searchedFilteredList =
      paswordsListLength > 0 ? this.getfilterList() : passwordsList

    const filteredpaswordsListCount = searchedFilteredList.length
    return (
      <div className="app-bg-container">
        <div className="app-width-container ">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo-img"
          />

          <div className="password-manager-top-card">
            <div className="passward-manager-top-img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                className="sm-passwordManager-img"
                alt="password manager"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
                className="lg-passwordManager-img"
                alt="password manager"
              />
            </div>

            <div className="input-form-container">
              <h1 className="form-input-heading">Add New Password</h1>
              <form onSubmit={this.onAddPassword}>
                <div className="enter-website-input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                    alt="website"
                    className="web-icon"
                  />
                  <hr />
                  <input
                    type="text"
                    className="web-input-el"
                    placeholder="Enter Website"
                    value={websitename}
                    onChange={this.onChangeWebsiteName}
                  />
                </div>
                <div className="enter-website-input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="web-icon"
                  />
                  <hr />
                  <input
                    type="text"
                    className="web-input-el"
                    placeholder="Enter Username"
                    value={username}
                    onChange={this.onChangeUserName}
                  />
                </div>
                <div className="enter-website-input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="web-icon"
                  />
                  <hr />
                  <input
                    type="password"
                    className="web-input-el"
                    placeholder="Enter Password"
                    value={password}
                    onChange={this.onChangePasssword}
                  />
                </div>
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>
          </div>
          <div className="password-manager-bottom-card">
            <div className="passwords-card">
              <div className="heading-container">
                <div className="your-password-text-container">
                  <h1 className="your-psswd-text">Your Passwords</h1>
                  <p className="passwd-count">{filteredpaswordsListCount}</p>
                </div>
                <div className="enter-search-input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-icon"
                  />
                  <hr className="hr-search-input" />
                  <input
                    type="search"
                    className="search-input-el"
                    placeholder="Search"
                    value={searchInput}
                    onChange={this.onChangeSearchInput}
                  />
                </div>
              </div>
              <div className="show-passwd-checkbox-container">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="checkbox"
                  name="checkbox"
                  onChange={this.checkboxToggled}
                />
                <label htmlFor="checkbox" className="label">
                  Show Passwords
                </label>
              </div>
              {filteredpaswordsListCount < 1
                ? this.renderNoPasswordsView()
                : this.renderMaskedShowPasswordView(searchedFilteredList)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
