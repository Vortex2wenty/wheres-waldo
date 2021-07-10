class AddLeaderboardIdToPlayers < ActiveRecord::Migration[6.1]
  def change
    add_column :players, :leaderboard_id, :bigint
  end
end
