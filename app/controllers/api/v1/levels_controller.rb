module Api
  module V1
    class LevelsController < ApplicationController
      def index
        levels = Level.all

        render json: LevelSerializer.new(levels).serializable_hash.to_json
      end

      def show
        level = Level.find_by(id: params[:id])

        render json: LevelSerializer.new(level).serializable_hash.to_json
      end
    end
  end
end

