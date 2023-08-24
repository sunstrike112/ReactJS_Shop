/* eslint-disable consistent-return */
import { getS3PresinedUrl } from 'APIs'

class CKUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader
  }

  // Starts the upload process.
  upload() {
    return this.loader.file
      .then((file) => new Promise((resolve, reject) => {
        this._request(file)
        this._listeners(resolve, reject, file)
      }))
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort()
    }
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  async _request(file) {
    const xhr = new XMLHttpRequest()
    this.xhr = xhr
    const { name: fileName, type: fileType } = file
    const fileList = [{
      fileName,
      fileType
    }]

    // Note that your request may look different. It is up to you and your editor
    // integration to choose the right communication channel. This example uses
    // a POST request with JSON as a data structure but your configuration
    // could be different.
    const { data } = await getS3PresinedUrl({ fileList })
    this.url = data[0].url
    xhr.open('PUT', data[0].preSignedURL, true)
    xhr.responseType = 'json'
    xhr.setRequestHeader('Content-Type', fileType)
    xhr.send(file)
  }

  // Initializes XMLHttpRequest listeners.
  _listeners(resolve, reject, file) {
    const { xhr } = this
    const { loader } = this
    const genericErrorText = `Couldn't upload file: ${file.name}.`

    xhr.addEventListener('error', () => reject(genericErrorText))
    xhr.addEventListener('abort', () => reject())
    xhr.addEventListener('load', () => {
      const { response, status } = xhr

      // This example assumes the XHR server's "response" object will come with
      // an "error" which has its own "message" that can be passed to reject()
      // in the upload promise.
      //
      // Your integration may handle upload errors in a different way so make sure
      // it is done properly. The reject() function must be called when the upload fails.
      if (status !== 200) {
        return reject(response && response.error ? response.error.message : genericErrorText)
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      // This URL will be used to display the image in the content. Learn more in the
      // UploadAdapter#upload documentation.
      resolve({
        default: this.url
      })
    })

    // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
    // properties which are used e.g. to display the upload progress bar in the editor
    // user interface.
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total
          loader.uploaded = evt.loaded
        }
      })
    }
  }
}

export default CKUploadAdapter
