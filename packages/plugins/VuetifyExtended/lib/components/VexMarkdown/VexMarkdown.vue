<script>
  import { defineComponent } from '@deip/platform-util';
  import marked from 'marked';
  import DOMPurify from 'dompurify';

  export default defineComponent({
    name: 'VexMarkdown',

    props: {
      source: {
        type: String,
        default: ''
      },
      options: {
        type: Object,
        default: () => ({})
      }
    },

    computed: {
      config() {
        return {
          renderer: marked.Renderer(),
          baseUrl: null,
          gfm: true,
          breaks: true,
          pedantic: false,
          smartLists: true,
          smartypants: false,
          headerIds: true,
          headerPrefix: '',
          highlight: null,
          langPrefix: 'language-',
          mangle: true,
          silent: false,
          tokenizer: null,
          walkTokens: null,
          xhtml: false,
          ...this.options
        };
      }
    },

    render() {
      return (<div domPropsInnerHTML={
        DOMPurify.sanitize(marked(this.source, this.config))
      }></div>);
    }
  });
</script>
