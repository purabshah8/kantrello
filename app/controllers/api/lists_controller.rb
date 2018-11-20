class Api::ListsController < ApplicationController

  def index
    @lists = List.includes(:cards).where(board_id: params[:board_id])
  end

  def create
    @list = List.new(list_params)

    if list_params.has_key?(:position)
      lists_to_update = lists_with_higher_pos(@list[:board_id], @list[:position])
      lists_to_update.each do |list|
        list.position += 1
        list.save
      end
    end

    if @list.save
      render :show
    else
      render json: @list.errors.full_messages, status: 422
    end
  end

  def update
    @list = List.find(params[:id])
    if list_params.has_key?(:position)
      if list_params[:board_id].to_i == @list[:board_id]
        update_other_lists(@list, list_params[:position].to_i)
      else
        prepare_other_lists(list_params, @list)
      end
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
      lists_to_update = lists_with_higher_pos(@list[:board_id], @list[:position])
      lists_to_update.each do |list|
        list.position -= 1
        list.save
      end
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

    from = (old_pos > new_pos) ? new_pos : old_pos + 1;
    to = (old_pos > new_pos) ? old_pos - 1 : new_pos;
    current_list.update(position: 0)
    other_lists = List.where(board_id: current_list[:board_id], position: from..to)
    other_lists = (old_pos > new_pos) ? other_lists.sort { |x,y| y.position <=> x.position } : other_lists.sort { |x,y| x.position <=> y.position };

    other_lists.each do |list|
      if old_pos < new_pos
        list.position -= 1
      else
        list.position += 1
      end
      list.save
    end
  end

  def prepare_other_lists(list_params, list)
    new_pos = list_params[:position].to_i
    other_lists = lists_with_higher_pos(list_params[:board_id], new_pos - 1).sort{ |x,y| y.position <=> x.position }
    other_lists.each do |list|
      list.position += 1
      list.save
    end

    other_other_lists = lists_with_higher_pos(list[:board_id], list[:position])
    list.update(position: 0)
    other_other_lists.each do |list|
      list.position -= 1
      list.save
    end

  end

  # def prepare_other_lists(board_id, new_pos)
  #   other_lists = lists_with_higher_pos(board_id, new_pos-1).sort{ |x,y| y.position <=> x.position }
  #   p other_lists
  #   # debugger
  #   other_lists.each do |list|
  #     list.position += 1
  #     list.save
  #   end
  # end

  def lists_with_higher_pos(board_id, position)
    List.where("board_id = ? AND position > ?", board_id, position).sort{ |x,y| x.position <=> y.position }
  end
end
