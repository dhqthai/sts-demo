class Api::V1::UsersController < ApplicationController

  def index
    render json: {
        users: User.all
    }
  end

  def create
    user = User.create!(user_params)

    render json: {
        user: user
    }
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
