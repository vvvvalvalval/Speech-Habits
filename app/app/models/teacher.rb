class Teacher < ActiveRecord::Base
  attr_accessible :name
  
  has_many :expressions, :events
end
