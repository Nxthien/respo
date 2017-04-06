class CreateTask::TasksController < ApplicationController
  include Authorize

  before_action :find_ownerable, only: :create
  before_action :namespace_authorize, only: :create

  def create
    @target = class_eval(params[:task][:type].classify).new task_params
    if @target.save
      @task = StaticTask.new targetable: @target, ownerable: @ownerable
      unless @task.save
        render json: {message: flash_message("not_created")},
          status: :unprocessable_entity
      end
    end
    target = @target.attributes.merge task_id: @task.id
    render json: {message: flash_message("created"), target: target}
  end

  private
  def task_params
    params.require(:task).permit :name, :content
  end

  def find_ownerable
    klass = params[:task][:ownerable_type].classify
    if CLASS_NAMES.include? klass
      @ownerable = class_eval(klass).find_by id: params[:task][:ownerable_id]
      unless @ownerable
        render json: {message: flash_message("not_found")},
          status: :not_found
      end
    else
      raise "Forbidden"
    end
  end
end
