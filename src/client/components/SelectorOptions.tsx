import React from "react";

type OptionType = "priority" | "status"

interface SelectorOptionsProps {
    optionType: OptionType
}

const options: {[key in OptionType]: string[]} = {
    priority: ["Low", "Medium", "High"],
    status: ["To Do", "In Progress", "Review", "Done"]
}

const SelectorOptions: React.FC<SelectorOptionsProps> = ({ optionType }) => {
    return (<>
        {
            options[optionType].map((option, index) => <option key={index} value={option}>{option}</option>)
        }
    </>)
}

export default SelectorOptions;