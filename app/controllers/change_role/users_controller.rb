class ChangeRole::UsersController < ApplicationController
  before_action :find_user

  def show
    @supports = Supports::UserSupport.new
  end

  def edit
    respond_to do |format|
      format.html
      format.json {render json: {roles: @user.roles}}
    end
  end

  def update
    respond_to do |format|
      if find_role
        format.html {redirect_to @user}
        format.json do
          render json: {message: flash_message("updated"),
            roles: @user.roles}
        end
      else
        format.html {render :edit}
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @user.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  private
  def find_user
    @user = User.find_by id: params[:id]
    unless @user
      respond_to do |format|
        format.html {redirect_to users_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_role
    current_user.roles.delete_all
    params[:roles].each do |role|
      user_role = Role.find_by id: role[:id]
      unless @user.roles.include? user_role
        @user.roles << user_role
      end
    end
  end
end
