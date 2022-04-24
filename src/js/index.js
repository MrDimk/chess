import '../scss/main.scss';
import '../blocks/figures/pawn.js';
// import '../blocks/board/board.js';
import { startTimer } from './utils.js';
import {CONFIG, Board} from "../blocks/board/board";

const gameBoardContainer = document.querySelector('.game');
console.log('its alive!');

const board = new Board(CONFIG);
gameBoardContainer.append(board.renderInDOM());

