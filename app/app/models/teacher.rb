class Teacher < ActiveRecord::Base
  attr_accessible :name
  
  has_many :expressions, :dependent => :destroy, inverse_of: :teacher
  
  validates :name, :presence => true,
                   :uniqueness => true
                   #:length => { :maximum => 50 }
end
