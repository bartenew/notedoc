<template>
  <div v-html="renderedBody"></div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import asciidoctor from 'asciidoctor';

  const asciiConverter = asciidoctor();

  @Component({})
  export default class AsciiDocPreview extends Vue {
    @Prop() private body!: string;

    get renderedBody() {
      const options = {
        attributes: { icons: 'font', showtitle: true },
      };

      return asciiConverter.convert(this.body!, options).toString();
    }
  }
</script>

<style lang="scss">
  .lead {
    font-size: 1.21875em; line-height: 1.6 !important;
  }
</style>
