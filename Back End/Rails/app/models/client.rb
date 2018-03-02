class Client < ApplicationRecord
    has_one :seen_history, dependent: :destroy

    after_create :create_seen
    after_update :update_seen

    private

    def create_seen
        self.create_seen_history(date: Date.today, firstSeen: Time.now, lastSeen: Time.now)
    end
    def update_seen
        self.create_seen_history(date: Date.today, lastSeen: Time.now)
    end
end
