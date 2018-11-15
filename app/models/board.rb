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

  after_initialize :ensure_starred

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

  private

  def ensure_starred
    self.starred  ||= false;
  end
end
