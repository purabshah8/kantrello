# == Schema Information
#
# Table name: lists
#
#  id         :bigint(8)        not null, primary key
#  title      :string           not null
#  board_id   :integer          not null
#  position   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class List < ApplicationRecord
  validates :title, :position, presence: true

  belongs_to :board,
    foreign_key: :board_id,
    class_name: :Board

  has_many :cards

  before_validation :ensure_position

  private
  def ensure_position
    other_list_positions = self.board.lists.map() {|list| list[:position]}.sort
    self.position ||= other_list_positions.empty? ? 1 : other_list_positions.last + 1
  end

end
