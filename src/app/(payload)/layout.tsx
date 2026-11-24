import React from 'react'
import { RootLayout } from '@payloadcms/next/layouts'
import configPromise from '@payload-config'
import { importMap } from './importMap'
import { serverFunction } from './serverFunctions'

type Args = {
  children: React.ReactNode
}

export default async function PayloadLayout({ children }: Args) {
  return (
    <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
