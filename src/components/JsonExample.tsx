import FileImport from "./fileImport";
import {exportExcelFile, getColumnWidthListJson, isValidFileContentJson, onChangeFileByJSON} from "../utils";
import FleExport from "./fileExport";
import React, {useState} from "react";
import FileContentTableJson from "./fileContentTableJson";

export default function JsonExample(){
    const [rows, setRows] = useState<Array<any[]>>();
    const onClick = (e:any) => {
        if(!rows) return;

        const newHeaders:string[] = ["NO","회사코드","이름","이메일","국적","전화번호","생년월일"];
        const columnWidth = getColumnWidthListJson(rows)
        exportExcelFile(newHeaders, rows, "TEST", "testFile.xlsx",columnWidth )

    }

    return (
        <div className={"w-full min-h-80 flex flex-col items-center gap-8 border border-gray-500 p-10"}>
            <div className={"w-full flex justify-between"}>
                <FileImport onChange={(file:File) => onChangeFileByJSON(file,isValidFileContentJson, setRows)}/>
                <h1 className={"w-full text-2xl font-semibold"}>JSON 데이터 이용</h1>
                <FleExport label={"내보내기"} onClick={onClick}/>
            </div>
            {rows && <FileContentTableJson data={rows} header={Object.keys(rows[0])}/>}
        </div>
    )
}