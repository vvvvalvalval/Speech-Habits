class ExpressionsController < ApplicationController
  
  def show
    @expression = Expression.find(params[:id])
  end
  
  def new
  end
  
  def create
    @expression = Expression.new(params[:expression])
    if @expression.save
      redirect_to 'show'
    else
      render 'show' 
    end
  end

end
