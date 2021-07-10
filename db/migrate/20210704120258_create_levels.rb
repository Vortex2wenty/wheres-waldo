class CreateLevels < ActiveRecord::Migration[6.1]
  def change
    create_table :levels do |t|
      t.string :image_url
      t.jsonb :char_locations

      t.timestamps
    end
  end
end
