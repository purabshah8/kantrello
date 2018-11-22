json.extract! board, :id, :title, :starred, :owner_id
userIds = board.users.ids
json.userIds userIds
json.listIds board.lists.ids
boardShareIds = []
board.board_shares.each do |bs|
  boardShareIds << {bs.user_id => bs.id}
end
json.boardShareIds boardShareIds
