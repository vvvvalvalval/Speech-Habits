class Event < ActiveRecord::Base
  attr_accessible :expr_id, :user_id, :teacher_id
  
  belongs_to :user, :teacher, :expression
end
