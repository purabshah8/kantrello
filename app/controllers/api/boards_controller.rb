class BoardsController < ApplicationController

  def index
    @boards = Board.find_by(owner_id: params[:user_id])
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
    params.require(:board).permit(:title, :starred)
  end
end
