const Category  = require("../Models/categoryModels")
const createCategory = async(req,res)=>{
try{
    const {name, description}= req.body;
    const newCategory = await Category.create ({name, description});
    res.status(201).json(newCategory);
}    catch(error){
    res.status(500).json({message:"Error creating category, error"});
    
}
}

const getCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories); // Return categories as JSON
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Error fetching categories" });
    }
  };
const updateCategory = async (req, res) => {

    try {
        const categoryId = req.params.id;
        const category = await Category.findByIdAndUpdate(categoryId, req.body, { new: true, runValidators: true });
        
        if (!category) {
            return res.status(404).json({ msg: 'Category is not found' }); // Properly handles the not found case
        }
        
        res.status(200).json({msg:"Category is updated"});
    } catch (error) {
        res.status(400).json({ msg:"server  error",  });
    }
};

module.exports =  {updateCategory, createCategory, getCategories};