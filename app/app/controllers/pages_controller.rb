class PagesController < ApplicationController
  def home
    @title = "Home"
  end

  def contact
    @title = "Contact"
  end
  
  def about
    @title = "A Propos"
  end
  
  def help
    @title = "Aide"
  end

end
