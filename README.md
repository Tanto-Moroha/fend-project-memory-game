# Memory Game Project

## Table of Contents

* [General information](#general-information)
* [History of project](#history-of-project)
* [Point of start](#point-of-start)
* [Task](#task)
* [About code formatting](#about-code-formatting)
* [Contributing](#contributing)
* [Game manual](#game-manual)

## General information

Memory Game is a browser-based card matching game (also known as Concentration). Cards are arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

## History of project

Memory Game Project is a part of Udacity Front-End Nanodegree Program (know also as FEND).
Check at [Udacity](https://www.udacity.com).

## Point of start

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. Shuffle function in JS file is also given (from http://stackoverflow.com/a/2450976).
You can find the starter code at [GitHub](https://github.com/udacity/fend-project-memory-game).

## Task

My task is to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

## About code formatting

I follow [Udacity Frontend Nanodegree Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide) for HTML, CSS, JavaScript and Git Commit Messages.

## Contributing

I will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Game manual

### General rules

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

Each turn:

* The player flips one card over to reveal its underlying symbol.
* The player then turns over a second card, trying to find the corresponding card with the same symbol.
* If the cards match, both cards stay flipped over.
* If the cards do not match, both cards are flipped face down.

The game ends once all cards have been correctly matched.

### Another remarks

* You can't flip a card which is already face up.
* When you click a second card from a pair, it is counted as "a move".
* The timer runs from a first click on a first card. It stops when last pair of cards is matched.
* Star Rating shows your performance. At the beging it shows 3 stars. After 13 moves it drops to 2 stars and after 15 moves drops to 1 star.
* You can reset a game at any time you want.

_Enjoy!_
