class Event < ActiveRecord::Base
  attr_accessible :expression_id, :user_id
  
  belongs_to :user
  belongs_to :expression
end
