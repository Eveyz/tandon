class V1::AuthenticationController < ApplicationController
  before_action :authorize_request, except: :login

  def login
    @user = User.find_by(email: params[:email])
    if @user&.valid_password?(params[:password])
      time = Time.now + 24.hours.to_i
      token = JsonWebToken.encode(user_id: @user._id, exp: time, identity: @user.identity)
      render json: {
        token: token,
        email: @user.email
      }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  private

  def login_params
    params.permit(:email, :password)
  end

end
