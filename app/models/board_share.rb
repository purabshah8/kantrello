# == Schema Information
#
# Table name: board_shares
#
#  id         :bigint(8)        not null, primary key
#  board_id   :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BoardShare < ApplicationRecord

  belongs_to :board
  belongs_to :user
  
end
