class Api::ListsController < ApplicationController

  def index
    @lists = List.includes(:cards).where(board_id: params[:board_id])
  end

  def create
    @list = List.new(list_params)
    if @list.save
      render :show
    else
      render json: @list.errors.full_messages, status: 422
    end
  end

  def update
    @list = List.find(params[:id])
    if @list.update(list_params)
      render :show
    else
      render json: @list.errors.full_messages, status: 422
    end
  end

  def destroy
    @list = List.find(params[:id])
    if @list.destroy
      render :show
    else
      render json: ["List does not exist"], status: 422
    end
  end

  private
  def list_params
    params.require(:list).permit(:title, :position, :board_id)
  end
end
