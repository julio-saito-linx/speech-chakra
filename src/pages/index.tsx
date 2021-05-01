import {
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Textarea,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Select } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import React, { useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

const Index = () => {
  const [selectedVoice, selectedVoiceSet] = useState<SpeechSynthesisVoice>();
  const { speak, voices, cancel, speaking } = useSpeechSynthesis();

  const [texto, textoSet] = useState(
    "Um canalha ataca pelas costas, e Bolsonaro atacou o presidente da Petrobras, como sempre, da segurança do seu chiqueirinho à porta do Alvorada (ou pelas redes sociais). Disse que o brilhante executivo não trabalhava havia 11 meses porque, idoso, está em “home office”."
  );
  const [rate, rateSet] = useState(1);
  const [minRate, minRateSet] = useState(0);
  const [maxRate, maxRateSet] = useState(2);

  useEffect(() => {
    if (selectedVoice?.name?.match(/Google/g)) {
      const MAX_RATE = 2;
      minRateSet(0);
      const percentRate = rate / maxRate;
      rateSet(percentRate * MAX_RATE);
      maxRateSet(MAX_RATE);
    } else if (selectedVoice?.name?.match(/Microsoft/g)) {
      const MAX_RATE = 10;
      minRateSet(0);
      const percentRate = rate / maxRate;
      rateSet(percentRate * MAX_RATE);
      maxRateSet(MAX_RATE);
    }
  }, [selectedVoice]);

  return (
    <Container height="10vh">
      <Main>
        <FormControl id="texto">
          <FormLabel>Texto</FormLabel>
          <Textarea
            onChange={(ev) => textoSet(ev.target.value)}
            value={texto}
          />
        </FormControl>

        <FormControl id="voz">
          <FormLabel>Voz</FormLabel>
          <Select
            placeholder="Select option"
            onChange={(ev) => {
              cancel();
              selectedVoiceSet(
                (voices as SpeechSynthesisVoice[]).find(
                  (v) => v.name === ev.target.value
                )
              );
            }}
          >
            {voices
              ?.filter((v) => v.lang.indexOf("pt-BR") >= 0)
              ?.map((v: SpeechSynthesisVoice) => (
                <option key={v.name} value={v.name}>
                  {v.name}
                </option>
              ))}
          </Select>
        </FormControl>

        <FormControl id="velocidade">
          <FormLabel>Velocidade</FormLabel>
          <Slider
            aria-label="slider-ex-1"
            value={rate}
            min={minRate}
            max={maxRate}
            step={0.01}
            onChange={(value) => {
              rateSet(value);
            }}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          {new Intl.NumberFormat("pt-BR", {
            maximumSignificantDigits: 3,
          }).format(rate)}{" "}
          ({minRate}/{maxRate})
        </FormControl>

        <Button
          onClick={() => {
            if (speaking) {
              cancel();
            } else if (selectedVoice) {
              speak({
                text: texto,
                voice: selectedVoice,
                rate,
                pitch: 1,
                volume: 1,
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
