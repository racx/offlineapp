Offlineapp::Application.routes.draw do
  resources :contacts
  match "/offline.appcache" => Rails::Offline	
  root :to => 'site#index'  
end
