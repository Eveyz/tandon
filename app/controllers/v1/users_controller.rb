class V1::UsersController < ApplicationController
  before_action :authorize_request, except: :create
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  def index
    @users = User.all
  end

  # GET /users/{username}
  def show
  end

  def edit
  end

  # POST /users
  def create
    @user = User.new(user_params)
    p @user

    if @user.save
      time = Time.now + 24.hours.to_i
      token = JsonWebToken.encode(user_id: @user._id, exp: time, identity: @user.identity)
      render json: {
        token: token,
        email: @user.email
      }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end

    # respond_to do |format|
    #   if @user.save
    #     format.html { redirect_to @user, notice: 'User was successfully created.' }
    #     format.json { render :show, status: :created, location: @user }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @user.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PUT /users/{username}
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/{username}
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(
      :name, :username, :email, :password, :password_confirmation
    )
  end
end