class Function < ApplicationRecord

  has_many :role_functions, dependent: :destroy
  has_many :roles, through: :role_functions
  has_many :user_functions, dependent: :destroy
  has_many :users, through: :user_functions

  scope :order_by_parent_id, ->{order parent_id: :ASC}
end
