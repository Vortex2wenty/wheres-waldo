class AddStartTimeToPlayers < ActiveRecord::Migration[6.1]
  def change
    add_column :players, :start_time, :bigint
  end
end
