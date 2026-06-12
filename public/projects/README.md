# Project screenshots

Drop project screenshots in this folder, then list their paths in the `images`
array of the matching project in `src/components/sections/Projects.tsx`.

## How to add screenshots

1. Save your image here, e.g. `public/projects/adorix-1.png`.
2. Open `src/components/sections/Projects.tsx` and find the project (e.g. Adorix).
3. Add the path(s) to its `images` array, in the order you want them to slide:

   ```ts
   images: [
     "/projects/adorix-1.png",
     "/projects/adorix-2.png",
     "/projects/adorix-3.png",
   ],
   ```

That's it — the slider, prev/next buttons, dots and counter appear automatically.

## Tips

- **No config needed** for local images in `public/` — reference them starting
  from `/` (e.g. `/projects/adorix-1.png`).
- **Aspect ratio:** the frame is `16:10`. Images are cropped with `object-fit:
  cover`, so roughly-landscape screenshots (e.g. 1600×1000) look best.
- **One image** shows with no controls. **Two or more** enable the slider.
- **No images** shows the on-theme "Screenshot coming soon" placeholder.
- Keep files reasonably sized (Next.js optimizes them, but smaller source =
  faster). PNG or JPG/WebP all work.
