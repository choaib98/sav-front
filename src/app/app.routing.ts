import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';


// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'example'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)},

        ]
    },

    // LandingHome routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {
                path: 'homeFuse',
                loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)
            },
        ]
    },

    // Admin routes
    {
        path       : '',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},

            // Maintenance
            {
                path: 'maintenance',
                loadChildren: () => import('app/modules/pages/maintenance/maintenance.module').then(m => m.MaintenanceModule),
            },
            {path: 'sav', children: [
                {path: 'control', loadChildren: () => import('app/modules/admin/sav/sav.module').then(m => m.SavModule)},
                {path: 'charge', loadChildren: () => import('app/modules/admin/charge-sav/charge-sav.module').then(m => m.ChargeSavModule)},
                {path: 'traiterdossier/:demandeSavId', loadChildren: () => import('app/modules/admin/traiter-dossier/traiter-dossier.module').then(m => m.TraiterDossierModule)},

                {path: 'dossier/:id/operations', loadChildren: () => import('app/modules/admin/operation/operation.module').then(m => m.OperationModule)},
             //   {path: 'operations', loadChildren: () => import('app/modules/admin/operation/operation.module').then(m => m.OperationModule)},
                {path: 'dossier/:dossierId/operation/:id', loadChildren: () => import('app/modules/admin/operation/creer-demandeSav/creer-demandeSav.module').then(m => m.CreerDemandeSavModule)},
                {path: 'dossier', loadChildren: () => import('app/modules/admin/dossier/dossier.module').then(m => m.DossierModule)
            },
           ]},
           {path: 'test', children: [
            {path: 'test', loadChildren: () => import('app/modules/admin/test2/fields/fields.module').then(m => m.FormsFieldsModule)},
            {path: 'test2', loadChildren: () => import('app/modules/admin/test1/test1.module').then(m => m.FormsWizardsModule)},

           // {path: 'finance', loadChildren: () => import('app/modules/admin/dashboards/finance/finance.module').then(m => m.FinanceModule)},
           // {path: 'crypto', loadChildren: () => import('app/modules/admin/dashboards/crypto/crypto.module').then(m => m.CryptoModule)},
       ]},
       {path: 'auth', children: [
        {path: 'signin', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
        // {path: 'test2', loadChildren: () => import('app/modules/admin/test1/test1.module').then(m => m.FormsWizardsModule)},
       // {path: 'finance', loadChildren: () => import('app/modules/admin/dashboards/finance/finance.module').then(m => m.FinanceModule)},
       // {path: 'crypto', loadChildren: () => import('app/modules/admin/dashboards/crypto/crypto.module').then(m => m.CryptoModule)},
   ]},


            // 404 & 500 & Catch all
            {
                path: '404-not-found',
                pathMatch: 'full',
                loadChildren: () => import('app/modules/pages/error/error-404/error-404.module').then(m => m.Error404Module)
            },
            {
                path: '500-server-error',
                loadChildren: () => import('app/modules/pages/error/error-500/error-500.module').then(m => m.Error500Module)
            },
            {
                path: '**',
                redirectTo: '404-not-found'
            }
        ]
    }
];
