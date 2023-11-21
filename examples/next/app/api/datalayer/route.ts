import { datalayer } from 'fuse/next'
import { builder } from 'fuse'

// TODO: add these imports by means of i.e. a plugin
import '../../../types/Defer'
import '../../../types/Film'
import '../../../types/Planet'
import '../../../types/Resident'
import '../../../types/User'

export const dynamic = 'force-dynamic'
export const GET = datalayer(builder)
export const POST = datalayer(builder)
