
import app from './app';
const PORT = process.env.PORT || 5000;
import db from './sequelize/models';

const connectDB = async () => {
    try {
        await db.sequelize.authenticate();
        console.log("database connection successfull");
    } catch (error) {
        console.log("database connection failed");
        process.exit(1);
    }
}
app.listen(PORT , async () => {
    await connectDB()
    console.log("Server started on port:", PORT);
})

export {
    app
} 

