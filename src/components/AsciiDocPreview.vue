<template>
  <div class="adoc--preview" v-html="renderedBody"></div>
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

<style scoped>
  .adoc--preview >>> .lead {
    font-size: 1.21875em;
    line-height: 1.6 !important;
  }

  @import '../../public/asciidoctor-default.css';
</style>
