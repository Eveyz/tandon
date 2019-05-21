class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  # before_action :configure_permitted_parameters, if: :devise_controller?

  # protected

  # def configure_permitted_parameters
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :email])

  #   devise_parameter_sanitizer.permit(:sign_in) do |user_params|
  #     user_params.permit(:username, :email, :password, :remember_me)
  #   end
  # end
  
  # private

  # # def after_sign_in_path_for(resource)
  # #   # projects_path(current_user) #your path
  # #   current_user
  # # end

  # def authenticate_user!
  #   if user_signed_in?
  #     super
  #   else
  #     redirect_to root_path, notice: "Please Login to view that page!"
  #   end
  # end

end
