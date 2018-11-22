class AddIndexToBoardShares < ActiveRecord::Migration[5.2]
  def change
    add_index :board_shares, [:board_id, :user_id], unique: true
  end
end
