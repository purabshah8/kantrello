class Api::CardsController < ApplicationController

  def index
    # use this when comments feature exists
    # @cards = Card.includes(:comments).where(:list_id params[:list_id])
    @cards = Card.where(list_id: params[:list_id])
  end

  def create
    @card = Card.new(card_params)
    if @card.save
      render :show
    else
      render json: @card.errors.full_messages, status: 422
    end
  end

  def update
    @card = Card.find(params[:id])
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
    params.require(:card).permit(:title, :position, :list_id)
  end

end
