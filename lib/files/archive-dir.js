import fs from 'fs'
import archiver from 'archiver'

export default function archiveDir (zipfilepath, dirpath) {
  return new Promise((resolve, reject) => {
    // create a file to stream archive data to.
    const output = fs.createWriteStream(zipfilepath)
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    })

    output.on('close', function() {
      resolve(archive.pointer() + ' total bytes')
    })

    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function() {
      console.log('Data has been drained')
    })

    archive.on('warning', function(err) {
      if (err.code === 'ENOENT') {
        // log warning
      } else {
        reject(err)
      }
    })

    archive.on('error', function(err) {
      reject(err)
    })

    archive.pipe(output)
    archive.directory(dirpath, false)
    archive.finalize()
  })
}
