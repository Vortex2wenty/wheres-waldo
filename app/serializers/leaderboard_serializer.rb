class LeaderboardSerializer
  include JSONAPI::Serializer
  attributes :players_id, :level_id

  has_many :players
end
