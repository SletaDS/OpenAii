import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export const setting={
  model: "text-davinci-003",
  temperature: 0.9,
  max_tokens: 2000,
  prompt:'',
  top_p: 1,
  frequency_penalty: 0.0,
  presence_penalty: 0.6,
  stop: [" Human:", " AI:"],
}

 export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [wait,setwait]=useState(false)
  async function onSubmit(event) {
    setwait(true)
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
       setwait(false)
      setResult(data.result);
    } catch(error) {
      // Consider implementing your own error handling logic here
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>
      <main className={styles.main}>
        <section className={styles.setting} >
          <span>temperature</span><input onChange={(e)=>setting.temperature=e.target.value} type="number" min="0.0" max="1.0" step='0.1'/>
          <span>top_p</span><input onChange={(e)=>setting.top_p=e.target.value} type="number" min="0.0" max="1.0" step='0.1'/>
          <span>frequency_penalty</span><input onChange={(e)=>setting.frequency_penalty=e.target.value} type="number" min="0.0" max="1.0" step='0.1'/>
          <span>presence_penalty</span><input onChange={(e)=>setting.presence_penalty=e.target.value} type="number" min="0.0" max="1.0" step='0.1'/>
          <span>stop</span><input type="text" onChange={(e)=>setting.stop=e.target.value}/>
        </section>
        <div className={styles.form}>
        {wait ? <h3>wait....</h3> : <h3>Write</h3>}

        <form onSubmit={onSubmit}>
          <textarea
            name="textarea"
            placeholder="Enter"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div></div>
      </main>
    </div>
  );
}
