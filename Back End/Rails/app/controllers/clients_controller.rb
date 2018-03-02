class ClientsController < ApplicationController
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
        clients = JSON.parse(request.body.read)
        clients.each do |client|
            status = ""
            client_mac = client['clientMac']
            lng = client['location']['lng']
            lat = client['location']['lat']

            activeClient = Client.where(clientMac: client_mac)
            if activeClient.blank?
                activeClient.create(clientMac: client_mac, lat: lat, lng: lng)
                status = "created"
            else
                activeClient.update(lat: lat, lng: lng)
                status = "updated"
            end
            response[:result][:clients] << { "mac": client_mac, "status": status }
        end

        render json: response
    end
    def all
        render json: Client.all
    end
end
