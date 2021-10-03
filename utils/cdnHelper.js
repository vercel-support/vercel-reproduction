const bucket = 'germany'

export const isImage = (file) => {
  const regex = new RegExp(/^.*\.(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)/, 'g')
  return regex.test(file)
}

export const isJson = (file) => {
  const regex = new RegExp(/^.*\.(json|JSON)/, 'g')
  return regex.test(file)
}

export const checkExistence = (cdn, username, node, type='jpg') => {
  const { id } = node?.cdn;

  return new Promise((resolve, reject) => {
     cdn.statObject(bucket, `data/${username}/${id}.${type}`, (err, res) => {
       if(res) {
         resolve({id})
       }
       reject(node)   
     })
   })
}  

export const sortJsonNodes = (nodes) => (nodes.sort((a,b) => b['timestamp'] - a['timestamp']))
