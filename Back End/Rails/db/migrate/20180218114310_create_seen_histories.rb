class CreateSeenHistories < ActiveRecord::Migration[5.1]
    def change
        create_table :seen_histories do |t|
            t.string :client_id
            t.date :date
            t.time :firstSeen
            t.time :lastSeen
        end
    end
end
