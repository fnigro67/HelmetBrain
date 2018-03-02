class CreateClients < ActiveRecord::Migration[5.1]
    def change
        create_table :clients, id: false do |t|
            t.string :clientMac, :primary_key => true
            t.string :owner
            t.string :email
            t.float :unc
            t.decimal :lat, :precision => 9, :scale => 6
            t.decimal :lng, :precision => 9, :scale => 6
        end
    end
end
