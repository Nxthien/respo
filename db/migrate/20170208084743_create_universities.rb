class CreateUniversities < ActiveRecord::Migration[5.0]
  def change
    create_table :universities do |t|
      t.string :name
      t.datetime :deleted_at
      t.integer :creator_id, index: true
      
      t.timestamps
    end
  end
end
