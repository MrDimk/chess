const COLORS = {
  white: '#fbfbfb',
  whiteShadow: '#d2d2d2',
  black: '#828282',
  blackShadow: '#363636',
};

const TYPES = {
  pawn: `<svg stroke-miterlimit="10"
  style="fill-rule:nonzero;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round" viewBox="0 0 180 180"
  xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:vectornator="http://vectornator.io">
  <g vectornator:layerName="Слой 1" fill-rule="evenodd">
    <path
      d="M60.913 39.187c0-17.438 14.313-31.574 31.968-31.574 17.656 0 31.968 14.136 31.968 31.574 0 17.438-14.312 31.574-31.968 31.574-17.655 0-31.968-14.136-31.968-31.574Z"
      fill="#fbfbfb" />
    <path
      d="M66.953 21.103c-3.769 5.18-6.04 11.468-6.04 18.334 0 17.437 14.321 31.598 31.976 31.598 8.552 0 16.264-3.387 22.001-8.79-.784.04-1.525.217-2.319.217-24.19 0-43.773-18.239-45.618-41.36Z"
      fill="#d2d2d2" />
    <path d="m76.081 64.62 35.227.11 27.134 80.098H52.936L76.08 64.619Z" fill="#d2d2d2" />
    <path d="m84.427 145.135 54.015-.307-26.89-79.168L93.81 79.03l-9.383 66.105Z" fill="#fbfbfb" />
    <path d="m33.974 144.828 122.334.016v27.543l-122.334-.016v-27.543Z" fill="#fbfbfb" />
    <path d="M33.974 144.828h43.891v27.543H33.974v-27.543Z" fill="#d2d2d2" />
  </g>
</svg>`
};

class Figure {
  constructor(type, color) {
    this.element = document.createElement('div');
    this.element.classList.add(`figure__${type}`);
    this.element.classList.add(`figure__${type}--${color}`);
  }
  appendTo(node) {
    node.append(this.element);
  }
}

// const p1 = new Figure('pawn', 'red');
// console.log(p1);
// p1.appendTo(document.querySelector('.cell'));
// p1.element.insertAdjacentHTML('beforeend', TYPES.pawn);
