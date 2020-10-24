export default class Search {
  // 1. Select DOM elements and keep track of any useful data
  constructor() {
    this.headerSearchIcon = document.querySelector(".header-search-icon")
    // 4. have the constructor call the events
    this.events()
  }
  // 2. Events such as clicking, scrolling, user hitting keys on the keyboard
  events() {
    this.headerSearchIcon.addEventListener("click", (e) => {
      e.preventDefault()
      this.openOverlay()
    })
  }
  //3. Methods
  openOverlay() {
    alert('openOverlay method just ran!!!!')
  }
}
