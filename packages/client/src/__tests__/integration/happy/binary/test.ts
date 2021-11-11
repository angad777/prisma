import { getNodeAPIName, getPlatform } from '@prisma/get-platform'
import fs from 'fs'
import path from 'path'
import { ClientEngineType, getClientEngineType } from '../../../../runtime/utils/getClientEngineType'
import { generateTestClient } from '../../../../utils/getTestClient'

test('binary', async () => {
  expect.assertions(1)
  await generateTestClient()

  const platform = await getPlatform()
  const binaryPath =
    getClientEngineType() === ClientEngineType.Library
      ? path.join(__dirname, 'node_modules/.prisma/client', getNodeAPIName(platform, 'fs'))
      : path.join(__dirname, 'node_modules/.prisma/client', `query-engine-${platform}`)
  expect(fs.existsSync(binaryPath)).toBe(true)
})
