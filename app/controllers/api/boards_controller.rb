class Api::BoardsController < ApplicationController

  def index
    @boards = Board.joins(:users, :lists).where('owner_id = :user OR users.id = :user', user: params[:user_id]).distinct
  end

  def create
    @board = Board.new(board_params)
    if @board.save
      render :show
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  def show
    @board = Board.includes(:users).find(params[:id])
  end

  def update
    @board = Board.includes(:users).find(params[:id])
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
