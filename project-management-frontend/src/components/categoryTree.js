import React, { useEffect, useState } from 'react';
import { subcategoryResponse } from '../services/categoryService';
import '../App.css'; // Ensure to import the CSS file


const CategoryTree = ({ categories }) => {

    return (
        <div>
            {categories.map((category) => (
                <div key={category.id}>{<RenderTree node={category}/>}</div>
            ))}
        </div>
    );
};

 const RenderTree =({node}) =>{
 const [showSubcategory, setShowSubcategory] = useState(false);
 const [getSubCategories, setSubcategories] = useState([])
  useEffect(() => {
         fetchSubCategories();
     }, []);

     const fetchSubCategories = async () => {
                                        try {
                                            const response = await subcategoryResponse(node.category);
                                            setSubcategories(response.data);
                                            console.log(response.data)
                                        } catch (error) {
                                            console.error('Error fetching subcategories:', error);
                                        }
                                    };
    return <div key={node.id}>
                       <button onClick={() => {setShowSubcategory(prev => !prev)}}>{node.category}</button>
                      {
                          showSubcategory && (
                              <ul>
                                  {getSubCategories.map((subcategory) => (
                                      <li key={subcategory.category}>
                                          <a href={`view-products?subcatname=${subcategory.category}&catname=${node.category}`}>
                                              <button>{subcategory.category}</button>
                                          </a>
                                      </li>
                                  ))}
                              </ul>
                          )
                      }

                   </div>
   };
export default CategoryTree;
