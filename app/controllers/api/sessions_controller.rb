class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user])
    if @user
      login!(@user)
      render '/api/users/show', format: :json
    else
      render json: ["Invalid credentials"], status: 422
    end
  end

  def destroy
    if current_user
      logout!
      render json: {}
    else
      render json: ["404 not found"], status: 404
    end
  end

end
