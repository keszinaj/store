import {getUserById} from "../dbUtils/dbQueries";

export async function tryGetUser(req, res, errorMessage='Server side error', errorCode=400) {
    let id = (req as any).user;
    id = parseInt(id);
    if(isNaN(id)) {
        res.status(errorCode).send(errorMessage);
        return null;
    }

    let user = await getUserById(id);
    if(user === null) {
        res.status(errorCode).send(errorMessage);
        return null;
    }

    return user;
}