class Api::BoardsController < ApplicationController

  def index
    @boards = Board.includes(:users).where(owner_id: params[:user_id])
    # debugger
  end

  def create
    @board = Board.new(board_params)
    if @board.save
      render :show
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  def update
    @board = Board.find(params[:id])
    if @board.update(board_params)
      render :show
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  def destroy
    @board = Board.find(params[:id])
    if @board.destroy
      render :show
    else
      render json: ["Board does not exist"], status: 422
    end
  end

  private
  def board_params
    params.require(:board).permit(:title, :starred, :owner_id)
  end
end