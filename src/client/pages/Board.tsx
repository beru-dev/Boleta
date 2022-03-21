import React from "react";

interface BoardProps {
    board: string
}

const Board: React.FC<BoardProps> = ({ board }) => {
    return (
        <>
            <section>To Do</section>
            <section>In Progress</section>
            <section>Review</section>
            <section>Done</section>
        </>
    )
}

export default Board;