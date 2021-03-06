# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_07_08_095027) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "leaderboards", force: :cascade do |t|
    t.bigint "players_id", null: false
    t.bigint "level_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["level_id"], name: "index_leaderboards_on_level_id"
    t.index ["players_id"], name: "index_leaderboards_on_players_id"
  end

  create_table "levels", force: :cascade do |t|
    t.string "image_url"
    t.jsonb "char_locations"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "start_time"
    t.bigint "end_time"
    t.bigint "leaderboard_id"
    t.jsonb "char_checked"
  end

  add_foreign_key "leaderboards", "levels"
  add_foreign_key "leaderboards", "players", column: "players_id"
end
