module Api
  module V1
    class ValidateController < ApplicationController
      # TODO: Implement API token for safety
  def validate
    level = Level.find_by(id: params[:level])

      puts params[:validate]
      validate = JSON.parse params["validate"].gsub('=>', ':')
      user_char = validate["char_locations"].keys.first
      user_x = validate["char_locations"][user_char][0]
      user_y = validate["char_locations"][user_char][1]
       
      level_char = level.char_locations[user_char]
      level_x = level_char[0]
      level_y = level_char[1]

      # TODO: Check if within radius, not exact
      puts "user_x " + user_x.to_s
      puts "level_x " + level_x.to_s
      puts "user_y " + user_y.to_s
      puts "level_y " + level_y.to_s
      if user_x.between?(level_x - 2, level_x + 2) && user_y.between?(level_y - 2, level_y + 2)
        player = Player.find_by(id: session[:current_player_id])
        player.char_checked[user_char] = true

        if player.save
          if player.char_checked.values.all? { |value| value == true }
            player.end_time = DateTime.now.strftime('%Q').to_i if player.end_time == nil
            if player.save
              render json: {"validate": true, "win": true}
            end
          else
            render json: {"validate": true}
          end
        else
          render json: {errors: player.errors.messages}, status: 422
        end
      else
        render json: {"validate": false}
      end
  end
end
  end
end

