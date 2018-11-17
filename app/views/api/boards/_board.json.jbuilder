userIds = board.users.ids
userIds << board.owner_id
json.userIds userIds
json.extract! board, :id, :title, :starred, :owner_id
