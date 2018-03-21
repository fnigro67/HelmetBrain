/********************************************************
/*  Gps                                                 *
/********************************************************/
#include <SoftwareSerial.h>
#include <NMEAGPS.h>

static NMEAGPS gps;
static gps_fix fix;
SoftwareSerial gpsPort(5, 4);

void StartGps();

/********************************************************
/*  WiFi                                                *
/********************************************************/
#include <ESP8266mDNS.h>

const char* ssidWiFi = "Sitecom17C01D";
const char* passwordWiFi = "343S7543";
String macAddr = WiFi.macAddress();

void ConnectWifi();
bool StartWifi();
String connectionStatus ( int which );


/********************************************************
/*  Send Json Data                                      *
/********************************************************/
#include <ArduinoJson.h>
#include <ESP8266HTTPClient.h>

HTTPClient client;

const char* host = "192.168.0.105";
const int port = 3000;

void ConnectServer();
void SendJson( JsonObject& data );


/********************************************************
/*  EasyVr                                              *
/********************************************************/
#include "EasyVR.h"









void setup()
{
    Serial.begin(115200);
    if(StartWifi())
        ConnectServer();
    else
        Serial.println("Connessione fallita!");
    Serial.println("Connessione avvenuta!");
    StartGps();
}

void loop()
{
    StaticJsonBuffer<500> jsonBuffer;
    JsonObject& jsonData = jsonBuffer.createObject();

    jsonData["clientMac"] = macAddr;
    JsonObject& jsonGps = jsonData.createNestedObject("gps");
    while (gps.available(gpsPort)) {
        /* READ DATA */
        fix = gps.read();
        
        if (fix.valid.location) {
            jsonGps["lat"] = fix.latitude();   // float 7 Significants digits (use fix.latududeL() for 10 digits)
            if (fix.valid.lat_err)
                jsonData["gps"]["latErr"] = fix.lat_err();
    
            jsonGps["lon"] = fix.longitude();
            if (fix.valid.lon_err)
                jsonData["location"]["lonErr"] = fix.lon_err();
        }
        if (fix.valid.altitude) {
            jsonGps["alt"] = fix.altitude_cm(); // In integer centimeters
            jsonGps["altErr"] = fix.alt_err_cm;
        }
        if (fix.valid.speed) {
            jsonGps["speed"] = fix.speed_kph(); // In float kilometers per hour
        }
        if (fix.valid.heading) {
            jsonGps["heading"] = fix.heading_cd(); // In integer hundredths of a degree
        }
        
        /* SEND DATA */
        SendJson(jsonData);
        
        jsonData.prettyPrintTo(Serial);
        Serial.println();
    }
}

/********************************************************
/*  Gps                                                 *
/********************************************************/
void StartGps() {
      gpsPort.begin(9600);
}

/********************************************************
/*  WiFi                                                *
/********************************************************/
void ConnectWifi() {
    WiFi.begin(ssidWiFi, passwordWiFi);
    int connRes = WiFi.waitForConnectResult();
    if (connRes != WL_CONNECTED) {
        printf("[WiFi] Connection to %s failed - Status %d, %s, Retrying in 10s...\n", WiFi.SSID().c_str(), WiFi.status(), connectionStatus( WiFi.status() ).c_str() );
        WiFi.disconnect();
    } else {
        printf("[WiFi] Connected to  %s, IP address: %s\n", WiFi.SSID().c_str(), WiFi.localIP().toString().c_str());
    }
}
bool StartWifi() {
    ConnectWifi();
    WiFi.setAutoConnect (true);
    WiFi.setAutoReconnect (true);
    return true;
}
String connectionStatus ( int which )
{
    switch ( which )
    {
        case WL_CONNECTED:
            return "Connected";
            break;

        case WL_NO_SSID_AVAIL:
            return "Network not availible";
            break;

        case WL_CONNECT_FAILED:
            return "Wrong password";
            break;

        case WL_IDLE_STATUS:
            return "Idle status";
            break;

        case WL_DISCONNECTED:
            return "Disconnected";
            break;

        default:
            return "Unknown";
            break;
    }
}


/********************************************************
/*  Send Json Data                                      *
/********************************************************/
void ConnectServer() {
    Serial.print("Connecting to: ");
    Serial.print(host);
    Serial.print(':');
    Serial.println(port);
    client.begin(host, port, "/clients");
    client.addHeader("Content-Type", "application/json");

}
void SendJson( JsonObject& data ){
    String out;
    data.printTo(out);
    client.POST(out);
}
