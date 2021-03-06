class CreateWhitelistedJwts < ActiveRecord::Migration[6.0]
  def change
    create_table :whitelisted_jwts do |t|
      t.string :jti, null: false
      t.string :aud    # If you want to leverage the `aud` claim, add to it a `NOT NULL` constraint:

      t.datetime :exp, null: false
      t.references :users, foreign_key: { on_delete: :cascade }, null: false
    end

    add_index :whitelisted_jwts, :jti, unique: true
  end
end
