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

	def time_diff
		return if self.start_time.nil? || self.end_time.nil?
		unless self.start_time.nil? && self.end_time.nil?
			self.end_time - self.start_time
		end
	end
end
