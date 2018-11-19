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
    if list_params.has_key?(:position)
      update_other_lists(@list, list_params[:position].to_i)
    end

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

  def update_other_lists(current_list, new_pos)
    old_pos = current_list.position

    # if old_pos > new_pos
    #   from = new_pos
    #   to = old_pos-1
    # else
    #   from = old_pos+1
    #   to = new_pos
    # end
    from = (old_pos > new_pos) ? new_pos : old_pos + 1;
    to = (old_pos > new_pos) ? old_pos - 1 : new_pos;
    current_list.update(position: 0)
    other_lists = List.where(board_id: current_list[:board_id], position: from..to)
    other_lists = (old_pos > new_pos) ? other_lists.sort { |x,y| y.position <=> x.position } : other_lists.sort { |x,y| x.position <=> y.position };

    # p other_lists.map { |list| list.position }
    other_lists.each do |list|
      # p "#{list.title}, old position: #{list.position}"
      if old_pos < new_pos
        list.position -= 1
      else
        list.position += 1
      end
      list.save
      # p "#{list.title}, new position: #{list.position}"
    end
  end
end
