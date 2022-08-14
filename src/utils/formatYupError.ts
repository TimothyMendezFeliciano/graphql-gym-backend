import {ValidationError} from "yup";
import {Error} from "../models/Error";

export const formatYupError = (errors: ValidationError) => {
    const errorList: Error[] = [];
    errors.inner.forEach(e => {
        errorList.push({
            path: e.path || '',
            message: e.message
        })
    })

    return errorList
}