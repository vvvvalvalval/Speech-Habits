class SessionsController < ApplicationController
  
  def new
    @title = "S'identifier"
  end

  def create
    user = User.authenticate(params[:session][:name])
    if user.nil?
      flash.now[:error] = "Utilisateur non enregistre"
      render 'new'
    else
      sign_in user
      redirect_back_or user
    end
  end
  
  def destroy
    sign_out
    redirect_to root_path
  end

end
