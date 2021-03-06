json.program_detail do
  json.extract! @program, :name, :program_type, :id
  json.organization @program.organization, :name, :id
  json.parent do
    if @program.child?
      json.extract! @program.parent, :name, :program_type
      json.organization @program.organization, :name
    else
      json.null!
    end
  end
  json.children @program.children, :name, :program_type

  json.users @supports.users do |user|
    json.extract! user, :id, :name
    json.avatar user.avatar.url
    json.type user.type
  end
  json.user_counts @supports.users.count

  json.courses @supports.courses do |course|
    json.extract! course, :id, :name, :description, :start_date, :end_date
    json.image course.image.url
    json.language course.language.name
  end
  json.course_counts @supports.courses.count

  json.training_standards @supports.training_standards do |training_standard|
    json.extract! training_standard, :id, :name, :program_id
  end

  json.program_subjects @supports.program_subjects do |program_subject|
    json.extract! program_subject, :id, :name, :description
    json.image program_subject.image.url
  end
  json.program_subject_counts @supports.program_subjects.count
end
