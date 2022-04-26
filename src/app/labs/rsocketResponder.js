export default class RSocketResponder {
  constructor () {
    console.log('RSocketResponder created.');
  }

  fireAndForget (payload) {
    console.log('From server, ', payload);

    // if(payload.metadata.get(Metadata.ROUTE) == "send.to.location") {
    //     const radar = payload.data;
    //     this.map.panTo([radar.location.lat, radar.location.lng]);
    // }
  }
}
