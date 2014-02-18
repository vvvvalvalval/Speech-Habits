module ApplicationHelper
  #Retourne titre basé sur la page.
  def titre 
    base_titre = "Speech Habits"
    if @title.nil?
      base_titre
    else
      "#{base_titre} | #{@title}"
    end
  end
  
  def logo
    image_tag("logo.gif", :alt => "Speech Habits", :class => "round", :size => '130x90')
  end
end
module ApplicationHelper
end
