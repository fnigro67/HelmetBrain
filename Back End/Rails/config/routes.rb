Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'site#index'

  # ajax

  # Gps listener
  post '/clients', to: 'clients#update'
  get '/clients', to: 'clients#all'

  # Channels
end
