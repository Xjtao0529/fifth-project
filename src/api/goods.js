import request from '@/utils/request'
export const goodsListAPI = (current, data) => {
  const query = {}
  for (const key in data) {
    if (data[key]) {
      query[key] = data[key]
    }
  }
  return request({
    url: `/goods/${current}`,
    method: 'GET',
    data: query
  })
}

export const getCateList = () => {
  return request({
    url: '/category',
    method: 'GET'
  })
}

export const getSkusList = (current) => {
  return request({
    url: `/skus/${current}`,
    method: 'get'
  })
}
