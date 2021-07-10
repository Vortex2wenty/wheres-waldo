module Api
  module V1
    class LeaderboardsController < ApplicationController
      skip_before_action :verify_authenticity_token

      def index
        leaderboards = Leaderboard.all

        render json: LeaderboardSerializer.new(leaderboards, options).serializable_hash.to_json
      end

      def show
        leaderboard = Leaderboard.find_by(id: params[:id])

        render json: LeaderboardSerializer.new(leaderboard, options).serializable_hash.to_json
      end

      def update
      end

      private

      def leadboard_params
      end

      def options
        @options ||= { include: %i[players] }
      end
    end
  end
end
