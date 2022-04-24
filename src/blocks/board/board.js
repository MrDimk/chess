const CONFIG = {
  cellTypes: ['dark', 'light'], // "a1" cell on the checkerboard is dark, so the order of types matters
  style: {
    background: {
      dark: '#517467',
      light: '#ade2b3',
    }
  },
  size: 8, // number of cells on one side of the square board
  isPlayingWhite: true
};

class Cell {
  #type; // dark or light, or it may be any other types for different logic then chess board
  #coordinateX;
  #coordinateY;
  #content;
  isEmpty = true;
  #id;
  element;

  constructor(type, coordinateX, coordinateY) {
    this.#type = type;
    this.#coordinateX = coordinateX;
    this.#coordinateY = coordinateY;
  }

  setType(type) {
    this.#type = type;
  }

  setContent(content) {
    this.#content = content; // need to add type verification later...
    this.isEmpty = false;
  }

  getContent() {
    return this.isEmpty ? null : this.#content;
  }

  removeContent() {
    this.isEmpty = true;
    this.#content = null;
  }

  getType() {
    return this.#type;
  }

  getCoordinates() {
    return {
      x: this.#coordinateX,
      y: this.#coordinateY
    };
  }
}

class Board {
  #cells;
  #config;
  #boardBlock;
  #isPlayingWhite = true;

  constructor(config) {
    this.#config = config;
    this.#cells = new Array(config.size);
    for (let row = 0; row < this.#config.size; row++) {
      this.#cells[row] = new Array(config.size);
      for (let column = 0; column < this.#config.size; column++) {
        this.#cells[row][column] = new Cell(this.followPattern(column, row), column, row);
      }
    }
    this.#cells.reverse(); // When playing white, "a1" cell is in the left-bottom corner of the checkerboard
    if (!config.isPlayingWhite) {
      this.transposeBoard();
    }
  }

  followPattern(x, y) {
    return this.#config.cellTypes[(x + y) % this.#config.cellTypes.length];
  }

  transposeBoard() {
    this.#cells.reverse();
    this.#cells.forEach((row) => row.reverse());
    this.#isPlayingWhite = !this.#isPlayingWhite;
  }

  #addLabels(cell) {
    const createColumnLabel = (labelSide) => {
      const columnLabel = document.createElement('span');
      columnLabel.textContent = 'abcdefgh'[cell.getCoordinates().x];
      columnLabel.classList.add('column-label');
      columnLabel.classList.add(`${labelSide}-label`);
      cell.element.append(columnLabel);
      // return cell.querySelector('span.column-label');
    }
    const createRowLabel = (labelSide) => {
      const rowLabel = document.createElement('span');
      rowLabel.textContent = `${cell.getCoordinates().y + 1}`;
      rowLabel.classList.add('row-label');
      rowLabel.classList.add(`${labelSide}-label`);
      cell.element.append(rowLabel);
      // return cell.querySelector('span.row-label');
    }
    const x = cell.getCoordinates().x;
    const y = cell.getCoordinates().y;
    if ((x === 0 && this.#isPlayingWhite) || (x === this.#config.size - 1 && !this.#isPlayingWhite)) {
      createRowLabel('left');
    }
    if ((x === 0 && !this.#isPlayingWhite) || (x === this.#config.size - 1 && this.#isPlayingWhite)) {
      createRowLabel('right');
    }
    if ((y === 0 && this.#isPlayingWhite) || (y === this.#config.size - 1 && !this.#isPlayingWhite)) {
      createColumnLabel('bottom');
    }
    if ((y === 0 && !this.#isPlayingWhite) || (y === this.#config.size - 1 && this.#isPlayingWhite)) {
      createColumnLabel('top');
    }
  }

  renderInDOM() {
    this.#boardBlock = document.createElement('ul');
    this.#boardBlock.classList.add('game__board');
    this.#boardBlock.classList.add(this.#isPlayingWhite ? 'playing-white' : 'playing-black');
    this.#boardBlock.style.display = 'grid';
    this.#boardBlock.style.gridTemplateColumns = `${' 1fr'.repeat(this.#config.size)}`;
    this.#boardBlock.style.gridTemplateRows = `${' 1fr'.repeat(this.#config.size)}`;
    console.log(this.#boardBlock.style.gridTemplateRows);
    this.#boardBlock.style.display = 'grid';
    this.#cells.forEach((row) => {
      row.forEach((cell) => {
        cell.element = document.createElement('li');
        cell.element.classList.add('game__board-cell');
        cell.element.classList.add(`cell-${cell.getType()}`);
        cell.element.style.background = this.#config.style.background[cell.getType()];
        // cell.element.textContent = `x=${cell.getCoordinates().x}, y=${cell.getCoordinates().y}`;
        cell.element.id = (`${'abcdefgh'[cell.getCoordinates().x]}${cell.getCoordinates().y + 1}`);
        this.#boardBlock.append(cell.element);

        this.#addLabels(cell);
        // if (cell.getCoordinates().y === 0 || cell.getCoordinates().y === this.#config.size - 1) {
        //   const columnLabel = document.createElement('span');
        //   columnLabel.textContent = 'abcdefgh'[cell.getCoordinates().x];
        //   columnLabel.classList.add('column-label');
        //   columnLabel.classList.add(`${cell.getCoordinates().y === 0 ? 'top-label' : 'bottom-label'}`);
        //
        //   cell.element.append(columnLabel);
        // }
        //
        // if (cell.getCoordinates().x === 0 || cell.getCoordinates().x === this.#config.size - 1) {
        //   const rowLabel = document.createElement('span');
        //   rowLabel.textContent = (cell.getCoordinates().y + 1).toString();
        //   rowLabel.classList.add('row-label');
        //   rowLabel.classList.add(`${cell.getCoordinates().x === 0 ? 'right-label' : 'left-label'}`);
        //   cell.element.append(rowLabel);
        // }
      });
    });
    return this.#boardBlock;
  }

  getBoardBlock() {
    return this.#boardBlock ? this.#boardBlock : () => {
      console.log('renderInDom first!');
      return null;
    };
  }

  getCellContent(x, y) {
    return this.#cells[x + y * this.#config.size];
  }
}

export {CONFIG, Board};