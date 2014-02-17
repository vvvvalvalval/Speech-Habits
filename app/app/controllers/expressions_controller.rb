class ExpressionsController < ApplicationController
  
  def show
    @expression = Expression.find(params[:id])
  end
  
  def new
  end
  
  def create
    @teacher = Teacher.find[:teacher_id]
    @expression = @teacher.expressions.build(params[:expression])
    if @expression.save
      redirect_to @teacher
    else
      render 'show' 
    end
  end

end
