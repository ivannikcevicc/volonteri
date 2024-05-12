"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import React from "react";
//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

interface Props {
  center?: number[];
}
const Map = ({ center }: Props) => {
  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [42.442574, 19.268646]}
      zoom={center ? 11 : 8}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {center && <Marker position={center as L.LatLngExpression}></Marker>}
    </MapContainer>
  );
};
export default Map;
