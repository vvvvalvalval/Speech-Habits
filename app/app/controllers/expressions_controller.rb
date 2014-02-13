class ExpressionsController < ApplicationController
  
  def show
    @expression = Expression.find(params[:id])
  end
  
  def new
  end
  
  def create
    @expression = teacher.build(params[:expressions])
    if @expression.save
      redirect_to @teacher
    else
      render 'show' 
    end
  end

end
