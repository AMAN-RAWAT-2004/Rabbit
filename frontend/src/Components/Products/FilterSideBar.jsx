import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSideBar = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    const navigate=useNavigate();
    const [filters,setFilters]=useState({
        category:"",
        gender:"",
        color:"",
        size:[],
        material:[],
        brand:[],
        minPrice:0,
        maxPrice:100,
    })
    const [priceRange,setPriceRange]=useState([0,100])
    const categories=["Top Wear","Bottom Wear"];
    const colors=[
        "Red",
        "Blue",
        "Black",
        "Green",
        "Yellow",
        "Gray",
        "White",
        "Pink",
        "Beige",
        "Navy"
    ]
    const sizes=["XS","S","M","L","XL","XXL"]
    const materials=[
        "Cotton",
        "Wool",
        "Denim",
        "Polyestar",
        "Silk",
        "Linen",
        "Viscose",
        "Fleece"
    ]
    const brands=[
        "Urban Threads",
        "Modern Fit",
        "Street Style",
        "Beach Breeze",
        "Fashionista",
        "ChicStyle"
    ]
    const genders=[
        "Men",
        "Women"
    ]
    useEffect(()=>{
        const params=Object.fromEntries([...searchParams])

        setFilters({
            category:params.category||"",
            gender:params.gender||"",
            color:params.color||"",
            size:params.size?params.size.split(",") :[],
            material:params.material?params.material.split(",") :[],
            brand:params.brand?params.brand.split(",") :[],
            minPrice:params.minPrice||0,
            maxPrice:params.maxPrice||100

        })
        setPriceRange([0,params.maxPrice||100])
    },[searchParams])
    const handleFilterChange=(e)=>{
        const {value,name,checked,type}=e.target;
        // console.log({value,name,checked,type})
        let newFilters={...filters}
        if(type ==="checkbox"){
            if(checked){
                newFilters[name]=[...(newFilters[name]||[]),value]
            }else{
                newFilters[name]=newFilters[name].filter((item)=>item !==value)
            }
        }else{
            newFilters[name]=value
        }
        setFilters(newFilters)
        // console.log(newFilters)
        updateUrlParams(newFilters)
    }
    const updateUrlParams=(newFilters)=>{
        const params= new URLSearchParams()
        Object.keys(newFilters).forEach((key)=>{
            if(Array.isArray(newFilters[key] ) && newFilters[key].length >0){
                params.append(key,newFilters[key].join(','))
            }else{
                params.append(key,newFilters[key])
            }
        })
        setSearchParams(params)
        navigate(`?${params.toString()}`)
    }
    const handlePriceRange=(e)=>{
        const newPrice=e.target.value;
        setPriceRange([0,newPrice])
        const newFilters={...filters,minPrice:0,maxPrice:newPrice}

        setFilters(filters)
        updateUrlParams(newFilters)

    }
  return (
    <div className='p-4'>
        <h3 className='text-xl font-medium text-green-800 mb-4'>Filter</h3>
        {/* Category Filter  */}
        <div className="mb-6">
            <label className="block text-gray-600 mb-2 font-medium">Category</label>
            {
                categories.map((category)=>(
                    <div key={category} className="flex items-center mb-1">
                        <input value={category} checked={filters.category===category} onChange={handleFilterChange} type="radio" name='category' className='m-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                        <span className="text-gray-700">{category}</span>
                    </div>
                ))
            }
        </div>
        {/* Gender Filter  */}
        <div className="mb-6">
            <label className="block text-gray-600 mb-2 font-medium">Gender</label>
            {
                genders.map((gender)=>(
                    <div key={gender} className="flex items-center mb-1">
                        <input value={gender} checked={filters.gender===gender} onChange={handleFilterChange} type="radio" name='gender' className='m-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                        <span className="text-gray-700">{gender}</span>
                    </div>
                ))
            }
        </div>
                {/* Color Filter  */}
                <div className="mb-6">
                   <label className="block text-gray-600 mb-2 font-medium">Color</label>
                   <div className="flex flex-wrap gap-2">
                    {
                        colors.map((color)=>(
                             <button value={color} name='color' onClick={handleFilterChange}  key={color} className={`h-8 w-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color===color? 'ring-2 ring-blue-500':''}`} style={{backgroundColor:color.toLowerCase()}}></button>   
                        ))
                    }
                   </div>

                </div>

                {/* Size Filter  */}
                <div className="mb-6">
                   <label className="block text-gray-600 mb-2 font-medium">Size</label>
                   {
                    sizes.map((size)=>(
                        <div key={size} className="flex items-center mb-1">
                            <input value={size} onChange={handleFilterChange} checked={filters.size.includes(size)} type="checkbox" name='size' className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                            <span className='text-gray-700'>{size}</span>
                        </div>
                    ))
                   }

                </div>
                {/* Material Filter  */}
                <div className="mb-6">
                   <label className="block text-gray-600 mb-2 font-medium">Material</label>
                   {
                    materials.map((material)=>(
                        <div key={material} className="flex items-center mb-1">
                            <input value={material} checked={filters.material.includes(material)} onChange={handleFilterChange}  type="checkbox" name='material' className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                            <span className='text-gray-700'>{material}</span>
                        </div>
                    ))
                   }

                </div>
                {/* Brands Filter  */}
                <div className="mb-6">
                   <label className="block text-gray-600 mb-2 font-medium">Brand</label>
                   {
                    brands.map((brand)=>(
                        <div key={brand} className="flex items-center mb-1">
                            <input value={brand} onChange={handleFilterChange} checked={filters.brand.includes(brand)} type="checkbox" name='brand' className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                            <span className='text-gray-700'>{brand}</span>
                        </div>
                    ))
                   }

                </div>

                {/* Price Range  */}
                <div className="mb-6">
                    <label  className="block text-gray-600 font-medium mb-2">Price Range</label>
                    <input value={priceRange[1]} onChange={handlePriceRange} type="range"  name='range' min={0} max={100}  className='w-full h-2 bg-gray-300 appearance-none rounded-lg cursor-pointer'/>
                    <div className="flex justify-between text-gray-600 mt-2">
                        <span >$0</span>
                        <span >${priceRange[1]}</span>
                    </div>

                </div>
    </div>
  )
}

export default FilterSideBar
