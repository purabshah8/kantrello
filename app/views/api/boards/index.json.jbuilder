@boards.each do |board|
  user_ids = []
  board.users.each do |user|
    user_ids << user.id
  end
  user_ids << board.owner_id
  json.set! board.id do
    json.partial! 'api/boards/board', board: board
    json.userIds user_ids
  end
end
