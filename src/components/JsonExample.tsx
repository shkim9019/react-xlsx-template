import FileImport from "./fileImport";
import {
    getColumnWidthList,
    getColumnWidthListJson,
    isValidFileContent,
    isValidFileContentJson,
    onChangeFileByJSON
} from "../utils";
import FleExport from "./fileExport";
import FileContentTable from "./fileContentTable";
import React, {useState} from "react";
import {utils, WorkBook, WorkSheet, writeFile} from "xlsx";
import FileContentTableJson from "./fileContentTableJson";

export default function JsonExample(){
    const [rows, setRows] = useState<Array<any[]>>();
    const onClick = (e:any) => {
        if(!rows) return;

        const newHeaders:string[] = ["NO","회사코드","이름","이메일","국적","전화번호","생년월일"];
        const workbook:WorkBook   = utils.book_new();
        const worksheet:WorkSheet = utils.json_to_sheet([]);

        // A1에 custom 헤더 생성
        utils.sheet_add_aoa(worksheet, [newHeaders], {origin:"A1"});

        // 데이터 세팅
        utils.sheet_add_json(worksheet, rows, {origin:"A2", skipHeader:true})

        // 워크시트 추가
        utils.book_append_sheet(workbook, worksheet, "TEST");

        worksheet["!cols"] = getColumnWidthListJson(rows);
        // 스타일 적용 해야함
        // https://stackoverflow.com/questions/50147526/sheetjs-xlsx-cell-styling 참고
        writeFile(workbook, "testFile.xlsx")
    }

    return (
        <div className={"w-full flex flex-col items-center gap-8"}>
            <div className={"w-full flex justify-between"}>
                <FileImport onChange={(file:File) => onChangeFileByJSON(file,isValidFileContentJson, setRows)}/>
                <h1 className={"w-full text-2xl font-semibold"}>JSON 데이터 이용</h1>
                <FleExport label={"내보내기"} onClick={onClick}/>
            </div>
            {rows && <FileContentTableJson data={rows} header={Object.keys(rows[0])}/>}
        </div>
    )
}