<!-- Inspired by https://github.com/junkboy0315/vue-compare-image -->


<template>
  <div class="slider-container" ref="containerRef">
    <img
      :src="leftImage"
      :style="leftImageStyle"
      class="left-image"
      ref="leftImageRef"
    />
    <img :src="rightImage" class="right-image" ref="rightImageRef" />
    <div :style="sliderStyle" class="slider">
      <div class="line"></div>
      <div class="handle"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const containerElement = this.$refs.containerRef;
    this.getAndSetImageWidth();
    // for mobile
    containerElement.addEventListener("touchstart", this.startSliding);
    window.addEventListener("touchend", this.finishSliding);
    // for desktop
    containerElement.addEventListener("mousedown", this.startSliding);
    window.addEventListener("mouseup", this.finishSliding);
  },
  beforeDestroy() {
    this.finishSliding();
    window.removeEventListener("mouseup", this.finishSliding);
    window.removeEventListener("touchend", this.finishSliding);
  },
  props: {
    leftImage: {
      type: String,
      default: ""
    },
    rightImage: {
      type: String,
      default: ""
    }
  },
  methods: {
    getAndSetImageWidth() {
      // @ts-ignore
      this.imageWidth = this.$refs.rightImageRef.getBoundingClientRect().width;
    },
    startSliding(e) {
      // Prevent default behavior other than mobile scrolling
      if (!("touches" in e)) {
        e.preventDefault();
      }
      // Slide the image even if you just click or tap (not drag)
      this.updateSliderPosition(e);
      window.addEventListener("mousemove", this.updateSliderPosition);
      window.addEventListener("touchmove", this.updateSliderPosition);
    },
    finishSliding() {
      const { positionPct } = this;

      window.removeEventListener("mousemove", this.updateSliderPosition);
      window.removeEventListener("touchmove", this.updateSliderPosition);

      if (positionPct === 1 || positionPct === 0) {
        this.$emit("fullSwipe", positionPct);

        this.positionPct = positionPct ? 2 : -1;
      }
    },
    updateSliderPosition(event) {
      // const e = event || window.event;
      const cursorXfromViewport = event.touches
        ? event.touches[0].pageX
        : event.pageX;

      const cursorXfromWindow = cursorXfromViewport - window.pageXOffset;
      const imagePosition = this.$refs.rightImageRef.getBoundingClientRect();
      let pos = cursorXfromWindow - imagePosition.left;

      const minPos = 0;
      const maxPos = this.imageWidth;
      if (pos < minPos) pos = minPos;
      if (pos > maxPos) pos = maxPos;
      this.positionPct = pos / this.imageWidth;
    }
  },
  data() {
    return {
      positionPct: 0.5,
      imageWidth: 0
    };
  },
  computed: {
    leftImageStyle() {
      return {
        clip:
          "rect(auto, " + this.imageWidth * this.positionPct + "px, auto, auto)"
      };
    },
    sliderStyle() {
      return {
        cursor: !this.hover && "ew-resize",
        left: this.imageWidth * this.positionPct - 20 + "px"
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.slider-container {
  box-sizing: border-box;
  max-width: 440px;
  position: relative;
  width: 100%;
  overflow: hidden;
}
.right-image {
  display: block;
  height: auto; // Respect the aspect ratio
  width: 100%;
}
.left-image {
  display: block;
  height: 100%; // fit to the height of under image
  object-fit: cover; // protrudes is hidden
  position: absolute;
  top: 0;
  width: 100%;
}
.slider {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 40px;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  .line {
    background: white;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    flex: 0 1 auto;
    height: 100%;
    width: 2px;
  }
  .handle {
    align-items: center;
    border-radius: 100%;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
    display: flex;
    flex: 1 0 auto;
    justify-content: center;
    border: 2px solid white;
    height: 40px;
    width: 40px;
  }
}
</style>
