import React from "react";

interface SelectorOptionsProps {
    options: string[]
}

const SelectorOptions: React.FC<SelectorOptionsProps> = ({ options }) => {
    return (<>
        {
            options.map((option, index) => <option key={index} value={option}>{option}</option>)
        }
    </>)
}

export default SelectorOptions;