class Language < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name]

  mount_uploader :image, ImageUploader

  has_many :courses, dependent: :destroy
  has_many :profiles, dependent: :destroy
  has_many :trainees, through: :profiles

  validates :name, presence: true
end
