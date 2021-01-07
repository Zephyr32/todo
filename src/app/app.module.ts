import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EditDataDialogComponent } from './edit-data-dialog/edit-data-dialog.component';
import { TaskComponent } from './list/task/task.component';
import { ListComponent } from './list/list.component';
import { FilterPipe } from './model/pipe';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from './store/efects/task.effects';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ListComponent,
    FilterPipe,
    EditDataDialogComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    ScrollingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument ({
      maxAge: 25, // Сохраняет последние 25 состояний
      logOnly: environment.production, // Ограничить расширение только режимом журнала
      }),
      EffectsModule.forRoot([TasksEffects, ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
