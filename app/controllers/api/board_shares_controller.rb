class Api::BoardSharesController < ApplicationController

  def create
    @board_share = BoardShare.new(board_share_params)

    if @board_share.save
      @board = Board.find(board_share_params[:board_id])
      render 'api/boards/show'
    else
      render json: @board_share.errors.full_messages, status: 422
    end
  end


  def destroy
    @board_share = BoardShare.find(params[:id])
    if @board_share.destroy
      @board = Board.find(@board_share[:board_id])
      render 'api/boards/show'
    else
      render json: ["Board share does not exist"], status: 422
    end
  end

  private
  def board_share_params
    params.require(:board_share).permit(:board_id, :user_id)
  end

end
