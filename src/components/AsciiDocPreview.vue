<template>
  <div :class="'adoc--preview ' + theme" v-html="renderedBody"></div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import asciidoctor from 'asciidoctor';

  const asciiConverter = asciidoctor();

  @Component({})
  export default class AsciiDocPreview extends Vue {
    @Prop() private body!: string;
    @Prop() private theme!: string;

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
    font-size: 1.21875em;
    line-height: 1.6 !important;
  }
  .adoc--preview.adoc-foundation {
    @import '../../public/adoc-themes/adoc-foundation';
  }
  .adoc--preview.asciidoctor {
    @import '../../public/adoc-themes/asciidoctor';
  }
  .adoc--preview.gazette {
    @import '../../public/adoc-themes/gazette';
  }
  .adoc--preview.ubuntu {
    @import '../../public/adoc-themes/ubuntu';
  }
  .adoc--preview.notebook {
    @import '../../public/adoc-themes/notebook';
  }



</style>
