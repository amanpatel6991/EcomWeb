import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Contact} from "../../common/Models/contact.model";
import {Subscription} from "rxjs/Rx";
import {FirebaseService} from "../../common/services/firebase.service";

// import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


declare var  ol: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit,OnDestroy {

  queries: Contact;

  contactForm: FormGroup;
  contactInfo: Contact;


  latitude: number = 28.55;
  longitude: number = 77.499;

  map: any;


  // phoneNoPattern = '';

  constructor(db: AngularFireDatabase,private firebaseService: FirebaseService) {

  }

  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.contactInfo = new Contact;
    this.initContctForm();

    var mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });

    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([77.499, 28.5204]),
        zoom: 9
      })
    });

    this.map.on('click', function (args) {
      // console.log(args);
      var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      // console.log(lonlat);

      // var lon = lonlat[0];
      // var lat = lonlat[1];
      // alert(`lat: ${lat} long: ${lon}`);
    });

    //firebase
    this.firebaseService.getQueries().subscribe( data => {
        console.log(data);
        // console.log(data[0].payload.doc.data())
    });

  }


  ngOnDestroy() {
    this.subscriptions.forEach((value, index, array) => value.unsubscribe());
  }

  initContctForm() {
    this.contactForm = new FormGroup({
      'name': new FormControl(this.contactInfo.name,  Validators.required),
      'email': new FormControl(this.contactInfo.email, [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]),
      'phone': new FormControl(this.contactInfo.phone, null),
      'query': new FormControl(this.contactInfo.query, null),
    });
  }

  onSubmitQuery() {
    console.log(this.contactInfo);
    // this.createUserQuery(this.contactInfo);
  }

  setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(8);
  }

  createUserQuery(query: Contact){
    this.firebaseService.createQuery(query);
  }

  //not to be used
  updateUserQuery(query: Contact) {
    this.firebaseService.updateQuery(query);
  }

  deleteUserQuery(id: string) {
    this.firebaseService.deleteQuery(id);
  }

}
