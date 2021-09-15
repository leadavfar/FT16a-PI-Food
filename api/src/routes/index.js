const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
/* const Recipe = require('../models/Recipe');
const Diet = require('../models/Diet'); */
const {Recipe, Diet} = require('../db');

/* const {API_KEY} = process.env */

const apk= "8427db01b1de4ac9b649794e80976c9d";

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=" + apk);
    const apiInfo = await apiUrl.data.results.map(el=> {
        return {
            title: el.title,
            id: el.id,
            image: el.image,
            summary: el.summary,
            spoonacularScore: el.spoonacularScore,
            healthScore: el.healthScore,
            diets: el.diets,
            steps: el.analyzedInstructions.map(el=> {return(el.steps.map(el=> { return(el.step)}))}).flat()
        };
      });
      return apiInfo;
};

const getDbInfo= async ()=> {
    return await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        }
    });
};

const getAllRecipes= async ()=> {
    const apiInfo = await getApiInfo();
    const dbInfo= await getDbInfo();
    const allInfo= apiInfo.concat(dbInfo);
    return allInfo;
};

router.get('/recipes', async (req, res)=> {
    const title= req.query.title;
    const totalRecipes= await getAllRecipes();
        if (title){
            const titleRecipe = await totalRecipes.filter(el=> el.title.toLowerCase().includes(title.toLowerCase()));
            titleRecipe.length ?
            res.status(200).send(titleRecipe) :
            res.status(404).send('recipe not found');
        }else{
            res.status(200).send(totalRecipes)
        };
});

router.get('/recipes/:id', async (req, res)=> {
    const id= req.params.id;
    const idRecipe= await getAllRecipes();
    let idFormat=0;
    if (id.length<7){
idFormat= parseInt(id)
    } else{
        idFormat= id;
    };
    const recipeById = await idRecipe.filter(el=> el.id === idFormat);
    if(recipeById.length){
            res.status(200).send(recipeById)
    }else{
        res.status(404).send('recipe not found or wrong id');
    };

});

router.get('/types', async (_req, res)=> {
    const apiUrl = await axios.get('https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=' + apk );
    const diets= apiUrl.data.results.map(el=> el.diets);
    const innerDiets= diets.flat(2);
    innerDiets.forEach(el=> {
        Diet.findOrCreate({
            where: {name: el}
        })
    })
    const allDiets= await Diet.findAll();
    res.send(allDiets);
});

router.post('/post', async (req, res)=> {
    const {
        title,
        id,
        image,
        summary,
        spoonacularScore,
        healthScore,
        steps,
        createdInDb,
        diets
    } = req.body;
    
    const recipeNew= await Recipe.create({
        title,
        id,
        image,
        summary,
        spoonacularScore,
        healthScore,
        steps,
        createdInDb
    });

    let dietDb= await Diet.findAll({ where: { name: diets } })
    recipeNew.addDiet(dietDb)
    
    res.send('Recipe added succefully!')
});

module.exports = router;
