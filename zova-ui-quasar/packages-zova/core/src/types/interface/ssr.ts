import 'vue';
declare module 'vue' {
  interface SSRContext {
    req: Request;
    res: Response;
    /** The global "nonce" attribute to use */
    nonce?: string;
    /**
     * Registers a function to be executed server-side after
     * app has been rendered with Vue. You might need this
     * to access ssrContext again after it has been fully processed.
     * Example: ssrContext.onRendered(() => { ... })
     */
    onRendered: (fn: () => void) => void;
  }
}
