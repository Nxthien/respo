class CreateEvaluationTemplates < ActiveRecord::Migration[5.0]
  def change
    create_table :evaluation_templates do |t|
      t.string :name
      t.belongs_to :training_standard, foreign_key: true
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
