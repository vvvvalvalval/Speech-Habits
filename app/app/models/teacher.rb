class Teacher < ActiveRecord::Base
  attr_accessible :name
  
  has_many :expressions
  has_many :events, :dependent => :destroy
  
  validates :name, :presence => true,
                   :uniqueness => true
                   #:length => { :maximum => 50 }
end
