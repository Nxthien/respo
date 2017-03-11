class StandardSubjectsController < ApplicationController
  def index
    @standard_subjects = StandardSubject.select :id, :training_standard_id, :subject_id
    respond_to do |format|
      format.json do
        render json: {standard_subjects: @standard_subjects}
      end
    end
  end

  def create
    @standard_subject = StandardSubject.new standard_subjects_params
    respond_to do |format|
      if @standard_subject.save
        format.html {redirect_to root_path}
        format.json do
          render json: {message: flash_message("created"),
            standard_subject: @standard_subject}
        end
      else
        format.html {render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @standard_subject.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @standard_subject = StandardSubject.find_by id: params[:id]
    respond_to do |format|
      if @standard_subject.destroy
        format.html {redirect_to root_path}
        format.json do
          render json: {message: flash_message("created"),
            standard_subject: @standard_subject}
        end
      else
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @standard_subject.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  private
  def standard_subjects_params
    params.require(:standard_subject).permit :training_standard_id, :subject_id
  end
end
