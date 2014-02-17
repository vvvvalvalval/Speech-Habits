class Teacher < ActiveRecord::Base
  attr_accessible :name
  
  has_many :expressions, inverse_of: :teacher
  has_many :events
  
  validates :name, :presence => true,
                   :uniqueness => true
                   #:length => { :maximum => 50 }
end
