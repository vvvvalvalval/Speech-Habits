class Expression < ActiveRecord::Base
  attr_accessible :content
  
  belongs_to :teacher
  has_many :events
  
  validates :content, :presence => true,
                      :uniqueness => true
                      #:length => { :maximum => 500 }
  validates :user_id, :presence => true
end
