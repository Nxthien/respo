class ApplicationController < ActionController::Base
  include Pundit
  include Authorize
  include ApplicationHelper

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  protect_from_forgery with: :exception

  before_action :authenticate_user!
end
