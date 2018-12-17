class Api::CardsController < ApplicationController

  def index
    @cards = Card.includes(:comments).where(list_id: params[:list_id])
  end

  def create
    @card = Card.new(card_params)
    if card_params.has_key?(:position)
      other_cards = cards_with_higher_pos(card_params[:list_id], card_params[:position].to_i-1)
      other_cards.each do |card|
        card.position += 1;
        card.save
      end
    end
    if @card.save
      render :show
    else
      render json: @card.errors.full_messages, status: 422
    end
  end

  def show
    @card = Card.find(params[:id])
  end

  def update
    @card = Card.find(params[:id])
    if card_params.has_key?(:position)
      if card_params[:list_id].to_i == @card[:list_id]
        update_other_cards(@card, card_params[:position].to_i)
      else
        prepare_other_cards(card_params, @card)
      end
    end

    if @card.update(card_params)
      render :show
    else
      render json: @card.errors.full_messages, status: 422
    end
  end

  def destroy
    @card = Card.find(params[:id])
    if @card.destroy
      render :show
    else
      render json: ["Card does not exist"], status: 422
    end
  end

  private
  def card_params
    params.require(:card).permit(:title, :position, :list_id, :description)
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

  def cards_with_higher_pos(list_id, position)
    Card.where("list_id = ? AND position > ?", list_id, position).sort{ |x,y| x.position <=> y.position }
  end

end
