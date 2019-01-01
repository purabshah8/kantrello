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

### Lists & Cards

A full featured kanban board would not be complete without the ability to move lists & cards around. Movement can be done using menus or drag-n-drop.

![Drag-n-Drop](https://media.giphy.com/media/1wXeQcpCiLlhuvTmVx/giphy.gif)

To move positions, the backend must update the database with new positions for all affected cards or lists. The controller handles all the required logic to accomplish this:

```ruby
def update
  @card = Card.find(params[:id])
  if card_params.has_key?(:position)
    if card_params[:list_id].to_i == @card[:list_id]
      update_other_cards(@card, card_params[:position].to_i)
    else
      prepare_other_cards(card_params, @card)
    end
  end

  ...
end

def update_other_cards(current_card, new_pos)
  old_pos = current_card.position

  from = (old_pos > new_pos) ? new_pos : old_pos + 1;
  to = (old_pos > new_pos) ? old_pos - 1 : new_pos;
  current_card.update(position: 0)
  other_cards = Card.where(list_id: current_card[:list_id], position: from..to)
  other_cards = (old_pos > new_pos) ? other_cards.sort { |x,y| y.position <=> x.position } : other_cards.sort { |x,y| x.position <=> y.position };

  other_cards.each do |card|
    if old_pos < new_pos
      card.position -= 1
    else
      card.position += 1
    end
    card.save
  end
end

def prepare_other_cards(card_params, card)
  new_pos = card_params[:position].to_i
  other_cards = cards_with_higher_pos(card_params[:list_id], new_pos - 1).sort{ |x,y| y.position <=> x.position }
  other_cards.each do |card|
    card.position += 1
    card.save
  end

  other_other_cards = cards_with_higher_pos(card[:list_id], card[:position])
  card.update(position: 0)
  other_other_cards.each do |card|
    card.position -= 1
    card.save
  end

end

```

### Sharing & Starring Boards

Boards are the main context of Kantrello. Boards can be starred for easy access at the top of the main page. Boards may also be shared with other users who can also view and edit those boards. 

![Search Demo](https://media.giphy.com/media/8lZkA2qATS03QFSg1g/giphy.gif)


This feature requires searching the database and returning live results as you type. The call to search is only sent to the backend once 3 characters are typed as seen below:

```js
  callSearch() {
    if (this.state.search.length < 3 || this.state.newSharedUser === this.state.search)
      this.renderedSearch = null;
    else {
      searchUsers(this.state.search).then(this.renderSearch);
    }
  }

```

### Comments

Board users can comment on cards. Comments may be deleted or modified after creation.