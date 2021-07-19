Rails.application.routes.draw do
  devise_for :users,
             path: 'auth',
             path_names: {
                 sign_in: 'login',
                 sign_out: 'logout',
                 registration: 'signup'
             },
             controllers: {
                 sessions: 'sessions',
                 registrations: 'registrations'
             }
  # devise_for :users, skip: :all
  # devise_scope :user do
  #   scope :auth, defaults: { format: :json } do
  #     post   '/signin',       to: 'sessions#create'
  #     delete '/signout',      to: 'sessions#destroy'
  #     post   '/signup',       to: 'registrations#create'
  #     put    '/account',      to: 'registrations#update'
  #     delete '/account',      to: 'registrations#destroy'
  #     put    '/password',     to: 'devise/passwords#update'
  #     post   '/password',     to: 'devise/passwords#create'
  #     get    '/confirmation', to: 'devise/confirmations#show'
  #     post   '/unlock',       to: 'devise/unlocks#create'
  #     get    '/unlock',       to: 'devise/unlocks#show'
  #   end
  # end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :users
      # We are going to list our client resources here
    end

    namespace :admin do
      # We are going to list our admin resources here
    end
  end
end
