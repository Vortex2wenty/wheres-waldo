class RemoveEndTimeFromPlayers < ActiveRecord::Migration[6.1]
  def change
    remove_column :players, :end_time, :date
  end
end
