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

ActiveRecord::Schema[7.0].define(version: 2018_11_22_142337) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "board_shares", force: :cascade do |t|
    t.integer "board_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["board_id", "user_id"], name: "index_board_shares_on_board_id_and_user_id", unique: true
    t.index ["board_id"], name: "index_board_shares_on_board_id"
    t.index ["user_id"], name: "index_board_shares_on_user_id"
  end

  create_table "boards", force: :cascade do |t|
    t.string "title", null: false
    t.boolean "starred", default: false, null: false
    t.integer "owner_id", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["owner_id"], name: "index_boards_on_owner_id"
  end

  create_table "cards", force: :cascade do |t|
    t.string "title", null: false
    t.integer "list_id", null: false
    t.integer "position", null: false
    t.datetime "due_date", precision: nil
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.text "description"
    t.index ["list_id", "position"], name: "index_cards_on_list_id_and_position", unique: true
    t.index ["list_id"], name: "index_cards_on_list_id"
  end

  create_table "comments", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "card_id", null: false
    t.text "body", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["card_id"], name: "index_comments_on_card_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "lists", force: :cascade do |t|
    t.string "title", null: false
    t.integer "board_id", null: false
    t.integer "position", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["board_id", "position"], name: "index_lists_on_board_id_and_position", unique: true
    t.index ["board_id"], name: "index_lists_on_board_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "name", null: false
    t.string "initials", null: false
    t.text "bio"
    t.string "avatar_url"
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
