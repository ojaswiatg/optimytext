import mongoConnect from "@/connections/mongo";
import UserModel from "@/models/UserModel";

export async function addUserToDB({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    try {
        await mongoConnect();
        await UserModel.create({ email, password });
        return {
            success: true,
            message: "Successfully registered! Please log in to continue",
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Verification failed! Please signup again",
            error: "Internal server error",
        };
    }
}
