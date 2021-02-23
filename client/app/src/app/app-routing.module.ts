import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FolderPageModule} from "./folder/folder.module";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Pokemon',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: (): Promise<void | FolderPageModule> => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
