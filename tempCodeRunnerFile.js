app.put("/listings/:id",async(req,res)=>{
    let id=req.params.id;
    let { title, description, image, price, location, country } = req.body;
    let msg={
        title,
        description,
        image,
        price,
        location,
        country
    }
    await Listing.findByIdAndUpdate(id,{msg});
    res.redirect(`/listings/${id}`)
})