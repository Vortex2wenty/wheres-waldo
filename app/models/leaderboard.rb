class Leaderboard < ApplicationRecord
  has_many :players
  belongs_to :level
end
