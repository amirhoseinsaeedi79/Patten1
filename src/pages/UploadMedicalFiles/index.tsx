//--------------------------------------------------------------------------------------------------
// First Version of the component:
import { ChangeEvent, useEffect, useState } from "react"
import moment from "jalali-moment"

import { DateInput } from "@/components/ui/DateInput"
import { Modal } from "@/components/ui/Modal"
import { Button } from "@/components/ui/Button"
import { SelectOption } from "@/components/ui/SelectOption"
import { TextInput } from "@/components/ui/TextInput"
import { Spinner } from "@/components/ui/Spinner"
import { SquareSpinner } from "@/components/ui/SquareSpinner"
import { Toastify } from "@/components/ui/Toastify"
import {
  CF_JobId_Submit,
  PROGRAM_LIST_JobId_Get,
  TABLE_DATA_JobId_Delete,
  TABLE_DATA_JobId_Get,
} from "@/constants/jobId"
import {
  uploadDocTypeOptions,
  valideUploadFileType,
} from "@/constants/localData"
import { useForm, useWatch } from "react-hook-form"
import { requestFunction, smartRequest } from "@/services"
import { IOption } from "@/types"

import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"

import { text } from "./text"
import { fileToBase64 } from "@/utils/helpers"

// interface ITableData {
//   "12165": string;
//   "12458": string;
//   "12787": string;
//   file_12787: FileList | null; // Modified to accept FileList or null
//   "1575181013916": string;
//   "13856": string;
//   id_: number;
// }

interface ITableData {
  "12165": string // visit date
  "12458": number // uploaded doc type
  "12787": string // file source
  file_12787: object // Modified to accept FileList or null
  "1575181013916": string
  "13856": string // upload date
  id_: number
}

const UploadMedicalFiles = () => {
  const [showData, setShowData] = useState(false)
  const [optionsData, setOptionData] = useState<IOption[]>([
    { value: 5071, label: text.other },
  ])
  const [userTableData, setUserTableData] = useState<ITableData[]>([])
  const [fileInfo, setFileInfo] = useState<FileList | null>(null)
  const {
    control,
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm<ITableData>({
    mode: "all",
  })

  // const formRef = useRef<HTMLFormElement>(null);

  const pageSize = +5
  const [page, setPage] = useState(1)

  const limit = pageSize
  const offset = pageSize * (page - 1)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    setFileInfo(files)
    return files
  }

  const { data: programsList } = useQuery({
    queryKey: ["userData", PROGRAM_LIST_JobId_Get],
    queryFn: () => requestFunction({ jobId: PROGRAM_LIST_JobId_Get }),
  })

  useEffect(() => {
    if (
      programsList &&
      !programsList.error &&
      programsList.data !== undefined
    ) {
      {
        const newOptionData = programsList.data
        setOptionData([...newOptionData, ...optionsData])
      }
    }
  }, [programsList])

  const {
    data: tableData,
    isSuccess: tableDataSuccess,
    isLoading: tableDataLoading,
    isError: tableDataError,
    isFetching,
    refetch: refetchData,
  } = useQuery({
    queryKey: ["userData", TABLE_DATA_JobId_Get, { page, pageSize }],
    queryFn: () =>
      requestFunction({
        jobId: TABLE_DATA_JobId_Get,
        dataInfo: { offset, limit },
        page: page,
        pageSize: pageSize,
      }),
    placeholderData: keepPreviousData,
  })

  const {
    mutate: deleteMutate,
    isSuccess: deleteSuccess,
    isPending: deleteLoading,
  } = useMutation({
    mutationKey: ["postUserData", TABLE_DATA_JobId_Delete],
    mutationFn: (dataInfo: object) =>
      requestFunction({ jobId: TABLE_DATA_JobId_Delete, dataInfo }),
    onSuccess: () => {
      refetchData()
      const newData = tableData.data
      setUserTableData(newData)
    },
  })

  // console.log(deleteSuccess);
  const handleDelete = (id: number) => {
    deleteMutate({ id: id })
    deleteSuccess &&
      setUserTableData((prevState) => prevState.filter((_, i) => i !== id))
  }

  useEffect(() => {
    const today = moment(new Date()).locale("fa").format("YYYY/MM/DD")
    setValue("13856", today)
    setValue("12165", "1403/05/10")
  }, [])

  const {
    mutate: submitMutate,
    isPending: submitLoading,
    isError: submitError,
    isSuccess: submitSuccess,
  } = useMutation({
    mutationKey: ["Submit Files", CF_JobId_Submit],
    mutationFn: (dataInfo: ITableData) =>
      smartRequest(CF_JobId_Submit, dataInfo),
    onSuccess: () => {
      reset()
      refetchData()
      const newData = tableData.data
      setUserTableData(newData)
    },
  })

  useEffect(() => {
    if (
      tableDataSuccess &&
      tableData &&
      !tableData.error &&
      tableData.data !== undefined
    ) {
      {
        const newData = tableData.data
        setUserTableData(newData)
      }
    }
  }, [tableData, tableDataSuccess])

  const onSubmit = async (data: ITableData) => {
    try {
      if (fileInfo) {
        if (valideUploadFileType.has(fileInfo["0"]?.type)) {
          console.log(fileInfo)
          data.file_12787 = true
          data["12787"] = fileInfo["0"]
          submitMutate(data)
          refetchData()
          setUserTableData(tableData.data)
        } else {
          alert(
            "فرمت فایل انتخابی اشتباه است. فرمت های مورد قبول: jpg, jpeg, png, pdf"
          )
        }
      } else {
        data.file_12787 = fileInfo || {}
        submitMutate(data)
        refetchData()
        setUserTableData(tableData.data)
      }
    } catch (error) {
      console.error("Submission failed:", error)
    }
  }

  return (
    <div className="w-full">
      {(tableDataLoading || submitLoading || deleteLoading) && <Spinner />}

      {tableDataError && <Toastify getError={tableDataError} id={1} />}
      {submitError && <Toastify postError={submitError} id={2} />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-4 border-2 grid grid-cols-1 bg-white mb-4 p-4 rounded-lg">
          <DateInput
            label={text.q1}
            control={control}
            id="12165"
            {...register("12165", {
              required: true,
            })}
            isError={!!errors[12165]}
          />

          <SelectOption
            label={text.q2}
            id="12458"
            options={uploadDocTypeOptions}
            {...register("12458", {
              required: true,
              valueAsNumber: true,
            })}
            isError={!!errors[12458]}
          />

          <TextInput
            label={text.q3}
            id="12787"
            fieldClassName={`${errors && "errorMessage"}`}
            type="file"
            multiple
            {...register("12787", { required: true })}
            isError={!!errors[12787]}
            onChange={handleFileChange}
          />
          {/* <label>{text.q3}</label>
          <input id="12787" type="file" multiple onChange={handleFileChange} /> */}

          <SelectOption
            label={text.q4}
            id="1575181013916"
            options={optionsData}
            {...register("1575181013916")}
            isError={!!errors[1575181013916]}
          />
          <Button
            type="submit"
            buttonName={text.submit}
            isLoading={submitLoading || tableDataLoading}
          />
        </div>
      </form>
      {submitSuccess && <Toastify isSuccess={submitSuccess} />}
      {}

      <div className="relative justify-center border-2 col-span-1 bg-white my-2 p-2 rounded-lg overflow-x-auto">
        <table className="md:flex-col xs:flex-col mb-4 border w-full min-w-max overflow-scroll b-ownGray-200 table-auto">
          <thead className="bg-ownPurple-500 rounded-lg text-sm text-white">
            <tr className="table-row">
              <th
                scope="col"
                className="border-2 border-white p-2 rounded-tr-lg"
              >
                {text.q1}
              </th>
              <th className="border-2 border-white p-2">{text.q2}</th>
              <th className="border-2 border-white p-2">{text.uploadDate}</th>
              <th className="border-2 border-white p-2 rounded-tl-lg"></th>
            </tr>
          </thead>
          <tbody>
            {userTableData &&
              userTableData.map((data, index) => (
                <tr key={index} className="text-center">
                  <td scope="row" className="border-2 border-ownGray-200">
                    {data[12165]}
                  </td>
                  <td className="border-2 border-ownGray-200">{data[12458]}</td>
                  <td className="border-2 border-ownGray-200">{data[13856]}</td>
                  <td className="flex border-ownGray-200 border">
                    <button
                      className="flex justify-center bg-ownPurple-500 hover:bg-ownPurple-700 m-2 px-4 py-2 rounded-lg w-full font-semibold text-center text-sm text-white leading-5 duration-300"
                      onClick={() => setShowData(true)}
                    >
                      {text.show}
                    </button>
                    <button
                      className="flex justify-center bg-ownPurple-500 hover:bg-ownPurple-700 m-2 px-4 py-2 rounded-lg w-full font-semibold text-center text-sm text-white leading-5 duration-300"
                      onClick={() => handleDelete(data.id_)}
                    >
                      {text.delete}
                    </button>
                  </td>
                  <Modal isOpen={showData} onClose={() => setShowData(false)}>
                    <>
                      <a href={window.location.origin + `${data["12787"]}`}></a>
                    </>
                  </Modal>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="flex justify-end items-center gap-2 text-center">
          <button
            className="bg-ownGray-200 hover:bg-ownGray-300 p-2 rounded-xl font-semibold text-sm cursor-pointer"
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 1}
          >
            {text.previousPage}
          </button>
          <p className="border-ownGray-500 bg-ownGray-100 px-3 py-1 border-b-2 rounded-sm font-bold text-sm">
            {page}
          </p>
          <button
            className="bg-ownGray-200 hover:bg-ownGray-300 p-2 rounded-xl font-semibold text-sm cursor-pointer"
            onClick={() => {
              setPage((old) => old + 1)
            }}
            disabled={userTableData.length < pageSize}
          >
            {text.nextPage}
          </button>
          {isFetching ? <SquareSpinner /> : null}
        </div>
      </div>
      {deleteSuccess && <Toastify isSuccess={deleteSuccess} />}
    </div>
  )
}

export default UploadMedicalFiles
