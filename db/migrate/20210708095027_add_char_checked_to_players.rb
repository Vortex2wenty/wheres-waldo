class AddCharCheckedToPlayers < ActiveRecord::Migration[6.1]
  def change
    add_column :players, :char_checked, :jsonb
  end
end
