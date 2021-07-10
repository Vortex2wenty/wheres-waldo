class AddEndTimeToPlayers < ActiveRecord::Migration[6.1]
  def change
    add_column :players, :end_time, :bigint
  end
end
