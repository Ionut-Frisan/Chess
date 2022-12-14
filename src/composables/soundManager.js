import { ref, onMounted } from "vue";

export const useSoundManager = () => {
  const enabled = ref(true);

  onMounted(() => {
    const soundEnabled = JSON.parse(localStorage.getItem("soundEnabled"));
    if (!(soundEnabled === undefined || soundEnabled === null)) {
      enabled.value = soundEnabled;
    } else {
      localStorage.setItem("soundEnabled", JSON.stringify(true));
    }
  });

  const toggleSound = () => {
    enabled.value = !enabled.value;
    localStorage.setItem("soundEnabled", JSON.stringify(enabled.value));
  };

  const playSound = (type) => {
    const sounds = {
      notAllowed: "not-allowed.mp3",
      move: "piece-move.mp3",
    };

    if (enabled.value) {
      let audio = new Audio("Sounds/" + sounds[type]);
      audio.volume = 0.5;
      audio.play();
    } else console.log("sound is disabled");
  };
  return { playSound };
};
