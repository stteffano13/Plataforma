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
import { MatriculaService } from './services/matricula.services';
import { MateriaService } from './services/materia.services';
import { NotaService} from './services/nota.services';
import { InsumoService} from './services/insumo.services';
//import {ExcelService} from './sharedServices/excel.service';
import { FormsModule } from '@angular/forms';
import { AdministradorComponent } from './administrador/administrador.component';
import { DocenteComponent } from './docente/docente.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NuuComponent } from './nuu/nuu.component';
import { ExcelService } from '../app/services/excel.service'


@NgModule({
  declarations: [
    AppComponent,
    LoguinComponent,
    AdministradorComponent,
    DocenteComponent,
    EstudianteComponent,
    NuuComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxLoadingModule,
    FormsModule,
    ComboBoxModule,
    BrowserAnimationsModule
  ],
  providers: [ExcelService,AdministradorService,DocenteService, EstudianteService, CursoService, MatriculaService,MateriaService, NotaService,InsumoService,ExcelService],
  bootstrap: [AppComponent],
})
export class AppModule { }
