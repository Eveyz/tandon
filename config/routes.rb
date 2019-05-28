Rails.application.routes.draw do
  root 'welcome#main'
  
  namespace :v1, defaults: { format: 'json' } do
    post "login", action: :login, controller: 'authentication'
    post "signup", action: :create, controller: 'users'
    resources :databases
    resources :domains
    resources :variables
    resources :patients do
      collection do
        post :query
      end
    end
    resources :concepts do
      collection do
        get :grouped_concepts
        get :find_leaf_concepts
        get :search_concepts
      end
      member do
        get :get_concept_variable_and_domain
      end
    end
    resources :sessions, only: [:create, :destroy]
  end
  match "*path", to: "welcome#main", via: :all

end
