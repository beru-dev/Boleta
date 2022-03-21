import AccountEntity from "../AccountEntity";
import CommentEntity from "../CommentEntity";
import ProjectEntity from "../ProjectEntity";
import TicketEntity from "../TicketEntity";
import UserEntity from "../UserEntity";
import db from "./database";

export default () => {
    AccountEntity.belongsTo(UserEntity);

    CommentEntity.belongsTo(UserEntity);
    CommentEntity.belongsTo(TicketEntity);

    TicketEntity.belongsTo(UserEntity, { as: "submitter", foreignKey: "submitter_id" });
    TicketEntity.belongsTo(UserEntity, { as: "assignee", foreignKey: "assignee_id" });
    TicketEntity.belongsTo(ProjectEntity);

    db.sync();
}