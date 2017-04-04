function setUpToggleButton([...items]) {
  for (const item of items) {
    document.querySelector(item.button).onclick = () => {
      document.body.classList.toggle(item.modifier)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setUpToggleButton([
    { button: '.aigis-toggleNav', modifier: 'aigis--navclose' },
    { button: '.aigis-toggleCode', modifier: 'aigis--codeclose' },
  ])
})