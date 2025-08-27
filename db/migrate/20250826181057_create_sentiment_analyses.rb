class CreateSentimentAnalyses < ActiveRecord::Migration[8.0]
  def change
    create_table :sentiment_analyses do |t|
      t.string :label, null: false
      t.float :confidence, default: 1.0
      t.references :todo, null: false, foreign_key: true
      t.timestamps
    end
  end
end
