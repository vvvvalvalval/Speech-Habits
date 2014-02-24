class ExpressionsController < ApplicationController
  before_filter :authenticate, :only => [:create, :destroy]
  before_filter :admin_user,   :only => :destroy
  
  def show
    @expression = Expression.find(params[:id])
  end
  
  def new
  end
  
  def create
    @expression = Expression.new(params[:expression])
    if @expression.save
      redirect_to @expression.teacher
    else
      render 'show' 
    end
  end
  
  def destroy
    @expression = Expression.find(params[:id])
    @teacher = @expression.teacher
    @expression.destroy
    flash[:success] = "Expression supprime"
    redirect_back_or @teacher
  end
  
  private
  
    def admin_user
      redirect_to(root_path) unless current_user.admin?
    end

end
