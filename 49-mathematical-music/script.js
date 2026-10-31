// Mathematical Music: model, controls, presets and explanation belong to this project.
startExperiment(49, (lab) => {
  const { P, axes, plot, raster, report, $, green } = lab;

  let stopAudio;
  return {
    config: [
      "Press Play sound to hear a fundamental plus its harmonics.",
      ["frequency", 110, 880, 220, 1],
      ["harmonics", 1, 12, 4, 1],
      ["harmonic decay", 0.5, 3, 1, 0.1],
      ["volume", 0.01, 0.15, 0.06, 0.01],
    ],
    description:
      "A musical tone can be assembled from a fundamental frequency and integer harmonics. Their relative amplitudes determine the waveform and its timbre, even when the perceived pitch stays the same.",
    formula: "s(t) = Σₖ sin(2πkf₀t)/kᵅ",
    tryThis:
      "Press Play sound, then compare a gentle harmonic decay with a bright one. Adjust volume before increasing the number of harmonics.",
    presets: [
      { name: "Soft tone", values: { "harmonic decay": 2.5, harmonics: 6 } },
      { name: "Bright tone", values: { "harmonic decay": 0.7, harmonics: 10 } },
    ],
    plot: true,
    animated: true,
    raster: false,
    interaction: "none",
    render() {
      const { time } = lab;
      axes();
      plot(
        (x) => {
          let y = 0;
          for (let k = 1; k <= P("harmonics"); k++)
            y += Math.sin(k * (x * 2 + time * 2)) / k ** P("harmonic decay");
          return y;
        },
        green,
        -5,
        5,
        0.4,
      );
      report(
        `Fundamental ${P("frequency")} Hz\n${P("harmonics")} harmonics · decay 1/k^${P("harmonic decay")}\nAudio starts only with Play sound.`,
      );
    },
    onParametersChange() {
      stopAudio?.();
    },
    mount() {
      const button = document.createElement("button");
      button.textContent = "Play sound";
      $("audioControls").append(button);
      let audio = null,
        nodes = [];
      function stop() {
        nodes.forEach((o) => o.stop());
        nodes = [];
        button.textContent = "Play sound";
      }
      button.onclick = async () => {
        if (nodes.length) {
          stop();
          return;
        }
        audio ||= new (window.AudioContext || window.webkitAudioContext)();
        await audio.resume();
        const gain = audio.createGain();
        gain.gain.value = P("volume");
        gain.connect(audio.destination);
        for (let k = 1; k <= P("harmonics"); k++) {
          if (k * P("frequency") >= audio.sampleRate / 2) break;
          const o = audio.createOscillator(),
            g = audio.createGain();
          o.frequency.value = k * P("frequency");
          g.gain.value = 1 / (k ** P("harmonic decay") * P("harmonics"));
          o.connect(g);
          g.connect(gain);
          o.start();
          nodes.push(o);
        }
        button.textContent = "Stop sound";
      };
      $("controls").addEventListener("input", () => {
        if (nodes.length) stop();
      });
      window.addEventListener("pagehide", () => {
        stop();
        audio?.close();
      });
      stopAudio = stop;
    },
  };
});
