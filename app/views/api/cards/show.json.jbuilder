json.card do
  json.partial! 'api/cards/card', card: @card
end
json.comments do  
  @card.comments.each do |comment|
    json.set! comment.id do
      json.partial! 'api/comments/comment', comment: comment
    end
  end
end
