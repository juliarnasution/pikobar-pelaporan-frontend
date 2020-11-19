import request from '@/utils/request'

export function requestServer(url, method, data, onProgress) {
  if ((method === 'GET') || method === 'DELETE') {
    return request({
      url: url,
      method: method,
      params: data
    })
  } else if ((method === 'PUT') || (method === 'POST')) {
    return request({
      url: url,
      method: method,
      data
    })
  } else if (method === 'UPLOAD') {
    return request({
      url: url,
      method: 'POST',
      data,
      onUploadProgress: function(e) {
        if (e.lengthComputable) {
          const percentCompleted = Math.round((e.loaded * 100) / e.total)
          if (onProgress) onProgress(percentCompleted)
          return percentCompleted
        }
      }
    })
  }
}

export default requestServer
