class EventsController < ApplicationController
  
  def show
    @event = Event.find(params[:id])
  end
  
  def new
    @event = Event.new
  end
  
  def create
    @event = Event.new(params[:event])
    if @event.save
      redirect_to @event.expression.teacher
    else
      render 'show'
    end
  end      

end
