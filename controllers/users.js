import {v4 as uuid} from "uuid";
import fs from "fs/promises";


const getFileFrom = async (path) => JSON.parse(await fs.readFile(path, "utf-8"))
const findById = (data, id) => data.find(data => data.id === id);

//get all
export const getUsers = async (req, res) => {
    const users = await getFileFrom("data.json")
    res.send(users);
};

//create
export const createUser = async (req, res) => {
    const users = await getFileFrom("data.json")
    const user = req.body;

    users.push({...user, id: uuid()});
    res.send("User Added Successfully");
}

// get one
export const getUser = async (req, res) => {
    const users = await getFileFrom("data.json")
    const user = users.filter((user) => user.id ===  req.params.id );
    res.send(user);
}

//delete
export const deleteUser = async (req, res) => {
    const users = await getFileFrom("data.json")
    users = users.filter((user) => user.id  !== req.params.id)
    res.send("user deleted successfully!")
}

//update
export const updateUser = async (req, res) => {
    const users = await getFileFrom("data.json");
    const user = users.find((user) => user.id === req.params.id);
    user.name = req.body.name;
    user.email = req.params.email;
    user.contact = req.body.contact;

    res.send("User updated successfully");
}



