import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";

const requestConfig = {};

export default function Meals() {
  // const [loadedMeals, setLoadedMeals] = useState([]);

  // useEffect(()=>{
  //   async function fetchMeals() {
  //     const response = await fetch('http://localhost:3000/meals');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch meals');
  //     }
  //     const meals = await response.json();
  //     setLoadedMeals(meals);
  //     return meals
  //    }

  //   fetchMeals();
  // },[])

  const { data: loadedMeals, isLoading, error } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) {
    return <p>Loading...</p>;
  };

  if (!loadedMeals || loadedMeals.length === 0) {
    return <p>No meals found</p>;
  };

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal}/>
      ))}
    </ul>
  );
};