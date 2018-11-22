json.extract! card, :id, :title, :position, :list_id, :due_date, :description
json.board_id card.board.id
json.commentIds card.comments.ids
