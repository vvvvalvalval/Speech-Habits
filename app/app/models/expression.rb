class Expression < ActiveRecord::Base
  attr_accessible :content
  
  belongs_to :teacher
end
