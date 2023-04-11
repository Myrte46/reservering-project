import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Input.css";

function Input({ name, label, register, errorLog, required, validationSchema, content, textarea }) {
    const { setValue } = useForm();

    /*
    Sets the value of a text field.

    name is the name of the field.
    content is the data that needs to go in the field.
    */
    useEffect(() => {
        setValue(name, content);
    }, [content]);

    /*
    Checks if the input field needs to be a textarea (longer input) or an input (shorter input).

    Takes a textarea boolean. If one present, it's a textarea.
    */
    function textareaCheck() {
        if (textarea) {
            return (
                <textarea className="input standard" {...register(name, validationSchema)}></textarea>
            )
        } else {
            return (
                <input className="input standard" {...register(name, validationSchema)}></input>
            )
        }
    }

    /*
    Returns an input field with a label, a textarea/input, and somewhere for the errors to show up.

    name is the name of the field.
    label is the text that shows up above the textarea/input field.
    required is a boolean. If one is present, it shows a star next to the label.
    errorLog is an object that, if the right name is present, will show the corresponding error.
    */
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