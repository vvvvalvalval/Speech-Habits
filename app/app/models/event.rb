class Event < ActiveRecord::Base
  attr_accessible :expression_id, :user_id
  
  belongs_to :user, inverse_of: :events
  belongs_to :expression, inverse_of: :events
end
