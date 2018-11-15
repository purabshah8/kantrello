class CreateBoards < ActiveRecord::Migration[5.2]
  def change
    create_table :boards do |t|
      t.string :title, null: false
      t.boolean :starred, null: false, default: false
      t.integer :owner_id, null: false
      t.timestamps
    end
    add_index :boards, :owner_id
  end
end
