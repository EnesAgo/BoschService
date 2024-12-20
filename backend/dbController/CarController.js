const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const MongooseSchemas = require("./SchemaController")
const CarSchema = MongooseSchemas.CarSchema

async function createCar(data){
    try{

        const newCarPropType = await CarSchema.create({
            carID: data.carID,
            carUUID: data.carUUID,
            userUUID: data.userUUID,
            startDate: data.startDate,
            bill: 0,
            // endDate: data.endDate,
            finished: false
        });


        return newCarPropType

    }catch (e){
        return {error: e}
    }
}

async function getCars(page){
    try{

        // define limit per page
        const limit = 15;
        const offset = (page - 1) * limit;


        const total = await CarSchema.countDocuments({});

        const CarPropTypes = await CarSchema.find({}).skip(offset).limit(limit);


        return { total, CarPropTypes, page }

    }catch (e){
        return {error: e}
    }
}

async function getOneCar(carID){
    try{

        const Car = await CarSchema.findOne({carID: carID})

        console.log(Car)

        return Car

    }catch (e){
        return {error: e}
    }
}


async function getUserCars(page, userUUID){
    try{

        // define limit per page
        const limit = 100;
        const offset = (page - 1) * limit;


        const total = await CarSchema.countDocuments({userUUID: userUUID});

        const CarPropTypes = await CarSchema.find({userUUID: userUUID}).skip(offset).limit(limit);


        return { total, CarPropTypes, page }

    }catch (e){
        return {error: e}
    }
}
async function updateCar(data, carID) {

    const updated = await CarSchema.findOneAndUpdate({carID: carID}, data)

    return updated;
}
async function deleteCar(carUUID){
    try{

        const deleted = await CarSchema.deleteOne({
            carUUID: carUUID
        })

        return {success: "Event deleted successfully", deleted}

    }
    catch(e){
        return {error: e};
    }
}



module.exports = {
    createCar: createCar,
    getCars: getCars,
    getOneCar: getOneCar,
    getUserCars: getUserCars,
    updateCar: updateCar,
    deleteCar: deleteCar
};