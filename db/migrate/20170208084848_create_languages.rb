class CreateLanguages < ActiveRecord::Migration[5.0]
  def change
    create_table :languages do |t|
      t.string :name
      t.string :description
      t.string :image
      t.datetime :deleted_at
      t.integer :creator_id, index: true

      t.timestamps
    end
  end
end
