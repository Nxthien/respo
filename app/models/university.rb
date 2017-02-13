class University < ApplicationRecord
  acts_as_paranoid

  ATTRIBUTE_PARAMS = [:name]

  has_many :profiles, dependent: :destroy

  validates :name, presence: true
end
