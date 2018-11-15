@boards.each do |board|
  json.set! boards do
    json.partial! 'api/boards/board', board: board
  end
end
