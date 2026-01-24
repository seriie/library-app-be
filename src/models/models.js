import User from "./user.model.js";
import Book from "./book.model.js";
import Loan from "./loan.model.js";

User.hasMany(Loan, { foreignKey: "userId" });
Loan.belongsTo(User, { foreignKey: "userId" });

Book.hasMany(Loan, { foreignKey: "bookId" });
Loan.belongsTo(Book, { foreignKey: "bookId" });

export { User, Book, Loan };