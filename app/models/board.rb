# == Schema Information
#
# Table name: boards
#
#  id         :bigint(8)        not null, primary key
#  title      :string           not null
#  starred    :boolean          default(FALSE), not null
#  owner_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Board < ApplicationRecord
  validates :title, presence: true
  validates :starred, inclusion: { in: [true, false] }

  before_validation :ensure_starred

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

  has_many :board_shares,
    dependent: :destroy

  has_many :users,
    through: :board_shares,
    source: :user

  has_many :lists,
    foreign_key: :board_id,
    class_name: :List

  private

  def ensure_starred
    self.starred  ||= false;
  end
end
