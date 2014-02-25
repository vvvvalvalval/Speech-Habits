class TeachersController < ApplicationController
  before_filter :authenticate, :only => [:index, :create, :destroy]
  before_filter :admin_user,   :only => :destroy
  
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
  
  def destroy
    Teacher.find(params[:id]).destroy
    flash[:success] = "Professeur supprime"
    redirect_back_or teachers_path
  end
  
  private
  
    def admin_user
      redirect_to(root_path) unless current_user.admin?
    end
  
end
