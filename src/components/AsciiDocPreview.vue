<template>
  <md-content class="md-scrollbar" v-html="renderedBody"></md-content>
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

<style lang="scss" scoped></style>
