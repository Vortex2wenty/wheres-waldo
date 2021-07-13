module Api
  module V1
    class PlayersController < ApplicationController
      skip_before_action :verify_authenticity_token
      
      def show
        player = Player.find_by(id: params[:id])

        render json: PlayerSerializer.new(player).serializable_hash.to_json
      end

  def create
    player = Player.new(create_player_params)

    if player.save
      session[:current_player_id] = player.id
      puts session[:current_player_id]
      render json: PlayerSerializer.new(player).serializable_hash.to_json
    else
      render json: { error: player.errors.messages}, status: 422
    end
  end

  def update
    player = Player.find_by(id: params[:id])

    if player.update(update_player_params)
      render json: PlayerSerializer.new(player).serializable_hash.to_json
    else
      render json: { error: player.errors.messages}, status: 422
    end
  end

  def index
    players = Player.all;

    render json: PlayerSerializer.new(players).serializable_hash.to_json
  end

  private

  def create_player_params
    params.require(:player).permit(:start_time, :leaderboard_id)
  end

  def update_player_params
    params.require(:player).permit(:name, :end_time)
  end
end
  end
end
