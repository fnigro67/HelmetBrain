class ClientsController < ActionController::API
    rescue_from Exception,
    :with => :render_error_response

  def render_error_response(error)
    render json: error, status: 200
  end
    def update
        Rails.logger.warn "Client update!"

        response = {
            "status": "ok",
            "code": 200,
            "messages": [],
            "result": {
                "clients": []
            }
        }

        request.body.rewind
        client = JSON.parse(request.body.read)
        status = ""
        client_mac = client['clientMac']
        lng = client['gps']['lng']
        lat = client['gps']['lat']

        activeClient = Client.where(clientMac: client_mac)
        if activeClient.blank?
            activeClient.create(clientMac: client_mac, lat: lat, lng: lng)
            status = "created"
        else
            activeClient.update(lat: lat, lng: lng)
            status = "updated"
        end
        response[:result][:clients] << { "mac": client_mac, "status": status }

        render json: response
    end
    def all
        render json: Client.all
    end
end
