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
            errorList.push("국적")
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

export const isValidFileContentJson = (originalData:any[]):[boolean, any[]] => {
    let result = true;

    const data = originalData.slice(0).reduce((_:any, cur:any, curIndex:number) => {
        const errorList:string[] = [];

        if(typeof cur["회사코드"] !== "number"){
            errorList.push("회사코드")
        }

        if(!isValidString(cur["이름"])){
            errorList.push("이름")
        }

        if(!isValidString(cur["이메일"])){
            errorList.push("이메일")
        }

        if(!isValidString(cur["국적"])){
            errorList.push("국적")
        }

        if(!isValidString(cur["연락처"])){
            errorList.push("연락처")
        }

        if(!isValidDate(cur["생년월일"])){
            errorList.push("생년월일")
        }

        if(errorList.length > 0 ){
            const errorContent = errorList.join(", ");
            alert(`${cur["NO"]}행의 ${errorContent} 형식을 확인해 주세요.`)
            result = false
            data.splice(1)
        }

        originalData[curIndex] = {
            NO:cur["NO"],
            companyCode: cur['회사코드'],
            name: cur["이름"].trim(),
            email:cur["이메일"].trim(),
            nationality:cur["국적"].trim(),
            contact:cur["연락처"].trim(),
            birthDate:cur["생년월일"]
        }
        return cur;
    },[])

    return [result, data];
}