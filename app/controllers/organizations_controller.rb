class OrganizationsController < ApplicationController
  def show
    @organization = Organization.find_by id: params[:id]
  end
  
  def new
  end

  def create
    @organization = current_user.organizations.build organization_params
    respond_to do |format|
      if @organization.save
        @message = flash_message "created"
        format.html{redirect_to @organization}
        format.json
      else
        format.html{render :new}
        format.json{render json: {message: flash_message("not_created"),
          errors: @organization.errors}, status: :unprocessable_entity}
      end
    end
  end

  private
  def organization_params
    params.require(:organization).permit Organization::ATTRIBUTES_PARAMS
  end
end
