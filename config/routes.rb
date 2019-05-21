Rails.application.routes.draw do
  root 'welcome#main'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  match "*path", to: "welcome#main", via: :all

end
