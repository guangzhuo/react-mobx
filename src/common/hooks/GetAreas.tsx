import { useState, useEffect } from 'react'
import { message } from 'antd'
import * as APIS from 'common/apis'

const GetAreas = (dep: string) => {
  const [areaData, setAreaData] = useState(null)

  useEffect(() => {
    APIS.getAreas()
      .then((res) => {
        const { content } = res.data.data
        setAreaData(content)
      })
      .catch((error) => {
        if (error.response) {
          message.error(error.response.data.message)
        }
      })
  }, [dep])
  return areaData
}

export default GetAreas
