class RemoveStartTimeFromPlayers < ActiveRecord::Migration[6.1]
  def change
    remove_column :players, :start_time, :date
  end
end
