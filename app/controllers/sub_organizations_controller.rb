class SubOrganizationsController < ApplicationController
   before_action :find_organization, only: :update 

  def update
    respond_to do |format|
      if @organization.update_attributes organization_params
        @message = flash_message "updated"
        format.html{redirect_to [:admin, @organization]}
        format.json
      else
        format.html{render :edit}
        format.json{render json: {message: flash_message("not_updated"),
          errors: @organization.errors}, status: :unprocessable_entity}
      end
    end
  end

  def create
    parent = Organization.find_by id: params[:organization].delete(:parent_id)
    @organization = parent.children.build organization_params.merge(owner: current_user)
    respond_to do |format|
      if @organization.save
        @message = flash_message "created"
        format.html{redirect_to [:admin, @organization]}
        format.json
      else
        format.html{render :new}
        format.json{render json: {message: flash_message("not_created"),
          errors: @organization.errors}, status: :unprocessable_entity}
      end
    end
  end

  def destroy
    binding.pry
  end

  private
  def organization_params
    params.require(:organization).permit Organization::ATTRIBUTES_PARAMS
  end

  def find_organization
    @organization = Organization.find_by id: params[:id]
    unless @organization
      respond_to do |format|
        format.html {redirect_to organization_path current_user.organizations.first.id}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end    
  end
end
