json.extract! card, :id, :title, :position, :list_id, :due_date, :description
json.board_id card.board.id
# add below when comments feature exists
# json.cardIds card.comments.ids
