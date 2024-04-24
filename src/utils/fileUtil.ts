import {read, utils, WorkBook, WorkSheet} from "xlsx";

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

export const onChangeFileByJSON = (file:File,isValidFileContent:(data:any[][])=>boolean, setState:any) => {
    const reader = new FileReader();
    reader.onload = function(e:any):void{
        const changedData = xlsxToJsonData(e.target.result);
        isValidFileContent(changedData) && setState(changedData);
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