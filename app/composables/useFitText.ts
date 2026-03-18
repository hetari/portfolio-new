import type { TemplateRef } from "vue";

type TextEl =
  | TemplateRef<HTMLHeadingElement>
  | TemplateRef<HTMLParagraphElement>
  | TemplateRef<HTMLSpanElement>;

export const useFitText = (textEl: TextEl, containerEl: TemplateRef<HTMLDivElement>) => {
  const isReady = ref(false);

  const style = shallowRef<Record<string, string>>({
    whiteSpace: "nowrap",
  });

  // initialize ONCE
  const { width: containerWidth } = useElementSize(containerEl);

  const applyStyle = (fontSizePx: number) => {
    const floorFontSize = Math.floor(fontSizePx);
    style.value = {
      fontSize: `${floorFontSize}px`,
      whiteSpace: "nowrap",
    };
  };

  const measureAndAdjust = () => {
    const text = textEl.value;
    const container = containerEl.value;

    if (!text || !container) return;

    const width = containerWidth.value;
    if (!width) return;

    const { width: textWidth } = useElementSize(text);
    if (!textWidth.value) return;

    const currentFontSize = parseFloat(window.getComputedStyle(text).fontSize);
    if (Number.isNaN(currentFontSize)) return;

    const fontSize = (width / textWidth.value) * currentFontSize;
    applyStyle(fontSize);
  };

  const resetAndAdjust = async () => {
    style.value = { whiteSpace: "nowrap" };
    await nextTick();
    measureAndAdjust();
  };

  onMounted(() => {
    nextTick(measureAndAdjust);
    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        resetAndAdjust();
        isReady.value = true;
      });
    } else {
      isReady.value = true;
    }
  });

  // react to size changes correctly
  useResizeObserver(containerEl, measureAndAdjust);

  return {
    style,
    adjustTextSize: measureAndAdjust,
    recalc: resetAndAdjust,
    isReady,
  };
};
