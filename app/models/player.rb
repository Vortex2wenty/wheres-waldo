class Player < ApplicationRecord
	belongs_to :leaderboard

	before_create :add_char_checked

	def add_char_checked
		self.char_checked = {
			"waldo": false,
			"wilma": false,
			"odlaw": false
		}
	end
end
