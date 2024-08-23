// import {
//   Control,
//   FieldErrors,
//   UseFormRegister,
//   UseFormSetValue,
//   UseFormWatch,
// } from "react-hook-form"

export interface IOption {
  label: string
  value: string | number
}

export interface IToken {
  token: string
}

export interface IData {
  key: string
  value: string
}
export interface IResponse {
  token: string
  error: boolean
  error_code: number
  data: object
}

export interface IQueryContext {
  children?: JSX.Element
}

export interface IErrorPage {
  statusCode?: number
  message?: string
}

export interface INutritionScore {
  itemOne: Record<string, number>
  itemTwo: Record<string, number>
  itemThree: Record<string, number>
  itemFour: Record<string, number>
  itemFive: Record<string, number>
  itemSix: Record<string, number>
}

export type FileListOrNull = FileList | null

export interface UploadMedicalFilesProps {
  "12165": string
  "12458": number
  file_12787: FileList
  "1575181013916": string
  date: string
}
