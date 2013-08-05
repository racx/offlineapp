class Contact < ActiveRecord::Base
  attr_accessible :name, :email, :address
  validates :email, :name, :email, :presence => true
end
