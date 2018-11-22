class Api::CommentsController < ApplicationController

  def index
    @comments = Comment.includes(:user).where(card_id: params[:card_id])
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update(edit_comment_params)
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment.destroy
      render :show
    else
      render json: ["Comment does not exist"], status: 422
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :user_id, :card_id)
  end

  def edit_comment_params
    params.require(:comment).permit(:body)
  end
end
