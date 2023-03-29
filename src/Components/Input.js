import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Input.css";

function Input({ name, label, register, errorLog, required, validationSchema, content, textarea }) {
    const { setValue } = useForm();

    useEffect(() => {
        setValue(name, content);
    }, [content]);

    function textareaCheck(){
        if (textarea){
            return (
                <textarea className="input standard" {...register(name, validationSchema)}></textarea>
            )
        } else {
            return (
                <input className="input standard" {...register(name, validationSchema)}></input>)
        }
    }

    return (<div className="form-control-input">
        <label htmlFor={name} className="label">
            {label}
            {required && " *"}
        </label>
        {textareaCheck()}
        {errorLog && errorLog[name] && <span className="error">{errorLog[name].message}</span>}
    </div>)
}

export default Input;