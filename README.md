# Kantrello

[Live Site](https://kantrello.herokuapp.com)


## Description

Kantrello is a full-stack trello clone. Users can create, edit and view boards. Boards contain lists & lists contain cards that have tasks to perform, which can be move from list to list within a board, simulating a pipeline.

## Technologies Used

* React
* Redux
* JavaScript
* Ruby on Rails
* PostgreSQL
* Webpack
* react-beautiful-dnd
* showdown


## Features

### Sharing & Starring Boards

Boards are the main context of Kantrello. Boards can be starred for easy access at the top of the main page. Boards may also be shared with other users who can also view and edit those boards. This was a slightly complex feature to implement as this also required searching the database and returning live results as you type.

![Search Demo](https://media.giphy.com/media/8lZkA2qATS03QFSg1g/giphy.gif)


### Lists & Cards

A full featured kanban board would not be complete without the ability to move lists & cards around. Movement can be done using menus or  drag-n-drop.

<!-- ![Drag-n-Drop]() -->


### Comments & Due Dates

Board users can comment on cards and set due dates for any card.
