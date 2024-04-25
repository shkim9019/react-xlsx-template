import {read, utils, WorkBook, WorkSheet} from "xlsx";
import XLSX from 'xlsx-js-style';

export const trimData = (data:string|number) => {
    return data.toString().trimStart().trimEnd();
}

export const onChangeFileByArray = (file:File,isValidFileContent:(data:any[][])=>boolean, setState:any) => {
    const reader = new FileReader();
    reader.onload = function(e:any):void{
        const changedData = xlsxToArrayData(e.target.result);
        isValidFileContent(changedData) && setState(changedData);
    }
    reader.readAsArrayBuffer(file)
}

export const onChangeFileByJSON = (file:File,isValidFileContent:(data:any[][])=>[boolean, any[]], setState:any) => {
    const reader = new FileReader();
    reader.onload = function(e:any):void{
        const changedData = xlsxToJsonData(e.target.result);
        const [isValid, result] = isValidFileContent(changedData);
        isValid && setState(result);
    }
    reader.readAsArrayBuffer(file)
}

export const xlsxToArrayData = (file:File):any[][] => {
    const workbook:WorkBook = read(file, {cellDates:true});
    const worksheet:WorkSheet = workbook.Sheets[workbook.SheetNames[0]];

    const result:any[][] = utils.sheet_to_json(worksheet, {header:1});

    return result.map((data:any[][])=>{ return data.map((item:any)=>{
        if(item instanceof Date){
            return item.toLocaleDateString().replaceAll(" ","");
        }

        const trimItem = trimData(item);

        if(typeof item === "number"){
            return Number(trimItem);
        }
        return trimItem;
    })})

}

export const xlsxToJsonData = (file:File) => {
    const workbook:WorkBook = read(file, {cellDates:true});
    const worksheet:WorkSheet = workbook.Sheets[workbook.SheetNames[0]];

    const result:any[] = utils.sheet_to_json(worksheet);
    return result.map((data:any)=>{
        const keys = Object.keys(data);
        keys.map((key:string) => {
            const item = data[key]

            if(item instanceof Date){
                data[key] = item.toLocaleDateString().replaceAll(" ","");
            }

            const trimItem = trimData(item);

            if(typeof item === "number"){
                data[key] = Number(trimItem);
            }
        })
        return data
    })
}

export const getColumnWidthList = (originRows:any[][]) => {
    const resultList = [{wch:10}];

    originRows.map((row:any[]) => {
         row.map((data:any, index:number):void => {
             if(resultList[index] === undefined) {
                 resultList[index] = ({wch: 10})
             }
            if(data.length > resultList[index].wch){
                resultList[index].wch = data.length
            }
        })
    })

    return resultList
}

export const getColumnWidthListJson = (originRows:any[][]) => {
    const resultList = [{wch:10}];

    originRows.map((row:any[]) => {
        const keys = Object.keys(row);
        keys.map((key:any, index:number):void => {
            if(resultList[index] === undefined) {
                resultList[index] = ({wch: 10})
            }
            if(row[key].length > resultList[index].wch){
                resultList[index].wch = row[key].length
            }
        })
    })

    return resultList
}

const allBorder = {
    right: {
        style: "thin",
        color: "000000"
    },
    left: {
        style: "thin",
        color: "000000"
    },
    top: {
        style: "thin",
        color: "000000"
    },
    bottom: {
        style: "thin",
        color: "000000"
    },
}

export const getHeaderStyle = (header:string[]) => {
    return header.map((head:string) => {
        return {
            v: head,
            t:"s",
            s: {
                alignment: {
                    vertical: "center",
                    horizontal: "center",
                },
                border: allBorder,
                fill: { fgColor: { rgb: 'E9E9E9' } }
            }
        }
    })
}

export const getCustomCellStyleJson = (data:any[]) => {
    return data.map((row:any) => Object.keys(row).map((key:any) => {
        const item = row[key];
        const type = item instanceof Date ? 'date' : typeof item;
        let cellType = "s";
        switch (type){
            case "date":
                cellType = "d"
                break;
            case "boolean":
                cellType = "b"
                break;
            case "number":
                cellType = "n"
                break;
            case "string":
                cellType = "s"
                break;
            default:
                break;
        }

        return {
            v: item,
            t: cellType,
            s: {
                alignment: {
                    vertical: "center",
                    horizontal: "center",
                },
                border: allBorder
            },
        }
    }))
}

export const getCustomCellStyleArray = (data:any[]) => {
    return data.map((row:any) => row.map((item:any) => {
        const type = item instanceof Date ? 'date' : typeof item;
        let cellType = "s";
        switch (type){
            case "date":
                cellType = "d"
                break;
            case "boolean":
                cellType = "b"
                break;
            case "number":
                cellType = "n"
                break;
            case "string":
                cellType = "s"
                break;
            default:
                break;
        }

        return {
            v: item,
            t: cellType,
            s: {
                alignment: {
                    vertical: "center",
                    horizontal: "center",
                },
                border: allBorder
            }
        }
    }))
}

export const exportExcelFile = (header:any,data:any[], sheetName:string, fileName:string, columWidthList?:any[]  ) => {
    const workbook:XLSX.WorkBook   = XLSX.utils.book_new();
    const worksheet:XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);

    // A1에 custom 헤더 생성
    XLSX.utils.sheet_add_aoa(worksheet, [header], {origin:"A1"});

    // 데이터 세팅
    XLSX.utils.sheet_add_json(worksheet, data, {origin:"A2", skipHeader:true})

    // 워크시트 추가
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    console.log(columWidthList)
    if(columWidthList){
        worksheet["!cols"] = columWidthList;
    }

    XLSX.writeFile(workbook, fileName)
}