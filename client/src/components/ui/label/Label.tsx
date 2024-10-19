import React from 'react';


interface ILabelProps {
    htmlfor : string, 
    content : string, 
    className? : string
}

const Label  : React.FC<ILabelProps> = ({htmlfor, content, className = ""}) => {
    return(<label htmlFor={htmlfor} className={`block text-sm font-medium leading-6 text-gray-900 ${className}`}>{content}</label>)
} 

export default Label;
