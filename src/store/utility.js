export const updateObject=(oldObj,updatedProp)=>{
    return{
        ...oldObj,
        ...updatedProp
    }
}

export const checkValidation=(value,rules)=>{
    let isValid=true;
    if(rules.required){
        isValid=value.trim()!=='' && isValid;
    }

    if(rules.minLength){
        isValid=value.length>=rules.minLength && isValid;
    }

    if(rules.isEmail){
        let regex=/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
        isValid=value.match(regex) && isValid
    }
    return isValid
}