import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CinemaService} from "../services/cinema.service";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  public villes: any;
  public cinemas: any;
  public salles: any;
  public currentVille: any;
  public currentCinema: any;
  public currentProjection: any;


  constructor(public cinemaService:CinemaService) { }

  ngOnInit(): void {


    // @ts-ignore
    this.cinemaService.getVilles()._subscribe((data: any) => {
        this.villes=data;
        //console.log(this.villes);
      }// @ts-ignore
      ,(err: any) =>{
      console.log(err);
    })
  }

  onGetCinemas(v:any) {
    this.currentVille=v;
    this.salles=undefined;
    this.cinemaService.getCinemas(v)._subscribe((data: any) => {
        this.cinemas=data;
        console.log(this.cinemas);
      }// @ts-ignore
      ,(err: any) =>{
        console.log(err);
      })
  }

  onGetSalle(c: any) {
    this.currentCinema=c;
    this.cinemaService.getSalles(c)._subscribe((data: any) => {
        this.salles=data;
        this.salles.body._embedded.salles.forEach((salle: any)=>{
          this.cinemaService.getProjections(salle)._subscribe((data: any) => {
              salle.projections=data;

            }// @ts-ignore
            ,(err: any) =>{
              console.log(err);
            })
        })

      }// @ts-ignore
      ,(err: any) =>{
        console.log(err);
      })
  }

  onGetTicketsPlaces(p: any) {
    this.currentProjection = p;
    this.cinemaService.getPlaces(p)._subscribe((data: any) => {
        this.currentProjection.tickets=data;
        console.log(this.currentProjection.tickets.body._embedded.tickets);

      }// @ts-ignore
      ,(err: any) =>{
        console.log(err);
      })
  }
}
