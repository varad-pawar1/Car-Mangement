import { adminData } from "../models/adminModel.js";

const carController = async (req, res) => {
    let adminId = res.locals.adminId;
    console.log(adminId)
    try {
        const { carDetails } = req.body;

        if (!carDetails) {
            return res.status(400).json({
                message: "Car details are required in the request body."
            });
        }

        const admin = await adminData.findById(adminId);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        const newCarEntry = {
            carImageUrl: carDetails.carImageUrl,
            title: carDetails.title,
            kmsOnOdometer: carDetails.kmsOnOdometer,
            majorScratches: carDetails.majorScratches,
            originalPaint: carDetails.originalPaint,
            numberOfAccidents: carDetails.numberOfAccidents,
            numberOfPreviousBuyers: carDetails.numberOfPreviousBuyers,
            registrationPlace: carDetails.registrationPlace,
            color: carDetails.color,
            price: carDetails.price,
            mileage: carDetails.mileage,
            OEM_Specs: {
                modelName: carDetails.OEM_Specs.modelName,
                yearOfModel: carDetails.OEM_Specs.yearOfModel,
                listPrice: carDetails.OEM_Specs.listPrice,
                availableColors: carDetails.OEM_Specs.availableColors,
                mileage: carDetails.OEM_Specs.mileage,
                powerBhp: carDetails.OEM_Specs.powerBhp,
                maxSpeed: carDetails.OEM_Specs.maxSpeed,
            }
        };

        // Add the car entry to the admin's car array
        admin.car.push(newCarEntry);

        await admin.save();

        res.status(200).json({ message: "Car data added successfully." });
    } catch (error) {
        console.error("Error adding car data:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const getCarsController = async (req, res) => {
    let adminId = res.locals.adminId;


    try {
        const admin = await adminData.findById(adminId);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        // Return the cars associated with the admin
        res.status(200).json({ cars: admin.car });
    } catch (error) {
        console.error("Error fetching car data:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const deleteCarsController = async (req, res) => {
    const { title } = req.params; // Extract 'title' from request parameters
    let adminId = res.locals.adminId;

    try {
        const admin = await adminData.findById(adminId);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        // Find the car index by title
        const carIndex = admin.car.findIndex(car => car.title === title);

        if (carIndex === -1) {
            return res.status(404).json({ message: `Car with title "${title}" not found.` });
        }

        // Remove the car from the array
        admin.car.splice(carIndex, 1);

        // Save the updated admin data
        await admin.save();

        res.status(200).json({ message: `Car with title "${title}" deleted successfully.` });
    } catch (error) {
        console.error("Error deleting car:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const getCarsControllerByTitle = async (req, res) => {
    const { title } = req.params; // Extract 'title' from request parameters
    let adminId = res.locals.adminId;

    try {
        const admin = await adminData.findById(adminId);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        // Find the car by title
        const car = admin.car.find(car => car.title === title);

        if (!car) {
            return res.status(404).json({ message: `Car with title "${title}" not found.` });
        }

        res.status(200).json({ car });
    } catch (error) {
        console.error("Error fetching car data by title:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


const updateCarController = async (req, res) => {
    let adminId = res.locals.adminId;
    const { title } = req.params; // Use title from request parameters

    try {
        const { carDetails } = req.body;

        if (!carDetails) {
            return res.status(400).json({
                message: "Car details are required."
            });
        }

        const admin = await adminData.findById(adminId);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        // Find the specific car to update by title
        const carIndex = admin.car.findIndex(car => car.title === title);

        if (carIndex === -1) {
            return res.status(404).json({ message: `Car with title "${title}" not found.` });
        }

        // Update car details
        admin.car[carIndex].carImageUrl = carDetails.carImageUrl;
        admin.car[carIndex].title = carDetails.title;
        admin.car[carIndex].kmsOnOdometer = carDetails.kmsOnOdometer;
        admin.car[carIndex].majorScratches = carDetails.majorScratches;
        admin.car[carIndex].originalPaint = carDetails.originalPaint;
        admin.car[carIndex].numberOfAccidents = carDetails.numberOfAccidents;
        admin.car[carIndex].numberOfPreviousBuyers = carDetails.numberOfPreviousBuyers;
        admin.car[carIndex].registrationPlace = carDetails.registrationPlace;
        admin.car[carIndex].color = carDetails.color;
        admin.car[carIndex].price = carDetails.price;
        admin.car[carIndex].mileage = carDetails.mileage;
        admin.car[carIndex].OEM_Specs = carDetails.OEM_Specs;

        await admin.save();

        res.status(200).json({ message: "Car updated successfully." });
    } catch (error) {
        console.error("Error updating car:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};




export { carController, getCarsController, getCarsControllerByTitle, updateCarController, deleteCarsController };
