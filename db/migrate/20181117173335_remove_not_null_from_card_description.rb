class RemoveNotNullFromCardDescription < ActiveRecord::Migration[5.2]
  def change
    change_column_default :cards, :description, true
  end
end
