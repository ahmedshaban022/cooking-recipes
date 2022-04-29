import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./loader/Loader";

const Recipe = ({ Recipes, setRecipes }) => {
  const removeRecipe = async (recipe) => {
    try {
      let token = localStorage.getItem("token");

      await axios.post(
        "/api/image/delete-img",
        { public_id: recipe.image.public_id },
        { headers: { authorization: token } }
      );

      await axios.delete(`/api/recipes/${recipe._id}`, {
        headers: { authorization: token },
      });
      toast.success("Recipe Deleted");
      let newRecipes = Recipes.filter((R) => R._id !== recipe._id);
      setRecipes([...newRecipes]);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div className="row ">
      {Recipes ? (
        Recipes.map((recipe, index) => (
          <div key={index} className="col-md-4">
            <div className="card bg-light shadow" style={{ width: "18rem" }}>
              <img
                src={recipe.image.url}
                className="card-img-top"
                alt={recipe.title}
              />
              <div className="card-body">
                <h4>{recipe.title}</h4>
                <div className="card-text">
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => removeRecipe(recipe)}
                  >
                    Remove{" "}
                  </button>
                  <NavLink
                    className="btn btn-info ms-2"
                    to={`/recipe-details/${recipe._id}`}
                  >
                    Details
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className=" row ">
          <div className="col-12 d-flex justify-content-center">
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;
