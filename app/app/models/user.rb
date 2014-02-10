class User < ActiveRecord::Base
  attr_accessible :name
  
  has_many :events
  
  validates :name, :presence => true,
                   :uniqueness => true
                   #:length => { :maximum => 50 }
  
end
