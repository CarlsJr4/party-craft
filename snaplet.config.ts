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
        snaplet.users(x => x(25)),
        // Random events
        snaplet.events(
          [
            {
              title: 'Test future event',
              date: new Date(2028, 11, 12).toDateString(),
            },
          ],
          { autoConnect: true }
        ),
        snaplet.events(
          [
            { date: new Date(2028, 12, 12).toDateString() },
            { date: new Date(2028, 1, 12).toDateString() },
            { date: new Date(2028, 2, 12).toDateString() },
          ],
          { autoConnect: true }
        ),
        snaplet.signups(x => x(50), { autoConnect: true }),
      ]);
    },
  },
});
