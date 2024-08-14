import componentsImg from "./assets/components.png";
import { useState } from "react";
import { CORE_CONCEPTS, EXAMPLES } from "./data.js";

import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept.jsx";
import TabButton from "./components/TabButton.jsx";

function App() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handSelect(selectedButton) {
    // selectedButton => 'componts', 'jsx', 'props', 'state '
    console.log(selectedButton);
    setSelectedTopic(selectedButton);
  }

  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Cord Concepts</h2>
          <ul>
            {CORE_CONCEPTS.map((conceptItem) => (
              <CoreConcept key={conceptItem.title} {...conceptItem} />
            ))}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton isSelected={selectedTopic === "components"} onSelect={() => handSelect("components")}>
              Components
            </TabButton>
            <TabButton isSelected={selectedTopic === "jsx"} onSelect={() => handSelect("jsx")}>JSX</TabButton>
            <TabButton isSelected={selectedTopic === "props"} onSelect={() => handSelect("props")}>Props</TabButton>
            <TabButton isSelected={selectedTopic === "state"} onSelect={() => handSelect("state")}>State</TabButton>
          </menu>
          {/* && 如果前面是 true 就會輸出後面的 */}
          {!selectedTopic && <p>Please select a topic</p> }
          {selectedTopic && (
                <div id="tab-content">
                <h3>{EXAMPLES[selectedTopic].title}</h3>
                <p>
                  {EXAMPLES[selectedTopic].description}
                </p>
                <pre>
                  <code>
                  {EXAMPLES[selectedTopic].code}
                  </code>
                </pre>
              </div>
            ) 
          }
        </section>
      </main>
    </div>
  );
}

export default App;
