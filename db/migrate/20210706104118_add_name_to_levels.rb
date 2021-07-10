class AddNameToLevels < ActiveRecord::Migration[6.1]
  def change
    add_column :levels, :name, :string
  end
end
