const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const MongooseSchemas = require("./SchemaController")
const CarSchema = MongooseSchemas.CarSchema

async function createCar(data){
    try{


        const newCarPropType = await CarSchema.create({carname: data.carname, carUUID: data.carUUID, userUUID: data.userUUID})


        return newCarPropType

    }catch (e){
        return {error: e}
    }
}

async function getCars(page){
    try{

        // define limit per page
        const limit = 100;
        const offset = (page - 1) * limit;


        const total = await CarSchema.countDocuments({});

        const CarPropTypes = await CarSchema.find({}).skip(offset).limit(limit);


        return { total, CarPropTypes, page }

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
    getUserCars: getUserCars,
    deleteCar: deleteCar
};