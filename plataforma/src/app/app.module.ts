import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoguinComponent } from './loguin/loguin.component';
import { NgxLoadingModule } from 'ngx-loading';
import { AdministradorService } from "./services/administrador.services";
import { DocenteService } from "./services/docente.services";
import { EstudianteService } from "./services/estudiante.services";
import { CursoService } from "./services/curso.services";
import { FormsModule } from '@angular/forms';
import { AdministradorComponent } from './administrador/administrador.component';
import { DocenteComponent } from './docente/docente.component';
import { EstudianteComponent } from './estudiante/estudiante.component';

@NgModule({
  declarations: [
    AppComponent,
    LoguinComponent,
    AdministradorComponent,
    DocenteComponent,
    EstudianteComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxLoadingModule,
    FormsModule
  ],
  providers: [AdministradorService,DocenteService, EstudianteService, CursoService],
  bootstrap: [AppComponent],
})
export class AppModule { }
