import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon broken by bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const mapLat = -7.8213449;
const mapLng = 110.3656522;

export default function LocationMap({ width = '100%', height = '300px', zoom = 15 }) {
    return (
        <div style={{ width, height }}>
            <MapContainer
                center={[mapLat, mapLng]}
                zoom={zoom}
                style={{ width: '100%', height: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[mapLat, mapLng]}>
                    <Popup>We are here</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}