class StaticPagesController < ApplicationController
  skip_before_action :authenticate_user!

  def show
    if current_user.present?
      if current_user.is_a? Admin
        if current_user.organizations.present?
          redirect_to organization_path current_user.organizations.first.id
        else
          redirect_to new_organization_path
        end
      end
    end
    respond_to do |format|
      format.html
      format.json do
        @supports = Supports::StaticPage.new
      end
    end
  end
end
