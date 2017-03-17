class Subject < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name, :image, :description, :content,
    :training_standard_id]

  mount_uploader :image, ImageUploader

  has_many :standard_subjects, dependent: :destroy
  has_many :training_standards, through: :standard_subjects

  has_many :course_subjects, dependent: :destroy
  has_many :user_subjects, dependent: :destroy
  has_many :tasks, as: :targetable,
    class_name: StaticTask.name, dependent: :destroy
  has_many :assignments, through: :tasks, source: :targetable,
    source_type: Assignment.name
  has_many :surveys, through: :tasks, source: :targetable,
    source_type: Survey.name
  has_many :test_rules, through: :tasks, source: :targetable,
    source_type: TestRule.name

  scope :find_remain_subjects, -> ids {where.not id: ids}

  validates :name, presence: true
end
