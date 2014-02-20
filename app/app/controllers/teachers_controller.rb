class TeachersController < ApplicationController
  
  def index
    @title = "liste des professeurs"
    @teachers = Teacher.all
  end
  
  def show
    @teacher = Teacher.find(params[:id])
    @title = @teacher.name
    @expressions = @teacher.expressions
    @expression = Expression.new()
    @event = Event.new()
  end
  
  def new
    @title = "Nouveau professeur"
    @teacher = Teacher.new
  end
  
  def create
    @teacher = Teacher.new(params[:teacher])
    if @teacher.save
      redirect_to @teacher
    else
      render 'new'
    end
  end
end
