class FixCardsTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :cards, :description
    add_column :cards, :description, :text
  end
end
