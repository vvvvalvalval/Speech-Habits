class Expression < ActiveRecord::Base
  attr_accessible :content
  
  belongs_to :teacher
  has_many :events
end
