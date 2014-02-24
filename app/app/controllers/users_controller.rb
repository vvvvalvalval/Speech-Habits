class UsersController < ApplicationController
  before_filter :authenticate, :only => [:index, :destroy]
  before_filter :admin_user,   :only => :destroy
  
  def index
    @title = "Tous les utilisateurs"
    @users = User.all
  end
  
  def show
    @user = User.find(params[:id])
    @title = @user.name
  end
  
  def new
    @title = "Inscription"
    @user = User.new
  end
  
  def create
    @user = User.new(params[:user])
    if @user.save
      sign_in @user
      flash[:success] = "Bienvenue dans Speech Habbits"
      redirect_to @user
    else
      render 'new'
    end
  end
  
  def destroy
    User.find(params[:id]).destroy
    flash[:success] = "Utilisateur supprime"
    redirect_to users_path
  end
  
  private
  
    def authenticate
      deny_access unless signed_in?
    end
    
    def admin_user
      redirect_to(root_path) unless current_user.admin?
    end
    
end
