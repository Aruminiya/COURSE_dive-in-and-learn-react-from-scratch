import {useState} from "react"
import { EXAMPLES } from "../data.js";

import Section from "./Section.jsx";

import Tabs from "./Tabs.jsx";
import TabButton from "./TabButton";

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handSelect(selectedButton) {
    // selectedButton => 'componts', 'jsx', 'props', 'state '
    console.log(selectedButton);
    setSelectedTopic(selectedButton);
  }

  return (
    <Section title="Examples" id="examples">
      <Tabs
        // buttonsContainer={Section} 像這樣就是使用 組件 Section
        ButtonsContainer="menu"
        buttons={
          <>
          <TabButton
            isSelected={selectedTopic === "components"}
            onClick={() => handSelect("components")}
          >
            Components
          </TabButton>
          <TabButton
            isSelected={selectedTopic === "jsx"}
            onClick={() => handSelect("jsx")}
          >
            JSX
          </TabButton>
          <TabButton
            isSelected={selectedTopic === "props"}
            onClick={() => handSelect("props")}
          >
            Props
          </TabButton>
          <TabButton
            isSelected={selectedTopic === "state"}
            onClick={() => handSelect("state")}
          >
            State
          </TabButton>
          </>
        }
      >

        {/* && 如果前面是 true 就會輸出後面的 */}
        {!selectedTopic && <p>Please select a topic</p>}
        {selectedTopic && (
          <div id="tab-content">
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>
              <code>{EXAMPLES[selectedTopic].code}</code>
            </pre>
          </div>
        )}
      </Tabs>


    </Section>
  )
}