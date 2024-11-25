const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const MongooseSchemas = require("./SchemaController")
const CarPropSchema = MongooseSchemas.CarPropsSchema

async function createCarProp(data){
    try{

        
        const newCarPropType = await CarPropSchema.create({
            Title: data.Title,
            carPropTypeTitle: data.carPropTypeTitle,
            carUUID: data.carUUID,
            carPropUUID: data.carPropUUID,
            bill: data.bill
        })


        return newCarPropType

    }catch (e){
        return {error: e}
    }
}

async function getCarProp(page, carUUID){
    try{

        // define limit per page
        const limit = 100;
        const offset = (page - 1) * limit;


        const total = await CarPropSchema.countDocuments({carUUID: carUUID});

        const CarPropTypes = await CarPropSchema.find({carUUID: carUUID}).skip(offset).limit(limit);


        return { total, CarPropTypes, page }

    }catch (e){
        return {error: e}
    }
}

async function updateCarProp(data, carPropUUID) {

    const updated = await CarPropSchema.findOneAndUpdate({carPropUUID: carPropUUID}, data)

    return updated;
}

async function deleteCarProp(carPropUUID){
    try{

        const deleted = await CarPropSchema.deleteOne({
            carPropUUID: carPropUUID
        })

        return {success: "Event deleted successfully", deleted}

    }
    catch(e){
        return {error: e};
    }
}



module.exports = {
    createCarProp: createCarProp,
    getCarProp: getCarProp,
    updateCarProp: updateCarProp,
    deleteCarProp: deleteCarProp
};