class User < ActiveRecord::Base
  attr_accessible :name
  
  has_many :events, :dependent => :destroy, inverse_of: :user
  
  validates :name, :presence => true,
                   :uniqueness => true
                   #:length => { :maximum => 50 }
                   
  def self.authenticate(name)
    user = find_by_name(name)
    if user.nil?
      return nil
    else
      return user
    end
  end
  
  def self.authenticate_with_id(id)
    user = find_by_id(id)
    if user.nil?
      return nil
    else
      return user
    end
  end
  
end
