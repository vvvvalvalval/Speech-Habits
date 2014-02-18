class ExpressionsController < ApplicationController
  
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

end
