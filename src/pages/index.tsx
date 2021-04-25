import { Textarea } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Select } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

const Index = () => {
  const [selectedVoice, selectedVoiceSet] = useState<SpeechSynthesisVoice>();
  const [texto, textoSet] = useState("");
  const { speak, voices, cancel, speaking } = useSpeechSynthesis();

  return (
    <Container height="50vh">
      <Main>
        <Select
          placeholder="Select option"
          onChange={(ev) => {
            selectedVoiceSet(
              (voices as SpeechSynthesisVoice[]).find(
                (v) => v.name === ev.target.value
              )
            );
          }}
        >
          {voices?.map((v: SpeechSynthesisVoice) => (
            <option key={v.name} value={v.name}>
              {v.name}
            </option>
          ))}
        </Select>

        <Textarea onChange={(ev) => textoSet(ev.target.value)} value={texto} />

        <Button
          onClick={() => {
            if (speaking) {
              cancel();
            } else if (selectedVoice) {
              speak({
                text: texto,
                voice: selectedVoice,
                rate: 5,
                pitch: 0.8,
                volume: 0.4,
              });
            }
          }}
        >
          {speaking ? "parar" : "falar"}
        </Button>
      </Main>

      <DarkModeSwitch />
    </Container>
  );
};

export default Index;
