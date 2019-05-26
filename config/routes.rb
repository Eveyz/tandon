Rails.application.routes.draw do
  root 'welcome#main'
  
  namespace :v1, defaults: { format: 'json' } do
    post "login", action: :login, controller: 'authentication'
    post "signup", action: :create, controller: 'users'
    resources :databases
    resources :domains
    resources :variables
    resources :patients
    resources :concepts do
      collection do
        get :find_leaf_concepts
        get :search_concepts
      end
      member do
        get :get_concept_variable_and_domain
      end
    end
    resources :sessions, only: [:create, :destroy]
  end

  # devise_for :users, controllers: { sessions: 'users/sessions' }
  # devise_for :users, controllers: { registrations: 'users/registrations' }
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  match "*path", to: "welcome#main", via: :all

end
