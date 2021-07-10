class PlayerSerializer
  include JSONAPI::Serializer
  attributes :name, :start_time, :end_time, :leaderboard_id, :char_checked
end
