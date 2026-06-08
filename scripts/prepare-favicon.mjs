import { execFileSync } from "node:child_process"
import { existsSync, mkdtempSync, readFileSync, readdirSync, renameSync } from "node:fs"
import { rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { basename, join } from "node:path"

const appDir = join(process.cwd(), "app")
const expectedName = "favicon.ico"
const faviconPath = join(appDir, expectedName)
const faviconEntry = readdirSync(appDir).find(
  (entry) => entry.toLowerCase() === expectedName
)

if (!faviconEntry) {
  console.log("favicon: no app/favicon.ico found, skipping")
  process.exit(0)
}

if (faviconEntry !== expectedName) {
  const originalPath = join(appDir, faviconEntry)
  const temporaryPath = join(appDir, `.tmp-${Date.now()}-${basename(faviconEntry)}`)

  renameSync(originalPath, temporaryPath)
  renameSync(temporaryPath, faviconPath)
}

if (!existsSync(faviconPath)) {
  console.log("favicon: no app/favicon.ico found, skipping")
  process.exit(0)
}

const header = readFileSync(faviconPath).subarray(0, 4)
const isIcon =
  header.length === 4 &&
  header[0] === 0x00 &&
  header[1] === 0x00 &&
  header[2] === 0x01 &&
  header[3] === 0x00

if (isIcon) {
  console.log("favicon: app/favicon.ico is already a valid ICO")
  process.exit(0)
}

const tempDir = mkdtempSync(join(tmpdir(), "alertwise-favicon-"))
const sourcePath = join(tempDir, "source")

try {
  renameSync(faviconPath, sourcePath)
  execFileSync(
    "magick",
    [
      sourcePath,
      "-define",
      "icon:auto-resize=64,48,32,16",
      faviconPath,
    ],
    { stdio: "inherit" }
  )
  console.log("favicon: converted app/favicon.ico to a browser-ready ICO")
} catch (error) {
  try {
    renameSync(sourcePath, faviconPath)
  } catch {
    // Keep the original conversion error visible.
  }

  throw error
} finally {
  await rm(tempDir, { force: true, recursive: true })
}
