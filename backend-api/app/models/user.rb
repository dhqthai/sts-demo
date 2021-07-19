class User < ApplicationRecord
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :lockable,
         :trackable,
         :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: self

  # def jwt_payload
  #   super.merge(
  #       {:foo => 'bar'}
  #   )
  # end
  #
  # def on_jwt_dispatch(token, payload)
  #   super
  #   puts token, payload
  #   # do_something(token, payload)
  # end
end
