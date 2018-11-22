class Api::UsersController < ApplicationController

  def search
    @users = User.where('name ILIKE :search OR username ILIKE :search OR email ILIKE :search', search: "%#{params[:search]}%")
    render :index
  end

  def index
    @users = User.includes(:shared_boards).where(board_shares: {board_id: params[:board_id]})
  end

  def create
    @user = User.new(new_user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(edit_user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      render :show
    else
      render json: ["User does not exist"], status: 422
    end
  end


  private
  def new_user_params
    params.require(:user).permit(:name, :email, :password)
  end

  def edit_user_params
    params.require(:user).permit(:name, :username, :email, :initials, :password, :avatar_url, :bio)
  end

  def search_user_params
    params.require(:user).permit(:name, :username, :email)
  end

end
