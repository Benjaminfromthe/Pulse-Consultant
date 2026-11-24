'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'
import configPromise from '@payload-config'
import { importMap } from './importMap'
import type { ServerFunctionArgs } from 'payload'

export const serverFunction = async (args: ServerFunctionArgs) => {
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}
