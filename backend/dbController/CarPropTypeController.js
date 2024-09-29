const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const MongooseSchemas = require("./SchemaController")
const CarPropTypeSchema = MongooseSchemas.CarPropTypeSchema

async function createCarPropType(data){
    try{



        const newCarPropType = await CarPropTypeSchema.create({Title: data.Title, bill: data.bill})



        return newCarPropType

    }catch (e){
        return {error: e}
    }
}

async function getCarPropTypes(page){
    try{

        // define limit per page
        const limit = 100;
        const offset = (page - 1) * limit;

        const total = await CarPropTypeSchema.countDocuments({});

        const CarPropTypes = await CarPropTypeSchema.find({}).skip(offset).limit(limit);

        console.log({ total, CarPropTypes, page })

        return { total, CarPropTypes, page }

    }catch (e){
        return {error: e}
    }
}

async function deleteCarPropType(Title){
    try{

        const deleted = await CarPropTypeSchema.deleteOne({
            Title: Title
        })

        return {success: "Event deleted successfully", deleted}

    }
    catch(e){
        return {error: e};
    }
}



module.exports = {
    createCarPropType: createCarPropType,
    getCarPropTypes: getCarPropTypes,
    deleteCarPropType: deleteCarPropType
};