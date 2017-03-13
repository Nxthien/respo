class CreateCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.string :image
      t.string :description
      t.integer :status, default: 0, null: false
      t.belongs_to :language, foreign_key: true
      t.date :start_date
      t.date :end_date
      t.integer :creator_id
      t.belongs_to :program, foreign_key: true
      t.belongs_to :training_standard, foreign_key: true
      t.datetime :deleted_at
      t.integer :creator_id
      t.integer :owner_id

      t.timestamps
    end
  end
end
