class Expression < ActiveRecord::Base
  attr_accessible :content
  
  belongs_to :teacher
  has_many :events, :dependent => :destroy
  
  validates :content, :presence => true,
                      :uniqueness => true
                      #:length => { :maximum => 500 }
end
