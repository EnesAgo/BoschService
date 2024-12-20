const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const {verify} = require("jsonwebtoken");


//User Func imports
const UserFunctions = require("./dbController/UserController")
const {
    createUser: createUser,
    loginUser: loginUser,
    getAllUsers: getAllUsers,
    getOneUser: getOneUser,
    ChangeUserPassword: ChangeUserPassword,
} = UserFunctions;

//Car Func imports
const CarFunctions = require("./dbController/CarController")
const {
    createCar: createCar,
    getCars: getCars,
    getOneCar: getOneCar,
    getUserCars: getUserCars,
    updateCar: updateCar,
    deleteCar: deleteCar
} = CarFunctions;


//Car Prop Func imports
const CarPropFunctions = require("./dbController/CarPropController")
const {
    createCarProp: createCarProp,
    getCarProp: getCarProp,
    updateCarProp: updateCarProp,
    deleteCarProp: deleteCarProp
} = CarPropFunctions;

//Car Prop Func imports
const CarPropTypeFunctions = require("./dbController/CarPropTypeController")
const {
    createCarPropType: createCarPropType,
    getCarPropTypes: getCarPropTypes,
    deleteCarPropType: deleteCarPropType
} = CarPropTypeFunctions;




require('dotenv').config()

const app = express();

//cors
app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","DELETE"]
}))

app.use(express.static('public'));
app.use(express.json({limit: '10000mb'}));





//app
app.get("/", (req, res) => {
    res.json("hello world")
})



//Users
app.post("/createUser", async (req, res) => {

    const data = {
        username: req.body.username,
        email: req.body.email,

        password: req.body.password,
    }

    const User = await createUser(data)

    res.json(User)
})
app.post("/loginUser", async (req, res) => {

    const loginToken = await loginUser({
        username: req.body.username,
        password: req.body.password
    })

    res.header('authorization', loginToken.token).send(loginToken)
})
app.get("/getAllUsers", async (req, res) => {
    let page;

    if(req.query.page){
        page = parseInt(req.query.page);
    }
    else{
        page = 1;
    }

    const Items = await getAllUsers(page)

    res.json(Items)
})
app.get("/getOneUser", async (req, res) => {

    const UserUUID = req.query.userUUID;

    const User = await getOneUser(UserUUID)

    res.json(User)
})
app.put("/changeUserPassword",  async (req, res) => {
    const uuID = req.query.userUUID;
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;

    const user = await ChangeUserPassword(uuID, oldPass, newPass)

    res.json(user)
})



//Cars
app.post("/createCar", async (req, res) => {

    const carUUIDString = uuidv4();

    const data = {
        carID: req.body.carID,
        carUUID: carUUIDString,
        startDate: new Date(),
        userUUID: req.body.userUUID,
    }

    const Car = await createCar(data)

    res.json(Car)
})

app.get("/getAllCars", async (req, res) => {
    let page;

    if(req.query.page){
        page = parseInt(req.query.page);
    }
    else{
        page = 1;
    }

    const Items = await getCars(page)

    res.json(Items)
})

app.get("/getOneCar", async (req, res) => {

    if(!req.query.carID) {
        res.json({error: "no query"})
        return
    }


    console.log(req.query.carID)
    const Item = await getOneCar(req.query.carID)

    res.json(Item)
})

app.get("/getUserCars", async (req, res) => {
    let page;

    if(req.query.page){
        page = parseInt(req.query.page);
    }
    else{
        page = 1;
    }

    const Items = await getUserCars(page, req.query.userUUID)

    res.json(Items)
})

app.put("/updateCar", async (req, res) => {

    if(!req.query.carID) {
        res.json({error: "no query"})
        return
    }

    const data = {
        // carPropTypeTitle: req.body.carPropTypeTitle,
        // carID: req.body.carID,
        // carUUID: req.body.carUUID,
        finished: req.body.finished,
        startDate: req.body.startDate,
        bill: req.body.bill,
    }


    const event = await updateCar(data, req.query.carID)
    res.json(event)
})

app.delete("/deleteCar/:uuID", verify, async (req, res) => {
    const deletedUUID = req.params.uuID;
    const data = await deleteCar(deletedUUID);
    res.send(data)
})






//Cars prop
app.post("/createCarProp", async (req, res) => {

    const carPropUUIDString = uuidv4();

    const data = {
        Title: req.body.Title,
        carPropTypeTitle: req.body.carPropTypeTitle,
        carID: req.body.carID,
        carUUID: req.body.carUUID,
        carPropUUID: carPropUUIDString,
        bill: 0
    }

    console.log(data)

    const CarProp = await createCarProp(data)

    res.json(CarProp)
})

app.get("/getAllCarProps", async (req, res) => {
    let page;

    if(req.query.page){
        page = parseInt(req.query.page);
    }
    else{
        page = 1;
    }

    const Items = await getCarProp(page, req.query.carUUID)

    res.json(Items)
})

app.put("/updateCarProp", async (req, res) => {

    if(!req.query.carPropUUID) {
        res.json({error: "no query"})
        return
    }

    const data = {
        Title: req.body.Title,
        // carPropTypeTitle: req.body.carPropTypeTitle,
        // carID: req.body.carID,
        // carUUID: req.body.carUUID,
    }


    const event = await updateCarProp(data, req.query.carPropUUID)
    res.json(event)
})

app.delete("/deleteCarProp/:uuID", verify, async (req, res) => {
    const deletedUUID = req.params.uuID;
    const data = await deleteCarProp(deletedUUID);
    res.send(data)
})





//Cars prop type
app.post("/createCarPropType", async (req, res) => {

    const carPropUUIDString = uuidv4();

    const data = {
        Title: req.body.title,
        bill: req.body.bill
    }

    const CarProp = await createCarPropType(data)

    res.json(CarProp)
})

app.get("/getAllCarPropTypes", async (req, res) => {
    let page = 1;

    if(req.query.page){
        page = parseInt(req.query.page);
    }

    const Items = await getCarPropTypes(page)

    console.log(Items)

    res.json(Items)
})

app.delete("/deleteCarProp/:uuID", verify, async (req, res) => {
    const Title = req.params.title;
    const data = await deleteCarPropType(Title);
    res.send(data)
})


app.listen(process.env.PORT);