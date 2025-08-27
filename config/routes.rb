Rails.application.routes.draw do
   root "pages#home"

  namespace :api do
     namespace :v1 do
      resources :todos
     end
  end
end
