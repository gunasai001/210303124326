const express = require("express")
const axios = require("axios")
const app = express()
const MAX_PRODUCTS_PER_PAGE = 10; 
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4Nzc0MTU2LCJpYXQiOjE3MTg3NzM4NTYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImRjOTUxNTFlLTFmYmItNGQ4Ny1hYjkzLTNiYTg4OGRkYzAzMCIsInN1YiI6IjIxMDMwMzEyNDMyNkBwYXJ1bHVuaXZlcnNpdHkuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJQYXJ1bCBVbml2ZXJzaXR5IiwiY2xpZW50SUQiOiJkYzk1MTUxZS0xZmJiLTRkODctYWI5My0zYmE4ODhkZGMwMzAiLCJjbGllbnRTZWNyZXQiOiJLWW9Eb0p0TU9WcWFob2NwIiwib3duZXJOYW1lIjoiQ2hpbnRhbGEgR3VuYSBTYWkiLCJvd25lckVtYWlsIjoiMjEwMzAzMTI0MzI2QHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsInJvbGxObyI6IjIxMDMwMzEyNDMyNiJ9.9SCYgPImlq0e689Szg2hbJONaGvrmFCh71CWU1K0rwc';



const fetchProducts = async (companyName, categoryName, n, accessToken ) => {
    try{
        const response = await axios.get(`http://20.244.56.144/test/companies/:${companyName}/categories/:${categoryName}/products/top-${n}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
        console.log("response: ", response.data)
        return response.data;
    }catch(err){
        console.log(err)
        return [];
    }
}

app.get("/categories/:categoryName/products", async (req, res) => {
    const categoryName = req.params.categoryName;
    console.log(categoryName);
    const companyName = req.query.company || 'AMZ'; 
    const n = parseInt(req.query.n) || 10;
    const page = parseInt(req.query.page) || 1; 
    try{
        const products = await fetchProducts(companyName, categoryName, n, accessToken);
        const productsWithIds = products.map((product, index) => ({
            ...product,
            id: `${categoryName}-${companyName}-${index + 1}`,
          }));
          const startIndex = (page - 1) * MAX_PRODUCTS_PER_PAGE;
          const endIndex = startIndex + MAX_PRODUCTS_PER_PAGE;
          const paginatedProducts = productsWithIds.slice(startIndex, endIndex);
        res.status(200).json(paginatedProducts);
    }catch(error){
        res.status(500).json({error:"Internal Server Error"});
    }
})

app.listen(3000)