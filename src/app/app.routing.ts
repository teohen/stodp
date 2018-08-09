import { Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule } from '@angular/router/';

import { ComponenteLoginComponent } from './modulo-usuario/componente-login/componente-login.component';
import { ComponenteCadastroComponent } from './modulo-usuario/componente-cadastro/componente-cadastro.component';
import { ComponenteHomeComponent } from './modulo-raiz/componente-home/componente-home.component';
import { ComponenteGrupoDetalheComponent } from './modulo-grupo/componente-grupo-detalhe/componente-grupo-detalhe.component';
import { ComponenteGrupoComponent } from './modulo-grupo/componente-grupo/componente-grupo.component';
import { ComponenteSairComponent } from './modulo-menu/componente-sair/componente-sair.component';

const APP_ROUTING: Routes = [
    { path: '', component: ComponenteLoginComponent },
    { path: 'cadastro', component: ComponenteCadastroComponent },
    { path: 'login', component: ComponenteLoginComponent },
    { path: 'home', component: ComponenteHomeComponent },
    { path: 'grupos', component: ComponenteGrupoComponent },
    { path: 'grupo/:id', component: ComponenteGrupoDetalheComponent},
    { path: 'sair', component: ComponenteSairComponent}
];
const APP_SUBROUTING: Routes = [
    
]
export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTING);
export const subrouting: ModuleWithProviders = RouterModule.forChild(APP_SUBROUTING);