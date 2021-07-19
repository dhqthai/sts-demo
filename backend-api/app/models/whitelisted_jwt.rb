class WhitelistedJwt < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Whitelist

  self.table_name = 'whitelisted_jwts'
end
