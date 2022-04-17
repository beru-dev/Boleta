import React from "react";

export type Orientation = "vertical" | "horizontal";

interface ItemWrapperProps {
    className?: string
    orientation?: Orientation
}

const ItemWrapper: React.FC<ItemWrapperProps> = ({ className, children }) => {
    return <div className={className}>{children}</div>
}

export default ItemWrapper;