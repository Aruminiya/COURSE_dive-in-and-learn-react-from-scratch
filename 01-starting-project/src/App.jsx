import componentsImg from "./assets/components.png";
import { useState } from "react";
import { CORE_CONCEPTS } from "./data.js";

import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept.jsx";
import TabButton from "./components/TabButton.jsx";

function App() {
  const [selectedTopic, setSelectedTopic] = useState("Please click a button");

  function handSelect(selectedButton) {
    // selectedButton => 'componts', 'jsx', 'props', 'state '
    console.log(selectedButton);
    setSelectedTopic(`you are clicked ${selectedButton}`);
  }

  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Cord Concepts</h2>
          <ul>
            {CORE_CONCEPTS.map((concept, index) => (
              <CoreConcept key={index} {...concept} />
            ))}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton onSelect={() => handSelect("componts")}>
              Components
            </TabButton>
            <TabButton onSelect={() => handSelect("jsx")}>JSX</TabButton>
            <TabButton onSelect={() => handSelect("props")}>Props</TabButton>
            <TabButton onSelect={() => handSelect("state")}>State</TabButton>
          </menu>
          {selectedTopic}
        </section>
      </main>
    </div>
  );
}

export default App;
