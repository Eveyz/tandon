Rails.application.routes.draw do
  root 'welcome#main'
  
  namespace :api, defaults: { format: 'json' } do
    resources :patients
    resources :concepts
  end

  devise_for :users, controllers: { sessions: 'users/sessions' }
  devise_for :users, controllers: { registrations: 'users/registrations' }
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  match "*path", to: "welcome#main", via: :all

end
