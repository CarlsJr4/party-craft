// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path=".snaplet/snaplet.d.ts" />
// This config was generated by Snaplet make sure to check it over before using it.
import { copycat, faker } from '@snaplet/copycat';
import { defineConfig } from 'snaplet';
copycat.setHashKey('BRGNTCMBJKAmrg6j');
export default defineConfig({
  generate: {
    async run(snaplet) {
      // This is an example generate plan. It's a starting point, but you'll probably need to
      // give snaplet more detail about the plan for it to fit your application logic better.
      //
      // For more on how to do this, check out the docs:
      // https://docs.snaplet.dev/reference/configuration#generate
      await snaplet.$pipe([
        snaplet.users(x => x(3)),
        // Random events
        snaplet.events(x => x(10), { autoConnect: true }),
        snaplet.signups(x => x(10), { autoConnect: true }),
      ]);
    },
  },
});
