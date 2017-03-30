class University < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name]

  has_many :profiles, dependent: :destroy

  belongs_to :creator, foreign_key: :creator_id, class_name: User.name

  validates :name, presence: true
end
