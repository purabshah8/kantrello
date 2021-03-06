# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  email           :string           not null
#  username        :string           not null
#  name            :string           not null
#  initials        :string           not null
#  bio             :text
#  avatar_url      :string
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :email, :username, :name, :initials, :password_digest, :session_token, presence: true
  validates :email, :username, :session_token, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: true
  validates :initials, length: {minimum: 1, maximum: 4}

  attr_reader :password

  has_many :owned_boards,
    foreign_key: :owner_id,
    class_name: :Board,
    dependent: :destroy

  has_many :board_shares,
    dependent: :destroy

  has_many :shared_boards,
    through: :board_shares,
    source: :board

  has_many :comments


  before_validation :ensure_user_info


  def self.find_by_credentials(credentials)
    user = User.find_by(username: credentials[:email])
    unless user
      user = User.find_by(email: credentials[:email])
    end
    user && user.is_password?(credentials[:password]) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_user_info
    self.session_token ||= generate_session_token

    username = self.name.downcase.split.join # generate as lowercase full name, no spaces

    # if user with given username already exists, add incremental nums to end of username, e.g. "johnsmith2"
    if User.exists?(username: username)
      num = 2
      username += num.to_s
      while User.exists?(username: username)
        username = username[0...-1] + num.to_s
        num += 1
      end
    end

    self.username ||= username
    self.initials ||= self.name.split.map(){ |w| w[0] }.join[0...4].upcase # use name to create initials, limit 4 chars
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end

end
