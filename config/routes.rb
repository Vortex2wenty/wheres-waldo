Rails.application.routes.draw do
  root 'homepage#index'

  namespace :api do
    namespace :v1 do
      resources :levels, only: [:index, :show]
      resources :leaderboards, only: [:index, :show, :update]
      resources :players, only: [:create, :update, :show, :index]
      get 'validate/:level', to: 'validate#validate'
      # TODO: Maybe get 'validate/won/:level' to 'validate#won' or just do in front end 
    end
  end

  get '*path', to: 'homepage#index', via: :all
end
