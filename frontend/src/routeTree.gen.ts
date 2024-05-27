/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as WelcomeImport } from './routes/welcome'
import { Route as VehiclesImport } from './routes/vehicles'
import { Route as SignupImport } from './routes/signup'
import { Route as SettingsImport } from './routes/settings'
import { Route as SearchImport } from './routes/search'
import { Route as RentImport } from './routes/rent'
import { Route as PrivacyImport } from './routes/privacy'
import { Route as OfficesImport } from './routes/offices'
import { Route as LoginImport } from './routes/login'
import { Route as ContactImport } from './routes/contact'
import { Route as AdminImport } from './routes/admin'
import { Route as LayoutImport } from './routes/_layout'
import { Route as LayoutIndexImport } from './routes/_layout/index'
import { Route as AdminVehiclesImport } from './routes/admin/vehicles'
import { Route as AdminUsersImport } from './routes/admin/users'
import { Route as AdminRentsImport } from './routes/admin/rents'
import { Route as AdminOfficesImport } from './routes/admin/offices'

// Create/Update Routes

const WelcomeRoute = WelcomeImport.update({
  path: '/welcome',
  getParentRoute: () => rootRoute,
} as any)

const VehiclesRoute = VehiclesImport.update({
  path: '/vehicles',
  getParentRoute: () => rootRoute,
} as any)

const SignupRoute = SignupImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const SettingsRoute = SettingsImport.update({
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any)

const SearchRoute = SearchImport.update({
  path: '/search',
  getParentRoute: () => rootRoute,
} as any)

const RentRoute = RentImport.update({
  path: '/rent',
  getParentRoute: () => rootRoute,
} as any)

const PrivacyRoute = PrivacyImport.update({
  path: '/privacy',
  getParentRoute: () => rootRoute,
} as any)

const OfficesRoute = OfficesImport.update({
  path: '/offices',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const ContactRoute = ContactImport.update({
  path: '/contact',
  getParentRoute: () => rootRoute,
} as any)

const AdminRoute = AdminImport.update({
  path: '/admin',
  getParentRoute: () => rootRoute,
} as any)

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)

const AdminVehiclesRoute = AdminVehiclesImport.update({
  path: '/vehicles',
  getParentRoute: () => AdminRoute,
} as any)

const AdminUsersRoute = AdminUsersImport.update({
  path: '/users',
  getParentRoute: () => AdminRoute,
} as any)

const AdminRentsRoute = AdminRentsImport.update({
  path: '/rents',
  getParentRoute: () => AdminRoute,
} as any)

const AdminOfficesRoute = AdminOfficesImport.update({
  path: '/offices',
  getParentRoute: () => AdminRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/admin': {
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/contact': {
      preLoaderRoute: typeof ContactImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/offices': {
      preLoaderRoute: typeof OfficesImport
      parentRoute: typeof rootRoute
    }
    '/privacy': {
      preLoaderRoute: typeof PrivacyImport
      parentRoute: typeof rootRoute
    }
    '/rent': {
      preLoaderRoute: typeof RentImport
      parentRoute: typeof rootRoute
    }
    '/search': {
      preLoaderRoute: typeof SearchImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      preLoaderRoute: typeof SettingsImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/vehicles': {
      preLoaderRoute: typeof VehiclesImport
      parentRoute: typeof rootRoute
    }
    '/welcome': {
      preLoaderRoute: typeof WelcomeImport
      parentRoute: typeof rootRoute
    }
    '/admin/offices': {
      preLoaderRoute: typeof AdminOfficesImport
      parentRoute: typeof AdminImport
    }
    '/admin/rents': {
      preLoaderRoute: typeof AdminRentsImport
      parentRoute: typeof AdminImport
    }
    '/admin/users': {
      preLoaderRoute: typeof AdminUsersImport
      parentRoute: typeof AdminImport
    }
    '/admin/vehicles': {
      preLoaderRoute: typeof AdminVehiclesImport
      parentRoute: typeof AdminImport
    }
    '/_layout/': {
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  LayoutRoute.addChildren([LayoutIndexRoute]),
  AdminRoute.addChildren([
    AdminOfficesRoute,
    AdminRentsRoute,
    AdminUsersRoute,
    AdminVehiclesRoute,
  ]),
  ContactRoute,
  LoginRoute,
  OfficesRoute,
  PrivacyRoute,
  RentRoute,
  SearchRoute,
  SettingsRoute,
  SignupRoute,
  VehiclesRoute,
  WelcomeRoute,
])

/* prettier-ignore-end */
