# == Schema Information
#
# Table name: cards
#
#  id          :bigint(8)        not null, primary key
#  title       :string           not null
#  list_id     :integer          not null
#  position    :integer          not null
#  due_date    :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :text
#

class Card < ApplicationRecord
  validates :title, :position, presence: true

  before_validation :ensure_position

  belongs_to :list

  has_one :board,
    through: :list,
    source: :board

  private
  def ensure_position
    other_card_positions = self.list.cards.map() {|card| card[:position]}.sort
    self.position ||= other_card_positions.empty? ? 1 : other_card_positions.last + 1
  end
end
