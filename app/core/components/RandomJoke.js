import { useState, useEffect } from "react"
import styles from "./RandomJoke.module.css"

export const RandomJoke = () => {
  const [setup, setSetup] = useState("")
  const [delivery, setDelivery] = useState("")

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "e0d6a68fb8mshb704bbbc26e1f66p1ad819jsn2a844020c804",
        "X-RapidAPI-Host": "jokeapi-v2.p.rapidapi.com",
      },
    }

    //keep in useEffect so that is called only once per load, otherwise it will infinitely fetch
    //this is finding one random joke with two parts and setting them to the states above
    fetch(
      "https://jokeapi-v2.p.rapidapi.com/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setSetup(response.setup)
        setDelivery(response.delivery)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className={styles.jokeContainer}>
      <div className={styles.joke}>
        <h1 className={styles.title}>Random Joke - From JokeAPI</h1>
        <h3 className={styles.jokeSetup}>{setup}</h3>
        <p className={styles.delivery}>{delivery}</p>
      </div>
    </div>
  )
}
