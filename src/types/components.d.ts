import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from "react"
import { Control, FieldValues, Path, RefCallBack } from "react-hook-form"
import { IOption } from "."

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonName: string
  fieldClassName?: string
  isLoading?: boolean
  guideContent?: React.ReactNode
  educationalContent?: React.ReactNode
}

export interface ICustomLineChart {
  chartData: { name: string; value: number }[]
}

export interface ISmallChart {
  generalData: {
    name: string
    value: { min: number; max: number }
    color: string
  }[]
  userData: { name: string; value: number }
  valuesLength: number
}

export interface ICheckBox extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  labelClassName?: string
  fieldClassName?: string
  options: IOption[]
  isError?: boolean
  guideContent?: React.ReactNode
  educationalContent?: React.ReactNode
}

export interface IDateInput<T extends FieldValues> {
  label: string
  id: Path<T>
  control: Control<T, unknown>
  labelClassName?: string
  fieldClassName?: string
  isError?: boolean
}

export interface IModal extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export interface IMultiSelectOption<T extends FieldValues> {
  label: string
  labelClassName?: string
  id: Path<T>
  containerClassName?: string
  fieldClassName?: string
  fieldContainerClassName?: string
  optionsClassName?: string
  defaultValues?: string | string[]
  options: IOption[]
  isError?: boolean
  control: Control<T, unknown>
  guideContent?: React.ReactNode | string
  educationalContent?: React.ReactNode
  ref?: RefCallBack
}

export interface IRadioButton extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  labelClassName?: string
  fieldClassName?: string
  options: IOption[]
  guideContent?: React.ReactNode
  educationalContent?: React.ReactNode
}

export interface ISelectOption extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  labelClassName?: string
  fieldClassName?: string
  optionClassName?: string
  options: IOption[]
  isError?: boolean
  educationalContent?: React.ReactNode
  guideContent?: React.ReactNode
}

export interface ITextInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  labelClassName?: string
  inDivClassName?: string
  fieldClassName?: string
  unit?: string
  isError?: boolean
  guideContent?: React.ReactNode
  archiveContent?: React.ReactNode
}

export interface IToastify {
  getError?: boolean
  postError?: boolean
  isSuccess?: boolean
  TextWarning?: string
}
