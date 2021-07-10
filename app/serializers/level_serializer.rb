class LevelSerializer
  include JSONAPI::Serializer
  attributes :image_url, :name, :leaderboard_id
end
