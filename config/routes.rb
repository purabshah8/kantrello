Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :destroy] do
      resources :boards, only: [:index]
    end

    get 'users', to: 'users#search'
    resource :session, only: [:create, :destroy]

    resources :boards, only: [:create, :show, :update, :destroy] do
      resources :lists, only: [:index]
      resources :users, only: [:index]
    end

    resources :lists, only: [:create, :show, :update, :destroy] do
      resources :cards, only: [:index]
    end

    resources :cards, only: [:create, :show, :update, :destroy] do
      resources :comments, only: [:index]
    end

    resources :comments, only: [:create, :update, :destroy]

    resources :board_shares, only: [:create, :destroy]
  end

  get '*path', to: 'static_pages#root'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
