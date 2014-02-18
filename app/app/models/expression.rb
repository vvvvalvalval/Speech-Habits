class Expression < ActiveRecord::Base
  attr_accessible :content, :teacher_id
  
  belongs_to :teacher, inverse_of: :expressions
  has_many :events
  
  validates :content, :presence => true,
                      :uniqueness => true
                      #:length => { :maximum => 500 }
end
