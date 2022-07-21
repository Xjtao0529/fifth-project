import request from '@/utils/request'
export const goodsListAPI = (current, data) => {
  // const query = {}
  // for (const key in data) {
  //   if (data[key]) {
  //     query[key] = data[key]
  //   }
  // }
  return request({
    url: `/goods/${current}`,
    method: 'GET',
    data
  })
}
