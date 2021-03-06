import axios, { AxiosRequestConfig } from 'axios'
import fs, { ReadStream } from 'fs'

type DownloadResponse = {
  outputFilePath: string
  totalDownloadSize: number
  downloadedBytes: number
  contentType: string
}

type ProgressCallback = (progress: number) => void

export const fileDownload = (
  url: string,
  outputFilePath: string,
  progressCallback?: ProgressCallback,
  axiosRequestConfig?: AxiosRequestConfig
): Promise<DownloadResponse> => {
  return axios
    .get<ReadStream>(url, {
      responseType: 'stream',
      ...axiosRequestConfig
    })
    .then(
      response =>
        new Promise((resolve, reject) => {
          response.data.pipe(fs.createWriteStream(outputFilePath))

          const totalDownloadSize = response.headers['content-Length']
          const contentType: string = response.headers['content-type']
          let downloadedBytes = 0

          response.data.on('data', data => {
            downloadedBytes += Buffer.byteLength(data)

            const progress = Math.round(
              (downloadedBytes * 100) / totalDownloadSize
            )
            progressCallback?.(progress)
          })
          response.data.on('error', error => {
            response.data.close()
            reject(error)
          })
          response.data.on('end', () =>
            resolve({
              outputFilePath,
              totalDownloadSize,
              downloadedBytes,
              contentType
            })
          )
        })
    )
}
