/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as authLayoutImport } from './routes/(auth)/_layout'
import { Route as authLayoutLoginImport } from './routes/(auth)/_layout/login'
import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as LayoutIndexImport } from './routes/_layout/index'
import { Route as LayoutWhateverImport } from './routes/_layout/whatever'

// Create Virtual Routes

const authImport = createFileRoute('/(auth)')()

// Create/Update Routes

const authRoute = authImport.update({
  id: '/(auth)',
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

const LayoutWhateverRoute = LayoutWhateverImport.update({
  path: '/whatever',
  getParentRoute: () => LayoutRoute,
} as any)

const authLayoutRoute = authLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => authRoute,
} as any)

const authLayoutLoginRoute = authLayoutLoginImport.update({
  path: '/login',
  getParentRoute: () => authLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/(auth)': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/_layout': {
      id: '/_layout'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authLayoutImport
      parentRoute: typeof authRoute
    }
    '/_layout/whatever': {
      id: '/_layout/whatever'
      path: '/whatever'
      fullPath: '/whatever'
      preLoaderRoute: typeof LayoutWhateverImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
    '/(auth)/_layout/login': {
      id: '/_layout/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLayoutLoginImport
      parentRoute: typeof authLayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  LayoutRoute: LayoutRoute.addChildren({
    LayoutWhateverRoute,
    LayoutIndexRoute,
  }),
  authRoute: authRoute.addChildren({
    authLayoutRoute: authLayoutRoute.addChildren({ authLayoutLoginRoute }),
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_layout",
        "/"
      ]
    },
    "/_layout": {
      "filePath": "(auth)/_layout.tsx",
      "parent": "/",
      "children": [
        "/_layout/login"
      ]
    },
    "/": {
      "filePath": "(auth)",
      "children": [
        "/_layout"
      ]
    },
    "/_layout/whatever": {
      "filePath": "_layout/whatever.tsx",
      "parent": "/_layout"
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/login": {
      "filePath": "(auth)/_layout/login.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
