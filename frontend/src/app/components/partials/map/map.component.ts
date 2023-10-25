import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  LatLng,
  LatLngExpression,
  LatLngTuple,
  LeafletMouseEvent,
  Map,
  Marker,
  icon,
  map,
  marker,
  tileLayer,
} from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges {
  @Input()
  order!: Order;
  @Input()
  readonly = false;
  private readonly DEFAULT_LATLNG: LatLngTuple = [36.806389, 10.181667];
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  // select tag from html
  //{static:true} makes it available in ngoninit
  @ViewChild('map', { static: true })
  mapRef!: ElementRef;
  map!: Map;
  currentMarker!: Marker;
  constructor(private locationservice: LocationService) {}

  ngOnChanges(): void {
    if (!this.order) return;
    this.initializeMap();
    if (this.readonly && this.addressLatLng) {
      //show the marker on the order location
      this.setMarker(this.addressLatLng);
      //disable anything related to the map
      this.map.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);

      this.map.dragging.disable()
      this.map.touchZoom.disable()
      this.map.doubleClickZoom.disable()
      this.map.boxZoom.disable()
      this.map.scrollWheelZoom.disable()
      this.map.keyboard.disable()
      this.map.off('click')
      this.map.tap?.disable()
      this.currentMarker.dragging?.disable()
    }
  }
  initializeMap() {
    if (this.map) return;
    //map leaflet function to create a map & Map is a type
    //1st param is refrence
    //2nd param is option(false to not show the leaflet at the right botton of map/zoom level:1 to show whole world)
    //3rd param is
    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false,
    }).setView(this.DEFAULT_LATLNG, 1);
    //how we want to show the map after u created it ?
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(
      this.map
    );
    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    });
  }

  findMyLocation() {
    this.locationservice.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      },
    });
  }

  setMarker(latlng: LatLngExpression) {
    //instead of a getter
    this.addressLatLng = latlng as LatLng;
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }
    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON,
    }).addTo(this.map);

    //event listener to get current marker location after u drag it
    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    });
  }

  //to set lat and lang to the order
  set addressLatLng(latlng: LatLng) {
    if (!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  get addressLatLng() {
    return this.order.addressLatLng!;
  }
}
