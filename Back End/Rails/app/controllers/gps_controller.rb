class GpsController < ApplicationController
    def push
        message = {'status' => 'Saved successfully.'}
        render :json => message
        Rails.logger.warn Time.now.strftime("%I:%M:%S") + " GPS DATA"

        request.body.rewind
        data = JSON.parse(request.body.read)
        Rails.logger.warn data.to_s
    end
end
