export const isValidString = (data:any):boolean => {
    return typeof data === "string";
}

export const isValidDate = (data: any):boolean => {
    const parseDate = new Date(data);
    return parseDate.toString() !== "Invalid Date";
}

export const isValidFileContent = (originalData:any[][]):boolean => {
    let result = true;
    const data:any[][] = originalData.slice(1);
    data.reduce((_:any[], cur:any[]) => {
        const errorList:string[] = [];

        if(typeof cur[1] !== "number"){
            errorList.push("회사코드")
        }

        if(!isValidString(cur[2])){
            errorList.push("이름")
        }

        if(!isValidString(cur[3])){
            errorList.push("이메일")
        }

        if(!isValidString(cur[4])){
            errorList.push("국가코드")
        }

        if(!isValidString(cur[5])){
            errorList.push("연락처")
        }

        if(!isValidDate(cur[6])){
            errorList.push("생년월일")
        }

        if(errorList.length > 0 ){
            const errorContent = errorList.join(", ");
            alert(`${cur[0]}행의 ${errorContent} 형식을 확인해 주세요.`)
            result = false
            data.splice(1)
        }

        return cur;
    },[])


    return result;
}