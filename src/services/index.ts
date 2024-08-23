import axios from "axios"
import { baseURL, GWT } from "@/config/config"
import { bToA } from "@/utils/helpers"

export const smartRequest = async (
  jobId?: number,
  dataInfo?: object | FormData
) => {
  console.log(dataInfo)

  const formData = new FormData()
  for (var key in dataInfo)
    if (key.startsWith("file_")) {
      let original_file_key = key.replace("file_", "")
      formData.append(original_file_key, dataInfo[original_file_key])
      delete dataInfo[original_file_key]
    }

  const token = localStorage.getItem("token")
  const detail = dataInfo ? bToA(dataInfo) : bToA({})

  formData.append("detail", detail)
  formData.append("jobId", `${jobId}`)
  formData.append("token", `${token}`)
  formData.append("gwt", GWT)

  const response = await axios({
    method: "POST",
    url: baseURL,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  console.log(response.data)

  return response.data
}

interface IRequestFunctionParams {
  jobId?: number
  dataInfo?: object | FormData
  page?: number
  pageSize?: number
}

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 10

export const requestFunction = async ({
  jobId,
  dataInfo,
  page = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
}: IRequestFunctionParams) => {
  const formData = new FormData()
  const newDataInfo = {}

  for (const key in dataInfo) {
    if (key.startsWith("file_")) {
      //@ts-expect-error Explanation: FormData's key must be a string.
      // Append file to FormData directly
      formData.append(key, dataInfo[key][0])
    } else {
      //@ts-expect-error Explanation: FormData's key must be a string.
      newDataInfo[key] = dataInfo[key]
    }
  }

  const token = localStorage.getItem("token")
  const detail = {}

  // Iterate through newDataInfo to include it in detail
  for (const key in newDataInfo) {
    //@ts-expect-error Explanation: FormData's key must be a string.
    detail[key] = newDataInfo[key]
  }

  // Include file in detail
  for (const key in dataInfo) {
    if (key.startsWith("file_")) {
      //@ts-expect-error Explanation: FormData's key must be a string.
      // Assuming you want to include the file in detail
      detail[key] = dataInfo[key][0].name
      // You can include whatever file information you need
    }
  }

  // const detailBase64 = bToA(detail);
  const detailBase64 = detail ? bToA(detail) : bToA({})

  formData.append("detail", detailBase64)
  formData.append("jobId", `${jobId}`)
  formData.append("token", `${token}`)
  formData.append("gwt", GWT)
  formData.append("offset", ((page - 1) * pageSize).toString())
  formData.append("limit", pageSize.toString())
  // console.log("THis is Detail:", detailBase64);
  // console.log("THis is newDataInfo:", JSON.stringify(newDataInfo));
  // console.log("THis is atob:", bToA({ detailBase64 }));

  const response = await axios({
    method: "POST",
    url: baseURL,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}
