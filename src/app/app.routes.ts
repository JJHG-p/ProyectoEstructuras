import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    },
    {
        path: 'registro',
        loadComponent: () => import('./pages/registro/registro').then(m => m.Registro)
    },
    {
        path: '',
        pathMatch: 'full',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./shared/layout/layout').then(m => m.Layout),
        children: [
            {
                path: 'catalogo',
                loadComponent: () => import('./pages/catalogo/catalogo').then(m => m.Catalogo)
            },
            {
                path: 'producto/:id',
                loadComponent: () =>
                import('./pages/producto-detalle/producto-detalle').then(m => m.ProductoDetalle)
            },
            {
                path: 'publicar',
                loadComponent: () => import('./pages/publicar/publicar').then(m => m.Publicar)
            },
            {
                path: 'publicar/:id',
                loadComponent: () => import('./pages/publicar/publicar').then(m => m.Publicar)
            },
            {
                path: 'carrito',
                loadComponent: () => import('./pages/carrito/carrito').then(m => m.Carrito)
            },
            {
                path: 'favoritos',
                loadComponent: () => import('./pages/favoritos/favoritos').then(m => m.Favoritos)
            },
            {
                path: 'chat',
                loadComponent: () => import('./pages/chat/chat').then(m => m.Chat)
            },
            {
                path: 'categorias',
                loadComponent: () => import('./pages/categorias/categorias').then(m => m.Categorias)
            },
            {
                path: 'campus',
                loadComponent: () => import('./pages/campus/campus').then(m => m.Campus)
            },
            {
                path: 'perfil',
                loadComponent: () => import('./pages/perfil/perfil').then(m => m.Perfil)
            }
        ]
    },

    { path: '**', redirectTo: '' }
];
