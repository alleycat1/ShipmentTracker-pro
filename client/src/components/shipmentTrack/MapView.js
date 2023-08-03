import React, { Component } from 'react';
import { Map, TileLayer, Polyline, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from './mapdata.json';
import Markers from './VenueMarkers';
const qmdata = [];
data.map((pointDetail, index, arr) => {
  return qmdata.push({
    lat: arr[index].geometry[0],
    long: arr[index].geometry[1]
  });
});

const mdata = [];
for (var i = 0; i < qmdata.length - 1; i++) {
  mdata.push({
    from_lat: qmdata[i].lat,
    from_long: qmdata[i].long,
    to_lat: qmdata[i + 1].lat,
    to_long: qmdata[i + 1].long
  });
}

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: mdata[0].from_lat, lng: mdata[0].from_long },
      zoom: 12,
      data: mdata
    };
  }

  render() {
    const { zoom } = this.state;
    const getLatLngBounds = () => {
      return [
        [qmdata[0].lat, qmdata[0].long],
        [qmdata[qmdata.length - 1].lat, qmdata[qmdata.length - 1].long]
      ];
    };

    return (
      <Map zoom={zoom} bounds={getLatLngBounds()}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="topright" />
        <Markers venues={data} />
        {this.state.data.map(({ id, from_lat, from_long, to_lat, to_long }) => {
          return (
            <Polyline
              positions={[
                [from_lat, from_long],
                [to_lat, to_long]
              ]}
              color={'blue'}
              dashArray={'10'}
            />
          );
        })}
      </Map>
    );
  }
}
export default MapView;
