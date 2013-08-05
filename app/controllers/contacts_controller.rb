class ContactsController < InheritedResources::Base
	respond_to :html, :json

	def  create
		create!{new_contact_url}
	end
end
