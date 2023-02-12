import { ref, onMounted, watch } from "vue";

export const useSoundManager = () => {
  const enabled = ref(true);
  const volume = ref(1);
  // TODO: check why is this not working

  onMounted(() => {
    const soundEnabled = JSON.parse(localStorage.getItem("soundEnabled"));
    const volumeValue = JSON.parse(localStorage.getItem("volume"));
    if (!(soundEnabled === undefined || soundEnabled === null)) {
      enabled.value = soundEnabled;
    } else {
      localStorage.setItem("soundEnabled", JSON.stringify(true));
    }
    if (!(volumeValue === undefined || volumeValue === null)) {
      volume.value = enabled.value ? volumeValue : 0;
    } else {
      localStorage.setItem("volume", JSON.stringify(1));
    }
  });

  const toggleSound = () => {
    const volumeValue = JSON.parse(localStorage.getItem("volume"));
    enabled.value = !enabled.value;
    volume.value = enabled.value ? volumeValue || 1 : 0;
    localStorage.setItem("soundEnabled", JSON.stringify(enabled.value));
  };

  watch(() => volume.value, (newValue, oldValue) => {
    console.log(newValue);
    setVolume(newValue);
  });

  const setVolume = (value) => {
    if(!value) {
      enabled.value = false;
      localStorage.setItem("soundEnabled", JSON.stringify(enabled.value));
      // localStorage.setItem("volume", JSON.stringify(0));
      return;
    }
    enabled.value = true;
    localStorage.setItem("soundEnabled", JSON.stringify(enabled.value));
    localStorage.setItem("volume", JSON.stringify(value));
  };

  const playSound = (type) => {
    const sounds = {
      notAllowed: "not-allowed.mp3",
      move: "piece-move.mp3",
    };

    if (enabled.value) {
      console.log(enabled.value, volume.value);
      let audio = new Audio("Sounds/" + sounds[type]);
      audio.volume = volume.value / 2;
      audio.play();
    } else console.log("sound is disabled");
  };
  return { playSound, toggleSound, setVolume, volume, enabled };
};
