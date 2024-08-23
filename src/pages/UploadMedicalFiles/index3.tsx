// import { ChangeEvent, useEffect, useState } from "react";
// import { DateInput } from "components/dateInput";
// import Modal from "components/modal";
// import { Button, SelectOption, TextInput } from "components/partials";
// import Spinner from "components/spinner";
// import SquareSpinner from "components/squareSpinner";
// import {Toastify} from "@/components/ui/Toastify";
// import {
//   CF_JobId_Submit,
//   PROGRAM_LIST_JobId_Get,
//   TABLE_DATA_JobId_Delete,
//   TABLE_DATA_JobId_Get,
// } from "constants/services";
// import { uploadDocTypeOptions } from "models/CaringFile";
// import { useForm } from "react-hook-form";
// import { requestFunction } from "services/functions";
// import { IOption } from "types";
// import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
// import { text } from "./text";

// interface IUploadData {
//   "12165": string;
//   "12458": string;
//   file_12787: FileList | null;
//   "1575181013916": string;
//   "13856": string;
// }

// interface ITableData {
//   "12165": string;
//   "12458": string;
//   "12787": string;
//   "1575181013916": string;
//   "13856": string;
//   id_: number;
// }

// const UploadMedicalFiles = () => {
//   const [showData, setShowData] = useState<number | null>(null);
//   const [optionsData, setOptionData] = useState<IOption[]>([]);
//   const [userTableData, setUserTableData] = useState<ITableData[]>([]);
//   const [fileInfo, setFileInfo] = useState<FileList | null>(null);
//   const { control, handleSubmit, setValue, register, reset } =
//     useForm<IUploadData>({
//       mode: "all",
//     });

//   const pageSize = 3;
//   const [page, setPage] = useState(1);
//   const limit = pageSize;
//   const offset = pageSize * (page - 1);

//   const handlefilechange = (e: ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     setFileInfo(files);
//   };

//   const { data: programsList } = useQuery({
//     queryKey: ["userData", PROGRAM_LIST_JobId_Get],
//     queryFn: () => requestFunction({ jobId: PROGRAM_LIST_JobId_Get }),
//   });

//   useEffect(() => {
//     if (
//       programsList &&
//       !programsList.error &&
//       programsList.data !== undefined
//     ) {
//       const optionData = programsList.data;
//       setOptionData(optionData);
//     }
//   }, [programsList]);

//   const {
//     data: tableData,
//     isSuccess: tableDataSuccess,
//     isLoading: tableDataLoading,
//     isError: tableDataError,
//     isFetching,
//   } = useQuery({
//     queryKey: ["userData", TABLE_DATA_JobId_Get, { page, pageSize }],
//     queryFn: () =>
//       requestFunction({
//         jobId: TABLE_DATA_JobId_Get,
//         dataInfo: { offset, limit },
//         page: page,
//         pageSize: pageSize,
//       }),
//     placeholderData: keepPreviousData,
//   });

//   const {
//     mutate: deleteMutate,
//     isSuccess: deleteSuccess,
//     isPending: deleteLoading,
//   } = useMutation({
//     mutationKey: ["postUserData", TABLE_DATA_JobId_Delete],
//     mutationFn: (dataInfo: object) =>
//       requestFunction({ jobId: TABLE_DATA_JobId_Delete, dataInfo }),
//   });

//   const handleDelete = (id: number) => {
//     deleteMutate({ id: id });
//     deleteSuccess &&
//       setUserTableData((prevState) =>
//         prevState.filter((item) => item.id_ !== id)
//       );
//   };

//   useEffect(() => {
//     if (
//       tableDataSuccess &&
//       tableData &&
//       !tableData.error &&
//       tableData.data !== undefined
//     ) {
//       const newData = tableData.data;
//       setUserTableData(newData);
//     }
//   }, [tableData, tableDataSuccess]);

//   useEffect(() => {
//     const todayDate = new Date().toISOString().split("T")[0];
//     setValue("13856", todayDate);
//   }, [setValue]);

//   const {
//     mutate: submitMutate,
//     isPending: submitLoading,
//     isError: submitError,
//     isSuccess: submitSuccess,
//   } = useMutation({
//     mutationKey: ["Submit Files", CF_JobId_Submit],
//     mutationFn: (dataInfo: IUploadData) =>
//       requestFunction({
//         jobId: CF_JobId_Submit,
//         dataInfo,
//       }),
//     onSuccess: (data) => {
//       const newTableData: ITableData = {
//         "12165": data["12165"],
//         "12458": data["12458"],
//         "12787": fileInfo ? URL.createObjectURL(fileInfo[0]) : "",
//         "1575181013916": data["1575181013916"],
//         "13856": data["13856"],
//         id_: Date.now(),
//       };

//       setUserTableData((prevState) => [...prevState, newTableData]);
//       reset();
//       setFileInfo(null);
//     },
//   });

//   const onSubmit = (data: IUploadData) => {
//     try {
//       data.file_12787 = fileInfo;
//       submitMutate(data);
//       console.log("Submission Successful:", data);
//     } catch (error) {
//       console.error("Submission failed:", error);
//     }
//   };

//   return (
//     <div className="w-full">
//       {(tableDataLoading || submitLoading || deleteLoading) && <Spinner />}

//       {tableDataError && <Toastify getError={tableDataError} id={1} />}
//       {submitError && <Toastify postError={submitError} id={2} />}

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="gap-4 border-2 grid grid-cols-1 bg-white mb-4 p-4 rounded-lg">
//           <DateInput label={text.q1} control={control} id="12165" />
//           <SelectOption
//             label={text.q2}
//             id="12458"
//             options={uploadDocTypeOptions}
//             {...register("12458")}
//           />

//           <TextInput
//             label={text.q3}
//             id="12787"
//             type="file"
//             multiple
//             onChange={handlefilechange}
//           />

//           <SelectOption
//             label={text.q4}
//             id="1575181013916"
//             options={optionsData}
//             {...register("1575181013916")}
//           />
//           <Button
//             type="submit"
//             buttonName={text.submit}
//             isLoading={submitLoading || tableDataLoading}
//           />
//         </div>
//       </form>
//       {submitSuccess && <Toastify isSuccess={submitSuccess} id={3} />}

//       <div className="relative justify-center border-2 col-span-1 bg-white my-2 p-2 rounded-lg overflow-x-auto">
//         <table className="md:flex-col xs:flex-col mb-4 border w-full min-w-max overflow-scroll b-ownGray-200 table-auto">
//           <thead className="bg-ownPurple-500 rounded-lg text-sm text-white">
//             <tr className="table-row">
//               <th
//                 scope="col"
//                 className="border-2 border-white p-2 rounded-tr-lg"
//               >
//                 {text.q1}
//               </th>
//               <th className="border-2 border-white p-2">{text.q2}</th>
//               <th className="border-2 border-white p-2">{text.uploadDate}</th>
//               <th className="border-2 border-white p-2 rounded-tl-lg"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {userTableData &&
//               userTableData.map((data, index) => (
//                 <tr key={index} className="text-center">
//                   <td scope="row" className="border-2 border-ownGray-200">
//                     {data["12165"]}
//                   </td>
//                   <td className="border-2 border-ownGray-200">
//                     {data["12458"]}
//                   </td>
//                   <td className="border-2 border-ownGray-200">
//                     {data["13856"]}
//                   </td>
//                   <td className="flex border-ownGray-200 border">
//                     <button
//                       className="flex justify-center bg-ownPurple-500 hover:bg-ownPurple-700 m-2 px-4 py-2 rounded-lg w-full font-semibold text-center text-sm text-white leading-5 duration-300"
//                       onClick={() => setShowData(index)}
//                     >
//                       {text.show}
//                     </button>
//                     <Modal
//                       isOpen={showData === index}
//                       onClose={() => setShowData(null)}
//                     >
//                       <div className="p-4">
//                         <a
//                           href={data["12787"]}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           {text.show}
//                         </a>
//                       </div>
//                     </Modal>
//                     <button
//                       className="flex justify-center bg-ownPurple-500 hover:bg-ownPurple-700 m-2 px-4 py-2 rounded-lg w-full font-semibold text-center text-sm text-white leading-5 duration-300"
//                       onClick={() => handleDelete(data.id_)}
//                     >
//                       {text.delete}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>

//         <div className="flex justify-end items-center gap-2 text-center">
//           <button
//             className="bg-ownGray-200 hover:bg-ownGray-300 p-2 rounded-xl font-semibold text-sm cursor-pointer"
//             onClick={() => setPage((old) => Math.max(old - 1, 0))}
//             disabled={page === 1}
//           >
//             {text.previousPage}
//           </button>
//           <p className="border-ownGray-500 bg-ownGray-100 px-3 py-1 border-b-2 rounded-sm font-bold text-sm">
//             {page}
//           </p>
//           <button
//             className="bg-ownGray-200 hover:bg-ownGray-300 p-2 rounded-xl font-semibold text-sm cursor-pointer"
//             onClick={() => {
//               setPage((old) => old + 1);
//             }}
//             disabled={userTableData.length < pageSize}
//           >
//             {text.nextPage}
//           </button>
//           {isFetching ? <SquareSpinner /> : null}
//         </div>
//       </div>
//       {deleteSuccess && <Toastify isSuccess={deleteSuccess} id={6} />}
//     </div>
//   );
// };

// export default UploadMedicalFiles;
