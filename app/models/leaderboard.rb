class Leaderboard < ApplicationRecord
  # TODO: Maybe have rank method instead of filtering relationship

  has_many :players, -> { where.not(end_time: nil) }
  belongs_to :level
end