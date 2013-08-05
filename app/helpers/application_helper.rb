module ApplicationHelper
  def menu_tag(name, url, opts={})
    selected = {}
    selected[:class] = 'selected' if params[:controller].match(/^[^\/]+\/#{name}/)
    content_tag(:li, selected) { link_to name, url, opts }
 end
end
